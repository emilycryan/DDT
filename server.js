import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Use PostgreSQL (Neon, Supabase, or local)
import { searchProgramsByLocation, getProgramById, searchProgramsByDeliveryMode, getAllPrograms } from './lib/local-db.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = 3004;

// Middleware
app.use(cors());
app.use(express.json());

// Sample API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ 
    message: 'Hello from CDC: Path2Prevention API!',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    service: 'CDC: Path2Prevention API',
    timestamp: new Date().toISOString()
  });
});

// Get all programs endpoint (used by the Lifestyle Programs listing)
app.get('/api/programs/all', async (req, res) => {
  try {
    const programs = await getAllPrograms();

    return res.status(200).json({
      success: true,
      count: programs.length,
      programs: programs
    });

  } catch (error) {
    console.error('Get all programs error:', error);
    return res.status(500).json({ 
      message: 'Error getting all programs',
      error: error.message 
    });
  }
});

// Program search endpoints
app.get('/api/programs/search', async (req, res) => {
  try {
    const { zipCode, state, city, radius, deliveryMode } = req.query;
    
    console.log('🔍 Search request received:', {
      zipCode,
      state,
      city,
      radius,
      deliveryMode,
      allQueryParams: req.query
    });

    let programs = [];

    // If deliveryMode is specified, search by delivery mode (no location required)
    if (deliveryMode) {
      console.log('✅ Searching by delivery mode:', deliveryMode);
      programs = await searchProgramsByDeliveryMode(deliveryMode);
      
      return res.status(200).json({
        success: true,
        count: programs.length,
        programs: programs,
        searchCriteria: {
          deliveryMode: deliveryMode,
          locationBased: false
        }
      });
    }

    // Otherwise, require location parameters
    if (!zipCode && !state && !city) {
      console.log('❌ No location parameters and no deliveryMode provided');
      return res.status(400).json({ 
        message: 'At least one location parameter (zipCode, state, or city) is required, or specify deliveryMode' 
      });
    }

    programs = await searchProgramsByLocation(
      zipCode || null, 
      state || null, 
      city || null, 
      parseInt(radius) || 25
    );

    return res.status(200).json({
      success: true,
      count: programs.length,
      programs: programs,
      searchCriteria: {
        zipCode: zipCode || null,
        state: state || null,
        city: city || null,
        radius: parseInt(radius) || 25,
        locationBased: true
      }
    });

  } catch (error) {
    console.error('❌ Program search error:', error.message);
    console.error('   Code:', error.code);
    console.error('   Detail:', error.detail);
    console.error('   Stack:', error.stack);
    return res.status(500).json({ 
      message: 'Error searching programs',
      error: error.message 
    });
  }
});

// Get specific program by ID
app.get('/api/programs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ 
        message: 'Valid program ID is required' 
      });
    }

    const program = await getProgramById(parseInt(id));

    if (!program) {
      return res.status(404).json({ 
        message: 'Program not found' 
      });
    }

    return res.status(200).json({
      success: true,
      program: program
    });

  } catch (error) {
    console.error('Get program error:', error);
    return res.status(500).json({ 
      message: 'Error getting program',
      error: error.message 
    });
  }
});

// Sample POST endpoint
app.post('/api/data', (req, res) => {
  try {
    const { data } = req.body;
    
    if (!data) {
      return res.status(400).json({ error: 'Data is required' });
    }
    
    res.json({
      success: true,
      received: data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, async () => {
  console.log(`🚀 CDC: Path2Prevention API server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log(`  GET  http://localhost:${PORT}/api/hello`);
  console.log(`  GET  http://localhost:${PORT}/api/health`);
  console.log(`  GET  http://localhost:${PORT}/api/programs/all`);
  console.log(`  GET  http://localhost:${PORT}/api/programs/search?state=GA&city=Atlanta`);
  console.log(`  GET  http://localhost:${PORT}/api/programs/1`);
  console.log(`  POST http://localhost:${PORT}/api/data`);
});
