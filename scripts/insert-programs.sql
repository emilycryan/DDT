-- Insert LCI Health Community Centers
INSERT INTO programs (
  organization_name, 
  cdc_recognition_status, 
  mdpp_supplier, 
  contact_phone, 
  contact_email, 
  description
) VALUES (
  'LCI Health Community Centers',
  'CDC-Recognized',
  true,
  '(555) 234-5678',
  'programs@lcihealth.org',
  'LCI Health offers comprehensive diabetes prevention programs with personalized coaching and support groups in a community-centered environment.'
) RETURNING id;

-- Note: Replace the program_id below with the ID returned from above
-- For now, using a subquery to get the ID
INSERT INTO program_locations (
  program_id,
  address_line1,
  city,
  state,
  zip_code,
  latitude,
  longitude
) VALUES (
  (SELECT id FROM programs WHERE organization_name = 'LCI Health Community Centers'),
  '456 Community Way',
  'Atlanta',
  'GA',
  '30310',
  33.7515,
  -84.3960
);

INSERT INTO program_details (
  program_id,
  delivery_mode,
  language,
  duration_weeks,
  cost,
  max_participants,
  enrollment_status,
  class_schedule
) VALUES (
  (SELECT id FROM programs WHERE organization_name = 'LCI Health Community Centers'),
  'in-person',
  'English',
  16,
  75.00,
  20,
  'open',
  'Tuesdays 6:00 PM - 7:30 PM'
);

-- Insert Riverside Medical Center
INSERT INTO programs (
  organization_name, 
  cdc_recognition_status, 
  mdpp_supplier, 
  contact_phone, 
  contact_email, 
  description
) VALUES (
  'Riverside Medical Center',
  'CDC-Recognized',
  true,
  '(555) 345-6789',
  'wellness@riverside.org',
  'Evidence-based diabetes prevention program with virtual and in-person options, including nutrition counseling and fitness support.'
) RETURNING id;

INSERT INTO program_locations (
  program_id,
  address_line1,
  city,
  state,
  zip_code,
  latitude,
  longitude
) VALUES (
  (SELECT id FROM programs WHERE organization_name = 'Riverside Medical Center'),
  '789 Wellness Blvd',
  'Decatur',
  'GA',
  '30030',
  33.7748,
  -84.2963
);

INSERT INTO program_details (
  program_id,
  delivery_mode,
  language,
  duration_weeks,
  cost,
  max_participants,
  enrollment_status,
  class_schedule
) VALUES (
  (SELECT id FROM programs WHERE organization_name = 'Riverside Medical Center'),
  'hybrid',
  'English',
  12,
  60.00,
  15,
  'open',
  'Saturdays 10:00 AM - 11:30 AM'
);

-- Insert Georgia Virtual Wellness
INSERT INTO programs (
  organization_name, 
  cdc_recognition_status, 
  mdpp_supplier, 
  contact_phone, 
  contact_email, 
  description,
  website_url
) VALUES (
  'Georgia Virtual Wellness',
  'CDC-Recognized',
  true,
  '(555) 456-7890',
  'support@gavirtual.org',
  'Fully virtual diabetes prevention program accessible from anywhere in Georgia. Features live coaching sessions and mobile app support.',
  'https://gavirtual.org'
) RETURNING id;

INSERT INTO program_locations (
  program_id,
  address_line1,
  city,
  state,
  zip_code
) VALUES (
  (SELECT id FROM programs WHERE organization_name = 'Georgia Virtual Wellness'),
  'Online/Virtual',
  'Statewide',
  'GA',
  '30000'
);

INSERT INTO program_details (
  program_id,
  delivery_mode,
  language,
  duration_weeks,
  cost,
  max_participants,
  enrollment_status,
  class_schedule
) VALUES (
  (SELECT id FROM programs WHERE organization_name = 'Georgia Virtual Wellness'),
  'virtual-live',
  'English',
  16,
  45.00,
  25,
  'open',
  'Wednesdays 7:00 PM - 8:00 PM'
);


