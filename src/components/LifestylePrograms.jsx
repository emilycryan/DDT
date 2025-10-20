import React, { useState, useEffect } from 'react';

const LifestylePrograms = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Function to search programs by location
  const searchPrograms = async () => {
    if (!searchInput.trim()) {
      setError('Please enter a location to search');
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const locationParams = parseLocationInput(searchInput);
      const queryParams = new URLSearchParams();
      
      if (locationParams.zipCode) queryParams.append('zipCode', locationParams.zipCode);
      if (locationParams.state) queryParams.append('state', locationParams.state);
      if (locationParams.city) queryParams.append('city', locationParams.city);

      const response = await fetch(`http://localhost:3004/api/programs/search?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to search programs');
      }

      const data = await response.json();
      setSearchResults(data.programs || []);
      
    } catch (error) {
      console.error('Error searching programs:', error);
      setError('Unable to search programs. Please try again.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press in search input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchPrograms();
    }
  };

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
            color: '#1e293b',
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
            color: '#64748b',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Connect with CDC-recognized lifestyle change programs in your area. These evidence-based programs are proven to reduce the risk of type 2 diabetes by 58%.
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
            color: '#1e293b',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Find a Program Near You
          </h2>

          {/* Search Form Placeholder */}
          <div style={{
            backgroundColor: '#f8fafc',
            padding: '2rem',
            borderRadius: '0.75rem',
            border: '1px solid #e2e8f0',
            marginBottom: '3rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
              gap: '1rem',
              alignItems: 'end'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Enter your city, state, or zip code
                </label>
                <input
                  type="text"
                  placeholder="e.g., Atlanta, GA or 30309"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    opacity: isLoading ? 0.6 : 1
                  }}
                />
              </div>
              <button 
                onClick={searchPrograms}
                disabled={isLoading || !searchInput.trim()}
                style={{
                  backgroundColor: isLoading || !searchInput.trim() ? '#9ca3af' : '#1e40af',
                  color: 'white',
                  padding: '0.75rem 2rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: isLoading || !searchInput.trim() ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap'
                }}>
                {isLoading ? 'Searching...' : 'Find Programs'}
              </button>
            </div>
            
            {/* Error Message */}
            {error && (
              <div style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '0.375rem',
                padding: '1rem',
                marginTop: '1rem'
              }}>
                <p style={{
                  color: '#dc2626',
                  fontSize: '0.95rem',
                  margin: 0
                }}>
                  {error}
                </p>
              </div>
            )}
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
                color: '#1e293b',
                marginBottom: '1.5rem'
              }}>
                Search Results
                {searchResults.length > 0 && (
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: 'normal',
                    color: '#64748b',
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
                    No programs found in this area
                  </p>
                  <p style={{ fontSize: '0.95rem' }}>
                    Try searching with a different city, state, or zip code
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
                            color: '#1e293b',
                            marginBottom: '0.5rem'
                          }}>
                            {program.organization_name}
                          </h4>
                          
                          {program.description && (
                            <p style={{
                              fontSize: '0.95rem',
                              color: '#64748b',
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
                                {program.city}, {program.state} {program.zip_code}
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
                            
                            {program.cost && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#6b7280' }}>💰</span>
                                <span style={{ color: '#374151' }}>
                                  ${program.cost}
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
                                  📞 {program.contact_phone}
                                </div>
                              )}
                              {program.contact_email && (
                                <div>
                                  📧 {program.contact_email}
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
                color: '#1e293b',
                marginBottom: '1rem'
              }}>
                In-Person Programs
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#64748b',
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
                color: '#1e293b',
                marginBottom: '1rem'
              }}>
                Live Virtual Programs
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#64748b',
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
                color: '#1e293b',
                marginBottom: '1rem'
              }}>
                On-Demand Programs
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#64748b',
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
                  color: '#1e293b',
                  marginBottom: '0.5rem'
                }}>
                  Proven Results
                </h4>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#64748b',
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
                  color: '#1e293b',
                  marginBottom: '0.5rem'
                }}>
                  Expert Support
                </h4>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#64748b',
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
