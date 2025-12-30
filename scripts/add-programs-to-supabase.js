import dotenv from 'dotenv';
import pkg from 'pg';
const { Client } = pkg;

// Load environment variables
dotenv.config({ path: '.env.local' });

async function addProgramsToSupabase() {
  // Use DATABASE_URL from Supabase
  const connectionString = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
  
  if (!connectionString) {
    console.error('❌ DATABASE_URL or SUPABASE_DB_URL not found in .env.local');
    console.log('\n💡 Please add your Supabase connection string to .env.local\n');
    process.exit(1);
  }

  const client = new Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false // Supabase requires SSL
    }
  });

  try {
    console.log('🔌 Connecting to Supabase database...');
    await client.connect();
    console.log('✅ Connected successfully!\n');
    
    console.log('📝 Adding LCI programs...\n');
    
    // LCI - Community Health Centers
    console.log('Adding LCI Health Community Centers...');
    const lciProgram = await client.query(`
      INSERT INTO programs (
        organization_name, 
        cdc_recognition_status, 
        mdpp_supplier, 
        contact_phone, 
        contact_email, 
        description
      ) VALUES (
        $1, $2, $3, $4, $5, $6
      ) RETURNING id, organization_name;
    `, [
      'LCI Health Community Centers',
      'CDC-Recognized',
      true,
      '(555) 234-5678',
      'programs@lcihealth.org',
      'LCI Health offers comprehensive diabetes prevention programs with personalized coaching and support groups in a community-centered environment.'
    ]);
    
    const lciProgramId = lciProgram.rows[0].id;
    console.log(`✅ LCI Program created (ID: ${lciProgramId})`);
    
    // Add LCI location
    await client.query(`
      INSERT INTO program_locations (
        program_id,
        address_line1,
        city,
        state,
        zip_code,
        latitude,
        longitude
      ) VALUES ($1, $2, $3, $4, $5, $6, $7);
    `, [lciProgramId, '456 Community Way', 'Atlanta', 'GA', '30310', 33.7515, -84.3960]);
    console.log('✅ LCI location added');
    
    // Add LCI program details
    await client.query(`
      INSERT INTO program_details (
        program_id,
        delivery_mode,
        language,
        duration_weeks,
        cost,
        max_participants,
        enrollment_status,
        class_schedule
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `, [lciProgramId, 'in-person', 'English', 16, 75.00, 20, 'open', 'Tuesdays 6:00 PM - 7:30 PM']);
    console.log('✅ LCI program details added\n');

    // Riverside Medical Center
    console.log('Adding Riverside Medical Center...');
    const healthCenterProgram = await client.query(`
      INSERT INTO programs (
        organization_name, 
        cdc_recognition_status, 
        mdpp_supplier, 
        contact_phone, 
        contact_email, 
        description
      ) VALUES (
        $1, $2, $3, $4, $5, $6
      ) RETURNING id, organization_name;
    `, [
      'Riverside Medical Center',
      'CDC-Recognized',
      true,
      '(555) 345-6789',
      'wellness@riverside.org',
      'Evidence-based diabetes prevention program with virtual and in-person options, including nutrition counseling and fitness support.'
    ]);
    
    const healthCenterId = healthCenterProgram.rows[0].id;
    console.log(`✅ Riverside Program created (ID: ${healthCenterId})`);
    
    // Add Riverside location
    await client.query(`
      INSERT INTO program_locations (
        program_id,
        address_line1,
        city,
        state,
        zip_code,
        latitude,
        longitude
      ) VALUES ($1, $2, $3, $4, $5, $6, $7);
    `, [healthCenterId, '789 Wellness Blvd', 'Decatur', 'GA', '30030', 33.7748, -84.2963]);
    console.log('✅ Riverside location added');
    
    // Add Riverside program details
    await client.query(`
      INSERT INTO program_details (
        program_id,
        delivery_mode,
        language,
        duration_weeks,
        cost,
        max_participants,
        enrollment_status,
        class_schedule
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `, [healthCenterId, 'hybrid', 'English', 12, 60.00, 15, 'open', 'Saturdays 10:00 AM - 11:30 AM']);
    console.log('✅ Riverside program details added\n');

    // Virtual program
    console.log('Adding Georgia Virtual Wellness...');
    const virtualProgram = await client.query(`
      INSERT INTO programs (
        organization_name, 
        cdc_recognition_status, 
        mdpp_supplier, 
        contact_phone, 
        contact_email, 
        description,
        website_url
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7
      ) RETURNING id, organization_name;
    `, [
      'Georgia Virtual Wellness',
      'CDC-Recognized',
      true,
      '(555) 456-7890',
      'support@gavirtual.org',
      'Fully virtual diabetes prevention program accessible from anywhere in Georgia. Features live coaching sessions and mobile app support.',
      'https://gavirtual.org'
    ]);
    
    const virtualId = virtualProgram.rows[0].id;
    console.log(`✅ Virtual Program created (ID: ${virtualId})`);
    
    // Add Virtual location (state-wide)
    await client.query(`
      INSERT INTO program_locations (
        program_id,
        address_line1,
        city,
        state,
        zip_code
      ) VALUES ($1, $2, $3, $4, $5);
    `, [virtualId, 'Online/Virtual', 'Statewide', 'GA', '30000']);
    console.log('✅ Virtual location added');
    
    // Add Virtual program details
    await client.query(`
      INSERT INTO program_details (
        program_id,
        delivery_mode,
        language,
        duration_weeks,
        cost,
        max_participants,
        enrollment_status,
        class_schedule
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `, [virtualId, 'virtual-live', 'English', 16, 45.00, 25, 'open', 'Wednesdays 7:00 PM - 8:00 PM']);
    console.log('✅ Virtual program details added\n');

    console.log('🎉 All LCI programs added successfully!');
    console.log('\n📊 Summary:');
    console.log('   - LCI Health Community Centers (In-person, Atlanta, GA)');
    console.log('   - Riverside Medical Center (Hybrid, Decatur, GA)');
    console.log('   - Georgia Virtual Wellness (Virtual, Statewide GA)');
    console.log('\n✅ Your Supabase database now contains all LCI programs!');

  } catch (error) {
    console.error('❌ Error adding programs:', error.message);
    if (error.code === '23505') {
      console.error('\n💡 Some programs may already exist. To start fresh, you may need to clear the tables first.');
    }
    process.exit(1);
  } finally {
    await client.end();
  }
}

addProgramsToSupabase();


