import dotenv from 'dotenv';
import pkg from 'pg';
const { Client } = pkg;

dotenv.config({ path: '.env.local' });

async function testConnection() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('🔌 Connecting to Supabase database...\n');

  // Parse connection string manually to handle username with dots
  const match = connectionString.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  if (!match) {
    throw new Error('Invalid connection string format');
  }
  
  const [, user, password, host, port, database] = match;
  const decodedUser = decodeURIComponent(user);
  const decodedPassword = decodeURIComponent(password);
  
  console.log('Connection details:');
  console.log('  Host:', host);
  console.log('  Port:', port);
  console.log('  Database:', database);
  console.log('  User:', decodedUser);
  console.log('  Password:', decodedPassword.substring(0, 3) + '...' + decodedPassword.substring(decodedPassword.length - 3));
  console.log();
  
  const client = new Client({
    host: host,
    port: parseInt(port),
    database: database,
    user: decodedUser, // postgres.ufbsxkthiviynluoqsdf
    password: decodedPassword,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('✅ Connected successfully!\n');
    
    // Get database info
    const version = await client.query('SELECT version(), current_database(), current_user');
    console.log('📊 Database Info:');
    console.log('   PostgreSQL:', version.rows[0].version.split(',')[0]);
    console.log('   Database:', version.rows[0].current_database);
    console.log('   User:', version.rows[0].current_user);
    console.log();
    
    // Check tables
    const tables = await client.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename
    `);
    
    console.log('📋 Tables found:', tables.rows.length);
    for (const table of tables.rows) {
      const count = await client.query(`SELECT COUNT(*) as count FROM ${table.tablename}`);
      console.log(`   - ${table.tablename}: ${count.rows[0].count} row(s)`);
    }
    console.log();
    
    // Check programs
    const programs = await client.query(`
      SELECT 
        p.id,
        p.organization_name,
        pl.city,
        pl.state,
        pd.delivery_mode,
        pd.enrollment_status
      FROM programs p
      LEFT JOIN program_locations pl ON p.id = pl.program_id
      LEFT JOIN program_details pd ON p.id = pd.program_id
      ORDER BY p.organization_name
    `);
    
    console.log('🏥 Programs in database:', programs.rows.length);
    for (const prog of programs.rows) {
      console.log(`   ${prog.organization_name} (${prog.city}, ${prog.state}) - ${prog.delivery_mode}`);
    }
    console.log();
    
    // Check programs with coordinates (for map)
    const withCoords = await client.query(`
      SELECT COUNT(*) as count 
      FROM program_locations 
      WHERE latitude IS NOT NULL AND longitude IS NOT NULL
    `);
    console.log(`🗺️  Programs with coordinates (for map): ${withCoords.rows[0].count}`);
    
    await client.end();
    console.log('\n✅ Connection test passed! Your Supabase database is working correctly.');
    
  } catch (error) {
    console.error('\n❌ Connection failed:');
    console.error('   Error:', error.message);
    console.error('   Code:', error.code);
    process.exit(1);
  }
}

testConnection();

