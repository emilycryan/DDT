import dotenv from 'dotenv';
import pkg from 'pg';
const { Client } = pkg;

// Load environment variables
dotenv.config({ path: '.env.local' });

async function disableRLS() {
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
    
    console.log('🔓 Disabling Row Level Security (RLS) on all tables...\n');
    
    const tables = ['programs', 'program_locations', 'program_details', 'assessment_results'];
    
    for (const table of tables) {
      try {
        // Check if RLS is enabled first
        const checkResult = await client.query(`
          SELECT tablename, rowsecurity 
          FROM pg_tables 
          WHERE schemaname = 'public' AND tablename = $1
        `, [table]);
        
        if (checkResult.rows.length > 0) {
          const hasRLS = checkResult.rows[0].rowsecurity;
          console.log(`📋 ${table}: RLS is currently ${hasRLS ? 'ENABLED' : 'DISABLED'}`);
          
          if (hasRLS) {
            await client.query(`ALTER TABLE ${table} DISABLE ROW LEVEL SECURITY;`);
            console.log(`   ✅ RLS disabled on ${table}`);
          } else {
            console.log(`   ℹ️  RLS already disabled on ${table}`);
          }
        } else {
          console.log(`   ⚠️  Table ${table} not found`);
        }
      } catch (error) {
        if (error.code === '42501' || error.message.includes('permission denied')) {
          console.log(`   ❌ Permission denied: Cannot disable RLS on ${table}`);
          console.log(`      You need to run this as a database admin or disable RLS in Supabase dashboard`);
        } else {
          console.log(`   ⚠️  Error on ${table}: ${error.message}`);
        }
      }
    }
    
    console.log('\n✅ RLS configuration complete!');
    console.log('\n💡 If you got permission errors, you can disable RLS in Supabase:');
    console.log('   1. Go to Supabase Dashboard → Table Editor');
    console.log('   2. Click on each table');
    console.log('   3. Go to the "Policies" tab (or table settings)');
    console.log('   4. Disable Row Level Security\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('   Code:', error.code);
    process.exit(1);
  } finally {
    await client.end();
  }
}

disableRLS();

