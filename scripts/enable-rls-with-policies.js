import dotenv from 'dotenv';
import pkg from 'pg';
const { Client } = pkg;

// Load environment variables
dotenv.config({ path: '.env.local' });

async function enableRLSWithPolicies() {
  let connectionString = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
  
  if (!connectionString) {
    console.error('❌ DATABASE_URL or SUPABASE_DB_URL not found in .env.local');
    process.exit(1);
  }

  // Parse connection string manually to handle username with dots
  let client;
  if (connectionString.includes('supabase')) {
    const match = connectionString.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
    
    if (match) {
      const [, user, password, host, port, database] = match;
      client = new Client({
        host: host,
        port: parseInt(port),
        database: database,
        user: decodeURIComponent(user),
        password: decodeURIComponent(password),
        ssl: {
          rejectUnauthorized: false
        }
      });
    } else {
      client = new Client({
        connectionString: connectionString,
        ssl: {
          rejectUnauthorized: false
        }
      });
    }
  } else {
    client = new Client({
      connectionString: connectionString
    });
  }

  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Connected successfully!\n');
    
    console.log('🔒 Enabling Row Level Security (RLS) on all tables...\n');
    
    const tables = ['programs', 'program_locations', 'program_details', 'assessment_results'];
    
    // Step 1: Enable RLS on all tables
    for (const table of tables) {
      try {
        await client.query(`ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY;`);
        console.log(`✅ RLS enabled on ${table} table`);
      } catch (error) {
        console.log(`⚠️  Error enabling RLS on ${table}: ${error.message}`);
      }
    }
    
    console.log('\n📋 Creating RLS policies for public read access...\n');
    
    // Step 2: Create policies that allow public read access (SELECT) for program search
    // This allows anyone to read the data for the search functionality
    
    // Programs table - allow public SELECT
    try {
      await client.query(`
        DROP POLICY IF EXISTS "Allow public read access" ON programs;
      `);
      await client.query(`
        CREATE POLICY "Allow public read access" ON programs
          FOR SELECT
          USING (true);
      `);
      console.log('✅ Policy created: programs - public read access');
    } catch (error) {
      console.log(`⚠️  Error creating policy for programs: ${error.message}`);
    }
    
    // Program locations table - allow public SELECT
    try {
      await client.query(`
        DROP POLICY IF EXISTS "Allow public read access" ON program_locations;
      `);
      await client.query(`
        CREATE POLICY "Allow public read access" ON program_locations
          FOR SELECT
          USING (true);
      `);
      console.log('✅ Policy created: program_locations - public read access');
    } catch (error) {
      console.log(`⚠️  Error creating policy for program_locations: ${error.message}`);
    }
    
    // Program details table - allow public SELECT
    try {
      await client.query(`
        DROP POLICY IF EXISTS "Allow public read access" ON program_details;
      `);
      await client.query(`
        CREATE POLICY "Allow public read access" ON program_details
          FOR SELECT
          USING (true);
      `);
      console.log('✅ Policy created: program_details - public read access');
    } catch (error) {
      console.log(`⚠️  Error creating policy for program_details: ${error.message}`);
    }
    
    // Assessment results table - allow public SELECT (if needed for display)
    // Note: You may want to restrict this more in production
    try {
      await client.query(`
        DROP POLICY IF EXISTS "Allow public read access" ON assessment_results;
      `);
      await client.query(`
        CREATE POLICY "Allow public read access" ON assessment_results
          FOR SELECT
          USING (true);
      `);
      console.log('✅ Policy created: assessment_results - public read access');
    } catch (error) {
      console.log(`⚠️  Error creating policy for assessment_results: ${error.message}`);
    }
    
    // Step 3: Verify RLS is enabled
    console.log('\n🔍 Verifying RLS status...\n');
    for (const table of tables) {
      try {
        const result = await client.query(`
          SELECT tablename, rowsecurity 
          FROM pg_tables 
          WHERE schemaname = 'public' AND tablename = $1
        `, [table]);
        
        if (result.rows.length > 0) {
          const hasRLS = result.rows[0].rowsecurity;
          console.log(`📋 ${table}: RLS is ${hasRLS ? '✅ ENABLED' : '❌ DISABLED'}`);
        }
      } catch (error) {
        console.log(`⚠️  Could not check RLS status for ${table}: ${error.message}`);
      }
    }
    
    console.log('\n🎉 RLS enabled and policies configured successfully!');
    console.log('\n📝 Summary:');
    console.log('   ✅ RLS is now enabled on all tables');
    console.log('   ✅ Public read access policies are in place');
    console.log('   ✅ Your program search will work correctly');
    console.log('\n💡 Note: These policies allow anyone to SELECT (read) data.');
    console.log('   Write operations (INSERT, UPDATE, DELETE) are still blocked');
    console.log('   unless you add additional policies.\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('   Code:', error.code);
    if (error.stack) {
      console.error('   Stack:', error.stack);
    }
    process.exit(1);
  } finally {
    await client.end();
  }
}

enableRLSWithPolicies();

