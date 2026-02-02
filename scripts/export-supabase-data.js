import dotenv from 'dotenv';
import pkg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { Client } = pkg;

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables - try multiple paths
const projectRoot = path.resolve(__dirname, '..');
const envPaths = [
  path.join(projectRoot, '.env.local'),
  path.join(process.cwd(), '.env.local'),
  '.env.local'
];

let envLoaded = false;
for (const envPath of envPaths) {
  const fullPath = path.resolve(envPath);
  if (fs.existsSync(fullPath)) {
    const result = dotenv.config({ path: fullPath, override: true });
    if (!result.error) {
      envLoaded = true;
      console.log(`✅ Loaded environment from: ${fullPath}`);
      break;
    } else {
      console.log(`⚠️  Error loading ${fullPath}: ${result.error.message}`);
    }
  }
}

if (!envLoaded) {
  console.warn('⚠️  Could not load .env.local, trying default dotenv behavior...');
  dotenv.config();
}

// Create export directory
const exportDir = path.join(__dirname, '../supabase-export');
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true });
}

// Create subdirectories
const csvDir = path.join(exportDir, 'csv');
const jsonDir = path.join(exportDir, 'json');
const schemaDir = path.join(exportDir, 'schema');

[csvDir, jsonDir, schemaDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Database connection function
function createDbClient() {
  // Debug: log what we found
  console.log('🔍 Checking for DATABASE_URL...');
  console.log(`   DATABASE_URL exists: ${!!process.env.DATABASE_URL}`);
  console.log(`   POSTGRES_URL exists: ${!!process.env.POSTGRES_URL}`);
  
  // Check for DATABASE_URL or POSTGRES_URL
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  
  if (connectionString) {
    const isNeon = connectionString.includes('neon.tech');
    console.log(`🔌 Connecting to ${isNeon ? 'Neon' : 'Postgres'} database...`);

    // Neon URLs often have no port (host/dbname?sslmode=require); use full string + SSL
    const match = connectionString.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+?)(?:\?|$)/);
    if (match) {
      const [, user, password, host, port, database] = match;
      return new Client({
        host,
        port: parseInt(port, 10),
        database: database.split('?')[0],
        user: decodeURIComponent(user),
        password: decodeURIComponent(password),
        ssl: { rejectUnauthorized: false },
      });
    }
    return new Client({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });
  }

  console.error('\n❌ ERROR: Database connection string not found!\n');
  console.error('Set one of these in .env.local:');
  console.error('  DATABASE_URL=postgresql://user:password@host/database?sslmode=require');
  console.error('  POSTGRES_URL=postgresql://...\n');
  console.error('Neon: Dashboard → Connect → copy pooled connection string (use ?sslmode=require).');
  console.error('Supabase: Settings → Database → Connection string (URI).\n');
  throw new Error('DATABASE_URL or POSTGRES_URL environment variable required');
}

// Convert array to CSV-safe string
function arrayToCSVString(arr) {
  if (!arr || !Array.isArray(arr)) return '';
  return arr.join('; '); // Use semicolon separator for arrays
}

// Escape CSV values
function escapeCSV(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return arrayToCSVString(value);
    }
    return JSON.stringify(value);
  }
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// Convert rows to CSV
function rowsToCSV(rows, columns) {
  if (rows.length === 0) return '';
  
  // Header row
  const header = columns.map(col => escapeCSV(col)).join(',');
  
  // Data rows
  const dataRows = rows.map(row => {
    return columns.map(col => {
      let value = row[col];
      // Handle PostgreSQL array types
      if (Array.isArray(value)) {
        value = arrayToCSVString(value);
      }
      // Handle JSONB types
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        value = JSON.stringify(value);
      }
      return escapeCSV(value);
    }).join(',');
  });
  
  return [header, ...dataRows].join('\n');
}

