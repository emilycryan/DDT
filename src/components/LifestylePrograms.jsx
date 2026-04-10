import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map view updates
function MapViewUpdater({ center, zoom, bounds }) {
  const map = useMap();
  
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      // Fit map to show all markers
      const latLngBounds = L.latLngBounds(bounds);
      map.fitBounds(latLngBounds, { padding: [50, 50], maxZoom: 15 });
    } else if (center) {
      map.setView(center, zoom || map.getZoom());
    }
  }, [center, zoom, bounds, map]);
  
  return null;
}

const PROGRAM_FORMAT_ANY = 'any';

const DEFAULT_FEATURE_FILTERS = {
  freeLowCost: false,
  wholeHealth: false,
  spanishLanguages: false,
  faithBased: false,
  insurance: false,
  caregivers: false,
  accessibility: false,
  glp1: false,
};

function programTextBlob(program) {
  return [program.organization_name, program.description, program.class_schedule]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

function matchesProgramFormat(program, format) {
  if (!format || format === PROGRAM_FORMAT_ANY) return true;
  const mode = (program.delivery_mode || '').toLowerCase();
  if (format === 'virtual') {
    return mode.includes('virtual') || mode === 'remote' || mode === 'online';
  }
  if (format === 'in-person') {
    return mode.includes('in-person') || mode.includes('in person');
  }
  if (format === 'hybrid') {
    return mode.includes('hybrid');
  }
  return true;
}

function matchesFeatureFilters(program, filters) {
  const hasAny = Object.values(filters).some(Boolean);
  if (!hasAny) return true;

  const desc = programTextBlob(program);
  const lang = (program.language || '').toLowerCase();
  const cost = program.cost != null && program.cost !== '' ? Number(program.cost) : null;

  if (filters.freeLowCost) {
    const ok =
      cost === 0 ||
      cost === null ||
      Number.isNaN(cost) ||
      desc.includes('free') ||
      desc.includes('low cost') ||
      desc.includes('low-cost') ||
      desc.includes('no cost') ||
      desc.includes('no-cost');
    if (!ok) return false;
  }
  if (filters.wholeHealth) {
    const ok =
      desc.includes('whole health') ||
      desc.includes('wellness') ||
      desc.includes('chronic disease') ||
      desc.includes('lifestyle medicine') ||
      desc.includes('preventive care');
    if (!ok) return false;
  }
  if (filters.spanishLanguages) {
    const ok =
      (lang && lang !== 'english' && lang !== 'en') ||
      desc.includes('spanish') ||
      desc.includes('bilingual') ||
      desc.includes('español') ||
      desc.includes('espanol');
    if (!ok) return false;
  }
  if (filters.faithBased) {
    const ok =
      desc.includes('faith') ||
      desc.includes('church') ||
      desc.includes('congregation') ||
      desc.includes('spiritual') ||
      desc.includes('mosque') ||
      desc.includes('synagogue');
    if (!ok) return false;
  }
  if (filters.insurance) {
    const ins = program.insurance_accepted;
    const hasInsArray =
      Array.isArray(ins) && ins.some((x) => x != null && String(x).trim().length > 0);
    const ok =
      hasInsArray ||
      desc.includes('insurance') ||
      desc.includes('covered by') ||
      desc.includes('medicare') ||
      desc.includes('medicaid');
    if (!ok) return false;
  }
  if (filters.caregivers) {
    const ok =
      desc.includes('caregiver') ||
      desc.includes('family welcome') ||
      desc.includes('support person') ||
      desc.includes('partner welcome');
    if (!ok) return false;
  }
  if (filters.accessibility) {
    const ok =
      desc.includes('sign language') ||
      desc.includes(' asl') ||
      desc.includes('asl ') ||
      desc.includes('accessibility') ||
      desc.includes(' ada ') ||
      desc.includes('interpreter') ||
      desc.includes('accommodation') ||
      desc.includes('disability');
    if (!ok) return false;
  }
  if (filters.glp1) {
    const ok =
      desc.includes('glp-1') ||
      desc.includes('glp1') ||
      desc.includes('wegovy') ||
      desc.includes('ozempic') ||
      desc.includes('mounjaro') ||
      desc.includes('semaglutide') ||
      desc.includes('weight-loss medication') ||
      desc.includes('weight loss medication');
    if (!ok) return false;
  }
  return true;
}

function applyClientFilters(programs, programFormat, featureFilters) {
  return programs.filter(
    (p) => matchesProgramFormat(p, programFormat) && matchesFeatureFilters(p, featureFilters)
  );
}

const LifestylePrograms = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [locationInput, setLocationInput] = useState('');
  const [programFormat, setProgramFormat] = useState(PROGRAM_FORMAT_ANY);
  const [featureFilters, setFeatureFilters] = useState(() => ({ ...DEFAULT_FEATURE_FILTERS }));
  const [filtersExpanded, setFiltersExpanded] = useState(true);
  const [searchResults, setSearchResults] = useState([]); // Programs to show in search results list
  const [allPrograms, setAllPrograms] = useState([]); // All programs from database for map display
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Map-related state
  const [mapCenter, setMapCenter] = useState([39.8283, -98.5795]); // Center of USA
  const [mapZoom, setMapZoom] = useState(4); // Default US view
  const [userLocation, setUserLocation] = useState(null);
  const [locationRequested, setLocationRequested] = useState(false);
  const [mapBounds, setMapBounds] = useState(null); // For fitting all markers
  const [showUserLocation, setShowUserLocation] = useState(false); // Only show user location for location-based searches
  const mapRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load all programs from database on component mount
  useEffect(() => {
    const loadAllPrograms = async () => {
      try {
        const response = await fetch('http://localhost:3004/api/programs/all');
        if (response.ok) {
          const data = await response.json();
          if (data.programs && data.programs.length > 0) {
            // Store all programs for map display
            setAllPrograms(data.programs);
            
            // Filter programs that have coordinates for map bounds
            const programsWithCoords = data.programs.filter(p => p.latitude && p.longitude);
            if (programsWithCoords.length > 0) {
              // Set map bounds to show all programs
              const bounds = programsWithCoords.map(p => [
                parseFloat(p.latitude),
                parseFloat(p.longitude)
              ]);
              setMapBounds(bounds);
            }
          }
        }
      } catch (error) {
        console.error('Error loading programs:', error);
        // Fail silently - map will still work, just won't show initial markers
      }
    };

    loadAllPrograms();
  }, []);

  // Get user location on component mount
  useEffect(() => {
    if (navigator.geolocation && !locationRequested) {
      setLocationRequested(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          // Only change map center if we don't have programs with bounds set
          if (!mapBounds || mapBounds.length === 0) {
            setMapCenter([latitude, longitude]);
            setMapZoom(10); // Zoom in to user's location
          }
        },
        (error) => {
          console.log('Location access denied or unavailable:', error);
          // Keep default US map view or program bounds
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    }
  }, [locationRequested, mapBounds]);

  // Geocoding function to convert address to coordinates
  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
        {
          headers: {
            'User-Agent': 'CDC-Path2Prevention-App' // Required by Nominatim
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Geocoding failed');
      }
      
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        return [parseFloat(lat), parseFloat(lon)];
      }
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  /** Reverse geocode for hybrid/in-person search when only GPS is available */
  const reverseGeocodeToLocationParams = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`,
        {
          headers: {
            'User-Agent': 'CDC-Path2Prevention-App',
          },
        }
      );
      if (!response.ok) return null;
      const data = await response.json();
      const a = data.address || {};
      const postcode = String(a.postcode || '');
      const zipMatch = postcode.match(/\d{5}/);
      const zipCode = zipMatch ? zipMatch[0] : null;
      let state = null;
      const iso = a['ISO3166-2-lvl4'];
      if (iso && /^US-[A-Z]{2}$/i.test(iso)) {
        state = iso.slice(3).toUpperCase();
      }
      const city =
        a.city || a.town || a.village || a.hamlet || a.suburb || a.municipality || null;
      if (!zipCode && !state && !city) return null;
      return { zipCode, state, city };
    } catch (e) {
      console.error('Reverse geocoding error:', e);
      return null;
    }
  };

  const requestUserCoords = () =>
    new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve([pos.coords.latitude, pos.coords.longitude]),
        () => resolve(null),
        { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
      );
    });

  // Function to parse location input (city, state, zip)
  const parseLocationInput = (input) => {
    const trimmed = input.trim();
    
    // Check if it's a zip code (5 digits)
    const zipMatch = trimmed.match(/^\d{5}$/);
    if (zipMatch) {
      return { zipCode: trimmed };
    }
    
    // Check for "City, State" format
    const cityStateMatch = trimmed.match(/^([^,]+),\s*([A-Za-z]{2})$/);
    if (cityStateMatch) {
      return { 
        city: cityStateMatch[1].trim(), 
        state: cityStateMatch[2].toUpperCase() 
      };
    }
    
    // Check for state only (2 letters)
    const stateMatch = trimmed.match(/^[A-Za-z]{2}$/);
    if (stateMatch) {
      return { state: trimmed.toUpperCase() };
    }
    
    // Default to city search
    return { city: trimmed };
  };

  const searchPrograms = async () => {
    const loc = locationInput.trim();
    const formatIsAny = programFormat === PROGRAM_FORMAT_ANY;
    const isVirtual = programFormat === 'virtual';
    const isHybridOrInPerson =
      programFormat === 'hybrid' || programFormat === 'in-person';

    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setShowUserLocation(true);

    try {
      let rawPrograms = [];
      let geocodeCoords = null;
      let usedDeviceLocation = false;

      if (isVirtual) {
        const queryParams = new URLSearchParams();
        queryParams.append('deliveryMode', 'virtual');
        const response = await fetch(`http://localhost:3004/api/programs/search?${queryParams}`);
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to search programs');
        }
        const data = await response.json();
        rawPrograms = data.programs || [];
      } else if (isHybridOrInPerson) {
        let locationParams = null;

        if (loc) {
          try {
            geocodeCoords = await geocodeAddress(loc);
            if (geocodeCoords) {
              setMapCenter(geocodeCoords);
              setMapZoom(10);
            }
          } catch {
            /* optional */
          }
          locationParams = parseLocationInput(loc);
        } else {
          let coords = userLocation;
          if (!coords) {
            coords = await requestUserCoords();
          }
          if (!coords) {
            setError(
              'Enter a city, state, or ZIP for in-person or hybrid programs, or allow your browser to use your current location.'
            );
            return;
          }
          usedDeviceLocation = true;
          geocodeCoords = coords;
          setUserLocation(coords);
          setMapCenter(coords);
          setMapZoom(10);

          locationParams = await reverseGeocodeToLocationParams(coords[0], coords[1]);
          if (!locationParams || (!locationParams.zipCode && !locationParams.state && !locationParams.city)) {
            setError(
              'We could not determine your area from your location. Try typing a city, state, or ZIP code.'
            );
            return;
          }
        }

        const queryParams = new URLSearchParams();
        if (locationParams.zipCode) queryParams.append('zipCode', locationParams.zipCode);
        if (locationParams.state) queryParams.append('state', locationParams.state);
        if (locationParams.city) queryParams.append('city', locationParams.city);

        const response = await fetch(`http://localhost:3004/api/programs/search?${queryParams}`);
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to search programs');
        }
        const data = await response.json();
        rawPrograms = data.programs || [];
      } else if (formatIsAny && !loc) {
        const response = await fetch('http://localhost:3004/api/programs/all');
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to load programs');
        }
        const data = await response.json();
        rawPrograms = data.programs || [];
      } else {
        try {
          geocodeCoords = await geocodeAddress(loc);
          if (geocodeCoords) {
            setMapCenter(geocodeCoords);
            setMapZoom(10);
          }
        } catch {
          /* optional */
        }

        const locationParams = parseLocationInput(loc);
        const queryParams = new URLSearchParams();
        if (locationParams.zipCode) queryParams.append('zipCode', locationParams.zipCode);
        if (locationParams.state) queryParams.append('state', locationParams.state);
        if (locationParams.city) queryParams.append('city', locationParams.city);

        const response = await fetch(`http://localhost:3004/api/programs/search?${queryParams}`);
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to search programs');
        }
        const data = await response.json();
        rawPrograms = data.programs || [];
      }

      const clientFormatForFilter =
        isVirtual || formatIsAny ? PROGRAM_FORMAT_ANY : programFormat;

      const programs = applyClientFilters(rawPrograms, clientFormatForFilter, featureFilters);

      setSearchResults(programs);

      if (programs.length === 0) {
        if (isVirtual) {
          setError('No virtual or online programs found with the selected filters.');
        } else if (isHybridOrInPerson && loc) {
          setError(`No ${programFormat} programs found near "${loc}" with the selected options.`);
        } else if (isHybridOrInPerson && usedDeviceLocation) {
          setError(`No ${programFormat} programs found near your location with the selected options.`);
        } else if (loc) {
          setError(`No programs found for "${loc}" with the selected options.`);
        } else if (formatIsAny && !loc) {
          setError('No programs match your filters. Try clearing some feature filters.');
        } else {
          setError('No programs match your search.');
        }
      } else {
        setError(null);
      }

      if (programs.length > 0) {
        const programsWithCoords = programs.filter((p) => p.latitude && p.longitude);
        if (programsWithCoords.length > 0) {
          const bounds = programsWithCoords.map((p) => [
            parseFloat(p.latitude),
            parseFloat(p.longitude),
          ]);
          if (geocodeCoords) {
            bounds.push(geocodeCoords);
          } else if (userLocation) {
            bounds.push(userLocation);
            setMapCenter(userLocation);
            setMapZoom(10);
          }
          setMapBounds(bounds);
        } else if (geocodeCoords) {
          setMapCenter(geocodeCoords);
          setMapZoom(10);
          setMapBounds(null);
        } else if (userLocation) {
          setMapCenter(userLocation);
          setMapZoom(10);
          setMapBounds(null);
        }
      } else {
        if (geocodeCoords) {
          setMapCenter(geocodeCoords);
          setMapZoom(10);
        } else if (userLocation) {
          setMapCenter(userLocation);
          setMapZoom(10);
        }
        setMapBounds(null);
      }
    } catch (error) {
      console.error('Error searching programs:', error);
      setError(error.message || 'Unable to search programs. Please try again.');
      setSearchResults([]);
      setMapBounds(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchPrograms();
    }
  };

  const toggleFeatureFilter = (key) => {
    setFeatureFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const featureFilterRows = [
    [
      { key: 'freeLowCost', label: 'Free or low-cost' },
      { key: 'insurance', label: 'Covered by insurance' },
    ],
    [
      { key: 'wholeHealth', label: 'Whole health focus (not just diabetes)' },
      { key: 'caregivers', label: 'Caregivers / family welcome' },
    ],
    [
      { key: 'spanishLanguages', label: 'Spanish or other languages' },
      { key: 'accessibility', label: 'Sign language / accessibility options' },
    ],
    [
      { key: 'faithBased', label: 'Faith-based' },
      { key: 'glp1', label: 'GLP-1 / weight-loss medication support' },
    ],
  ];

  return (
    <main style={{ 
      backgroundColor: '#f8fafc',
      minHeight: '80vh'
    }}>
      {/* Hero Section */}
      <section style={{
        backgroundColor: 'white',
        padding: isMobile ? '3rem 1rem' : '4rem 2rem',
        textAlign: 'center',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            fontWeight: 'bold',
            color: '#1b1b1b',
            lineHeight: '1.1',
            marginBottom: '1rem',
            margin: '0 0 1rem 0'
          }}>
            Lifestyle Change Programs
          </h1>

          <p style={{
            fontSize: '1.25rem',
            color: '#0f766e',
            fontWeight: '600',
            marginBottom: '1.5rem',
            margin: '0 0 1.5rem 0'
          }}>
            Find the perfect program for you
          </p>

          <p style={{
            fontSize: '1.125rem',
            color: '#333333',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Connect with CDC-recognized lifestyle change programs in your area or online. Programs such as these can help reduce the risk of chronic diseases when integrated into a healthy lifestyle.
          </p>
        </div>
      </section>

      {/* Program Finder Section */}
      <section style={{
        backgroundColor: 'white',
        padding: isMobile ? '3rem 1rem' : '4rem 2rem',
        margin: '2rem 0'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontWeight: 'bold',
            color: '#1b1b1b',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Find Your Perfect Program
          </h2>

          <div
            style={{
              backgroundColor: '#ffffff',
              padding: isMobile ? '1.25rem' : '1.75rem',
              borderRadius: '0.75rem',
              border: '1px solid #e0e0e0',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)',
              marginBottom: '3rem',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) minmax(160px, 220px) auto',
                gap: isMobile ? '1rem' : '1rem 1.25rem',
                alignItems: 'end',
              }}
            >
              <div>
                <label
                  htmlFor="program-finder-location"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#323a45',
                    marginBottom: '0.375rem',
                  }}
                >
                  Location
                </label>
                <input
                  id="program-finder-location"
                  type="text"
                  placeholder="e.g., Atlanta, GA or 30309"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    color: '#1b1b1b',
                    opacity: isLoading ? 0.6 : 1,
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="program-finder-format"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#323a45',
                    marginBottom: '0.375rem',
                  }}
                >
                  Program format
                </label>
                <select
                  id="program-finder-format"
                  value={programFormat}
                  onChange={(e) => setProgramFormat(e.target.value)}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    color: '#1b1b1b',
                    backgroundColor: '#fff',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.6 : 1,
                  }}
                >
                  <option value={PROGRAM_FORMAT_ANY}>Any</option>
                  <option value="virtual">Virtual / online</option>
                  <option value="in-person">In-person</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <button
                type="button"
                onClick={searchPrograms}
                disabled={isLoading}
                style={{
                  backgroundColor: isLoading ? '#9ca3af' : '#005ea2',
                  color: 'white',
                  padding: isMobile ? '0.75rem 1.25rem' : '0.65rem 1.75rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap',
                  justifySelf: isMobile ? 'stretch' : 'end',
                  width: isMobile ? '100%' : 'auto',
                }}
              >
                {isLoading ? 'Searching...' : 'Find Programs'}
              </button>
            </div>

            <div
              style={{
                borderTop: '1px solid #e0e0e0',
                marginTop: '1.25rem',
                paddingTop: '1rem',
              }}
            >
              <button
                type="button"
                onClick={() => setFiltersExpanded((v) => !v)}
                aria-expanded={filtersExpanded}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  color: '#005ea2',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span aria-hidden style={{ fontSize: '0.65rem' }}>
                  {filtersExpanded ? '▼' : '▶'}
                </span>
                Filter by program features
              </button>

              {filtersExpanded && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '0.65rem 2rem',
                    marginTop: '1rem',
                  }}
                >
                  {featureFilterRows.flatMap((row) =>
                    row.map(({ key, label }) => (
                      <label
                        key={key}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.5rem',
                          fontSize: '0.9375rem',
                          color: '#323a45',
                          cursor: 'pointer',
                          lineHeight: 1.35,
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={featureFilters[key]}
                          onChange={() => toggleFeatureFilter(key)}
                          style={{
                            marginTop: '0.2rem',
                            width: '1rem',
                            height: '1rem',
                            flexShrink: 0,
                          }}
                        />
                        <span>{label}</span>
                      </label>
                    ))
                  )}
                </div>
              )}
            </div>

            {error && (
              <div
                style={{
                  backgroundColor: '#f8dfe2',
                  border: '1px solid #d83933',
                  borderRadius: '0.375rem',
                  padding: '1rem',
                  marginTop: '1rem',
                }}
              >
                <p
                  style={{
                    color: '#b50909',
                    fontSize: '0.95rem',
                    margin: 0,
                  }}
                >
                  {error}
                </p>
              </div>
            )}
          </div>

          {/* Map Section */}
          <div style={{
            backgroundColor: 'white',
            padding: '0',
            borderRadius: '0.75rem',
            border: '1px solid #e2e8f0',
            marginBottom: '3rem',
            overflow: 'hidden',
            height: isMobile ? '400px' : '500px'
          }}>
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: '100%', width: '100%' }}
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapViewUpdater center={mapCenter} zoom={mapZoom} bounds={mapBounds} />
              
              {/* User location marker - blue dot to distinguish from program markers */}
              {userLocation && showUserLocation && (
                <Marker
                  position={userLocation}
                  icon={L.divIcon({
                    className: 'user-location-marker',
                    html: '<div style="width:16px;height:16px;background:#005ea2;border:3px solid white;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.4)" />',
                    iconSize: [16, 16],
                    iconAnchor: [8, 8],
                  })}
                >
                  <Popup>Your Location</Popup>
                </Marker>
              )}
              
              {/* Program markers - show all programs from database, or search results if searching */}
              {(hasSearched ? searchResults : allPrograms).map((program, index) => {
                if (program.latitude && program.longitude) {
                  return (
                    <Marker 
                      key={program.program_id || program.id || index}
                      position={[parseFloat(program.latitude), parseFloat(program.longitude)]}
                    >
                      <Popup>
                        <div style={{ minWidth: '200px' }}>
                          <h4 style={{ 
                            fontSize: '1rem', 
                            fontWeight: '600', 
                            marginBottom: '0.5rem',
                            marginTop: 0,
                            color: '#1e293b'
                          }}>
                            {program.organization_name}
                          </h4>
                          {program.address_line1 && (
                            <p style={{ 
                              fontSize: '0.875rem', 
                              margin: '0.25rem 0',
                              color: '#64748b'
                            }}>
                              {program.address_line1}
                              {program.city && `, ${program.city}, ${program.state} ${program.zip_code}`}
                            </p>
                          )}
                          {program.delivery_mode && (
                            <p style={{ 
                              fontSize: '0.875rem', 
                              margin: '0.25rem 0',
                              color: '#64748b'
                            }}>
                              Delivery: {program.delivery_mode}
                            </p>
                          )}
                          {program.enrollment_status && (
                            <p style={{ 
                              fontSize: '0.875rem', 
                              margin: '0.25rem 0',
                              color: program.enrollment_status === 'open' ? '#166534' : 
                                     program.enrollment_status === 'closed' ? '#dc2626' : '#92400e',
                              fontWeight: '500'
                            }}>
                              Status: {program.enrollment_status}
                            </p>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  );
                }
                return null;
              })}
            </MapContainer>
          </div>

          {/* Search Results */}
          {hasSearched && (
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '0.75rem',
              border: '1px solid #e2e8f0',
              marginBottom: '3rem'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#1b1b1b',
                marginBottom: '1.5rem'
              }}>
                Search Results
                {searchResults.length > 0 && (
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: 'normal',
                    color: '#333333',
                    marginLeft: '0.5rem'
                  }}>
                    ({searchResults.length} program{searchResults.length !== 1 ? 's' : ''} found)
                  </span>
                )}
              </h3>

              {searchResults.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '2rem',
                  color: '#64748b'
                }}>
                  <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                    No programs match your search
                  </p>
                  <p style={{ fontSize: '0.95rem' }}>
                    Try another location, choose a different program format, or adjust filters under “Filter by program features.”
                  </p>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gap: '1.5rem'
                }}>
                  {searchResults.map((program, index) => (
                    <div key={program.program_id || index} style={{
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      padding: '1.5rem'
                    }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
                        gap: '1rem',
                        alignItems: 'start'
                      }}>
                        <div>
                          <h4 style={{
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            color: '#1b1b1b',
                            marginBottom: '0.5rem'
                          }}>
                            {program.website_url ? (
                              <a
                                href={program.website_url}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  color: '#1b1b1b',
                                  textDecoration: 'underline',
                                  textUnderlineOffset: '2px'
                                }}
                              >
                                {program.organization_name}
                              </a>
                            ) : (
                              program.organization_name
                            )}
                          </h4>
                          
                          {program.description && (
                            <p style={{
                              fontSize: '0.95rem',
                              color: '#333333',
                              lineHeight: '1.5',
                              marginBottom: '1rem'
                            }}>
                              {program.description}
                            </p>
                          )}

                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                            gap: '0.75rem',
                            fontSize: '0.9rem'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span style={{ color: '#6b7280' }}>📍</span>
                              <span style={{ color: '#374151' }}>
                                {program.address_line1 ? (
                                  <>
                                    <span style={{ display: 'block' }}>
                                      {program.address_line1}{program.address_line2 ? `, ${program.address_line2}` : ''}
                                    </span>
                                    <span style={{ display: 'block' }}>
                                      {program.city}, {program.state} {program.zip_code}
                                    </span>
                                  </>
                                ) : (
                                  <span style={{ display: 'block' }}>
                                    {program.city}, {program.state} {program.zip_code}
                                  </span>
                                )}
                              </span>
                            </div>
                            
                            {program.delivery_mode && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#6b7280' }}>🏥</span>
                                <span style={{ color: '#374151' }}>
                                  {program.delivery_mode}
                                </span>
                              </div>
                            )}
                            
                            {(program.cost !== null && program.cost !== undefined) && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#6b7280' }}>💰</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                  <span style={{ color: '#374151' }}>
                                    {Number(program.cost) === 0 ? 'Free' : `$${program.cost}`}
                                  </span>
                                  {Number(program.cost) > 0 && Array.isArray(program.insurance_accepted) && program.insurance_accepted.length > 0 && (
                                    <span style={{
                                      fontSize: '0.75rem',
                                      fontWeight: '600',
                                      color: '#1e40af',
                                      backgroundColor: '#eff6ff',
                                      border: '1px solid #bfdbfe',
                                      padding: '0.15rem 0.5rem',
                                      borderRadius: '999px',
                                      whiteSpace: 'nowrap'
                                    }}>
                                      Insurance accepted
                                    </span>
                                  )}
                                </span>
                              </div>
                            )}
                            
                            {program.duration_weeks && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#6b7280' }}>📅</span>
                                <span style={{ color: '#374151' }}>
                                  {program.duration_weeks} weeks
                                </span>
                              </div>
                            )}

                            {program.contact_phone && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#6b7280' }}>📞</span>
                                <a
                                  href={`tel:${String(program.contact_phone).replace(/[^\d+]/g, '')}`}
                                  style={{
                                    color: '#374151',
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '2px'
                                  }}
                                >
                                  {program.contact_phone}
                                </a>
                              </div>
                            )}

                            {program.website_url && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#6b7280' }}>🔗</span>
                                <a
                                  href={program.website_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{
                                    color: '#005ea2',
                                    textDecoration: 'underline',
                                    fontWeight: '600',
                                    wordBreak: 'break-word',
                                    overflowWrap: 'anywhere'
                                  }}
                                >
                                  {program.website_url}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>

                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.75rem'
                        }}>
                          {program.enrollment_status && (
                            <div style={{
                              padding: '0.5rem 1rem',
                              borderRadius: '0.375rem',
                              textAlign: 'center',
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              backgroundColor: program.enrollment_status === 'open' ? '#dcfce7' : 
                                             program.enrollment_status === 'closed' ? '#fee2e2' : '#fef3c7',
                              color: program.enrollment_status === 'open' ? '#166534' : 
                                     program.enrollment_status === 'closed' ? '#dc2626' : '#92400e'
                            }}>
                              {program.enrollment_status === 'open' ? '✅ Open' : 
                               program.enrollment_status === 'closed' ? '❌ Closed' : '⏳ Waitlist'}
                            </div>
                          )}
                          
                          {(program.contact_phone || program.contact_email) && (
                            <div style={{
                              fontSize: '0.875rem',
                              color: '#64748b'
                            }}>
                              {program.contact_phone && (
                                <div style={{ marginBottom: '0.25rem' }}>
                                  📞{' '}
                                  <a
                                    href={`tel:${String(program.contact_phone).replace(/[^\d+]/g, '')}`}
                                    style={{
                                      color: '#64748b',
                                      textDecoration: 'underline',
                                      textUnderlineOffset: '2px'
                                    }}
                                  >
                                    {program.contact_phone}
                                  </a>
                                </div>
                              )}
                              {program.contact_email && (
                                <div>
                                  📧{' '}
                                  <a
                                    href={`mailto:${program.contact_email}`}
                                    style={{
                                      color: '#64748b',
                                      textDecoration: 'underline',
                                      textUnderlineOffset: '2px'
                                    }}
                                  >
                                    {program.contact_email}
                                  </a>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Program Types */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {/* In-Person Programs */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '0.75rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#1e40af',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="m22 21-3-3m0 0-3-3m3 3 3-3m-3 3-3 3"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#1b1b1b',
                marginBottom: '1rem'
              }}>
                In-Person Programs
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#333333',
                lineHeight: '1.5'
              }}>
                Meet with a lifestyle coach and other participants in a classroom setting for interactive group sessions.
              </p>
            </div>

            {/* Live Virtual Programs */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '0.75rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#059669',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#1b1b1b',
                marginBottom: '1rem'
              }}>
                Live Virtual Programs
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#333333',
                lineHeight: '1.5'
              }}>
                Join interactive group sessions from home using video conferencing platforms like Zoom.
              </p>
            </div>

            {/* On-Demand Programs */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '0.75rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#0ea5e9',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                  <circle cx="12" cy="10" r="2"/>
                  <path d="M12 14l-3 3h6l-3-3z"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#1b1b1b',
                marginBottom: '1rem'
              }}>
                On-Demand Programs
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#333333',
                lineHeight: '1.5'
              }}>
                Complete sessions at your own pace using a smartphone, tablet, or computer with flexible scheduling.
              </p>
            </div>
          </div>

          {/* At a Glance Info */}
          <div style={{
            backgroundColor: '#eff6ff',
            padding: '2rem',
            borderRadius: '0.75rem',
            border: '1px solid #bfdbfe'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1e40af',
              marginBottom: '1rem'
            }}>
              About the National Diabetes Prevention Program
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '1.5rem'
            }}>
              <div>
                <h4 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#1b1b1b',
                  marginBottom: '0.5rem'
                }}>
                  Proven Results
                </h4>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#333333',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  CDC-recognized programs have been proven to reduce the risk of developing type 2 diabetes by 58% through lifestyle changes.
                </p>
              </div>
              <div>
                <h4 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#1b1b1b',
                  marginBottom: '0.5rem'
                }}>
                  Expert Support
                </h4>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#333333',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  Trained lifestyle coaches guide you through evidence-based curriculum focused on healthy eating and physical activity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LifestylePrograms;
