import dotenv from 'dotenv';
import pkg from 'pg';
const { Client } = pkg;

dotenv.config({ path: '.env.local' });

async function testConnection() {
  const connectionString = process.env.DATABASE_URL;
  
  console.log('Testing connection string:', connectionString?.replace(/:[^:@]+@/, ':****@'));
  
  if (!connectionString) {
    console.error('❌ DATABASE_URL not found');
    process.exit(1);
  }

  const client = new Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('\n🔌 Attempting to connect...');
    await client.connect();
    console.log('✅ Connected successfully!');
    
    const result = await client.query('SELECT version(), current_database()');
    console.log('\n📊 Database Info:');
    console.log('   Version:', result.rows[0].version.split(',')[0]);
    console.log('   Database:', result.rows[0].current_database);
    
    await client.end();
    console.log('\n✅ Connection test passed!');
    
  } catch (error) {
    console.error('\n❌ Connection failed:');
    console.error('   Error:', error.message);
    console.error('   Code:', error.code);
    if (error.code === 'ENOTFOUND') {
      console.error('\n💡 Hostname cannot be resolved. Possible issues:');
      console.error('   1. Project might not be fully provisioned yet');
      console.error('   2. Network/DNS issue');
      console.error('   3. Connection string format might be incorrect');
    }
    process.exit(1);
  }
}

testConnection();


