import dotenv from 'dotenv';
import pkg from 'pg';
const { Client } = pkg;

// Load environment variables
dotenv.config({ path: '.env.local' });

async function setupSupabaseSchema() {
  // Use DATABASE_URL from Supabase (Supabase provides this in their dashboard)
  let connectionString = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
  
  if (!connectionString) {
    console.error('❌ DATABASE_URL or SUPABASE_DB_URL not found in .env.local');
    console.log('\n💡 Please add your Supabase connection string to .env.local:');
    console.log('   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres');
    console.log('\n📖 To get your connection string:');
    console.log('   1. Go to your Supabase project dashboard');
    console.log('   2. Go to Settings → Database');
    console.log('   3. Find "Connection string" → "URI"');
    console.log('   4. Copy the connection string and add it to .env.local\n');
    process.exit(1);
  }

  const client = new Client({
    connectionString: connectionString,
    ssl: connectionString.includes('supabase') ? {
      rejectUnauthorized: false // Supabase requires SSL
    } : false
  });

  try {
    console.log('🔌 Connecting to Supabase database...');
    await client.connect();
    console.log('✅ Connected successfully!\n');
    
    console.log('🏗️  Creating database tables...\n');
    
    // Create programs table
    console.log('📋 Creating programs table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS programs (
        id SERIAL PRIMARY KEY,
        organization_name VARCHAR(255) NOT NULL,
        cdc_recognition_status VARCHAR(100),
        mdpp_supplier BOOLEAN DEFAULT FALSE,
        contact_phone VARCHAR(20),
        contact_email VARCHAR(255),
        website_url TEXT,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ programs table created');

    // Create program_locations table
    console.log('📍 Creating program_locations table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS program_locations (
        id SERIAL PRIMARY KEY,
        program_id INTEGER REFERENCES programs(id) ON DELETE CASCADE,
        address_line1 VARCHAR(255),
        address_line2 VARCHAR(255),
        city VARCHAR(100) NOT NULL,
        state VARCHAR(2) NOT NULL,
        zip_code VARCHAR(10) NOT NULL,
        latitude DECIMAL(10,8),
        longitude DECIMAL(11,8),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ program_locations table created');

    // Create program_details table
    console.log('📊 Creating program_details table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS program_details (
        id SERIAL PRIMARY KEY,
        program_id INTEGER REFERENCES programs(id) ON DELETE CASCADE,
        delivery_mode VARCHAR(50),
        language VARCHAR(50) DEFAULT 'English',
        class_schedule TEXT,
        duration_weeks INTEGER,
        cost DECIMAL(10,2),
        insurance_accepted TEXT[],
        max_participants INTEGER,
        current_participants INTEGER DEFAULT 0,
        enrollment_status VARCHAR(20) DEFAULT 'open',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ program_details table created');

    // Create assessment_results table (optional, for future use)
    console.log('📝 Creating assessment_results table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS assessment_results (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(255),
        risk_level VARCHAR(20),
        recommended_program_types TEXT[],
        assessment_data JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ assessment_results table created\n');

    // Enable Row Level Security (RLS) on all tables
    // Supabase requires RLS to be enabled for security compliance
    // We'll create policies separately to allow public read access
    console.log('🔒 Enabling Row Level Security (RLS) on tables...\n');
    
    const tables = ['programs', 'program_locations', 'program_details', 'assessment_results'];
    
    for (const table of tables) {
      try {
        await client.query(`ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY;`);
        console.log(`✅ RLS enabled on ${table} table`);
      } catch (error) {
        // RLS might already be enabled, or we might not have permission
        if (error.code === '42501' || error.message.includes('permission denied')) {
          console.log(`⚠️  Cannot enable RLS on ${table} (may require admin privileges)`);
        } else if (error.message.includes('already enabled')) {
          console.log(`ℹ️  RLS already enabled on ${table}`);
        } else {
          console.log(`⚠️  Warning for ${table}: ${error.message}`);
        }
      }
    }
    
    console.log('\n🎉 All tables created successfully!');
    console.log('\n⚠️  IMPORTANT: RLS is now enabled on all tables.');
    console.log('   You must run the enable-rls-with-policies.js script to create');
    console.log('   policies that allow public read access for the search functionality.');
    console.log('   Run: node scripts/enable-rls-with-policies.js\n');
    console.log('\n📋 Created tables:');
    console.log('   - programs');
    console.log('   - program_locations');
    console.log('   - program_details');
    console.log('   - assessment_results');
    console.log('\n✅ Your Supabase database is ready for LCI programs!');
    console.log('\n💡 Next step: Run the add-programs script to insert LCI programs:');
    console.log('   node scripts/add-programs-to-supabase.js\n');

  } catch (error) {
    console.error('❌ Error setting up schema:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Check your connection string and make sure it\'s correct.');
    }
    process.exit(1);
  } finally {
    await client.end();
  }
}

setupSupabaseSchema();