// Export table schema
async function exportTableSchema(client, tableName) {
  try {
    // Get column information
    const columns = await client.query(`
      SELECT 
        column_name,
        data_type,
        is_nullable,
        column_default,
        character_maximum_length,
        numeric_precision,
        numeric_scale
      FROM information_schema.columns
      WHERE table_name = $1
        AND table_schema = 'public'
      ORDER BY ordinal_position
    `, [tableName]);

    // Get primary key
    const primaryKey = await client.query(`
      SELECT column_name
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
      WHERE tc.table_name = $1
        AND tc.constraint_type = 'PRIMARY KEY'
        AND tc.table_schema = 'public'
    `, [tableName]);

    // Get foreign keys
    const foreignKeys = await client.query(`
      SELECT
        kcu.column_name,
        ccu.table_name AS foreign_table_name,
        ccu.column_name AS foreign_column_name
      FROM information_schema.table_constraints AS tc
      JOIN information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
        AND tc.table_schema = kcu.table_schema
      JOIN information_schema.constraint_column_usage AS ccu
        ON ccu.constraint_name = tc.constraint_name
        AND ccu.table_schema = tc.table_schema
      WHERE tc.constraint_type = 'FOREIGN KEY'
        AND tc.table_name = $1
        AND tc.table_schema = 'public'
    `, [tableName]);

    // Get row count
    const countResult = await client.query(`SELECT COUNT(*) as count FROM ${tableName}`);
    const rowCount = parseInt(countResult.rows[0].count);

    return {
      tableName,
      rowCount,
      columns: columns.rows,
      primaryKey: primaryKey.rows.map(r => r.column_name),
      foreignKeys: foreignKeys.rows
    };
  } catch (error) {
    console.error(`❌ Error exporting schema for ${tableName}:`, error.message);
    return null;
  }
}

// Export table data
async function exportTableData(client, tableName) {
  try {
    console.log(`  📊 Exporting data from ${tableName}...`);
    
    // Get all data
    const result = await client.query(`SELECT * FROM ${tableName} ORDER BY id`);
    const rows = result.rows;
    
    if (rows.length === 0) {
      console.log(`    ⚠️  No data found in ${tableName}`);
      return { rows: [], columns: [] };
    }
    
    // Get column names
    const columns = Object.keys(rows[0]);
    
    // Export as JSON
    const jsonPath = path.join(jsonDir, `${tableName}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(rows, null, 2), 'utf8');
    console.log(`    ✅ JSON exported: ${rows.length} rows`);
    
    // Export as CSV
    const csvPath = path.join(csvDir, `${tableName}.csv`);
    const csvContent = rowsToCSV(rows, columns);
    fs.writeFileSync(csvPath, csvContent, 'utf8');
    console.log(`    ✅ CSV exported: ${rows.length} rows`);
    
    return { rows, columns };
  } catch (error) {
    console.error(`    ❌ Error exporting data from ${tableName}:`, error.message);
    return { rows: [], columns: [] };
  }
}

// Main export function
async function exportAllData() {
  const client = createDbClient();
  
  try {
    console.log('🚀 Starting Supabase data export...\n');
    
    await client.connect();
    console.log('✅ Connected to database successfully\n');
    
    // Get all tables
    const tablesResult = await client.query(`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public'
        AND tablename NOT LIKE 'pg_%'
        AND tablename NOT LIKE '_prisma%'
      ORDER BY tablename
    `);
    
    const tables = tablesResult.rows.map(r => r.tablename);
    console.log(`📋 Found ${tables.length} tables: ${tables.join(', ')}\n`);
    
    // Export schema and data for each table
    const schemaInfo = {};
    
    for (const tableName of tables) {
      console.log(`\n📦 Processing table: ${tableName}`);
      
      // Export schema
      const schema = await exportTableSchema(client, tableName);
      if (schema) {
        schemaInfo[tableName] = schema;
        const schemaPath = path.join(schemaDir, `${tableName}-schema.json`);
        fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2), 'utf8');
        console.log(`  ✅ Schema exported`);
      }
      
      // Export data
      await exportTableData(client, tableName);
    }
    
    // Create comprehensive schema document
    const fullSchemaPath = path.join(exportDir, 'database-schema.json');
    fs.writeFileSync(fullSchemaPath, JSON.stringify(schemaInfo, null, 2), 'utf8');
    console.log(`\n✅ Full schema exported to database-schema.json`);
    
    // Create summary
    const summary = {
      exportDate: new Date().toISOString(),
      totalTables: tables.length,
      tables: tables,
      exportLocation: exportDir,
      files: {
        csv: tables.map(t => `csv/${t}.csv`),
        json: tables.map(t => `json/${t}.json`),
        schema: tables.map(t => `schema/${t}-schema.json`)
      }
    };
    
    const summaryPath = path.join(exportDir, 'export-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');
    console.log(`✅ Export summary created: export-summary.json`);
    
    console.log(`\n🎉 Export completed successfully!`);
    console.log(`📁 All files saved to: ${exportDir}`);
    
  } catch (error) {
    console.error('❌ Export failed:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Run export if this file is executed directly
const isMainModule = import.meta.url === `file://${process.argv[1]}` || 
                     process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'));

if (isMainModule || process.argv[1]?.includes('export-supabase-data.js')) {
  exportAllData()
    .then(() => {
      console.log('\n✨ All done!');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n💥 Export failed:', error);
      process.exit(1);
    });
}

export { exportAllData, createDbClient };
