-- Insert dummy campaigns without the cover_image column
INSERT INTO campaigns (title, short_description, story, category, target_amount, current_amount, end_date, organizer_name, organizer_bio, is_public, status, backer_count, user_id)
VALUES
  (
    'Clean Water for Rural Communities',
    'Help us bring clean drinking water to 5 villages in Eastern Uganda',
    '<p>Access to clean water remains a critical challenge for many rural communities in Eastern Uganda. This campaign aims to install water purification systems in 5 villages, providing reliable access to clean drinking water for over 2,000 people.</p><p>Each water purification system costs approximately $2,000 to purchase and install. Your contribution will help reduce waterborne diseases and improve overall health outcomes in these communities.</p>',
    'Environment',
    10000,
    3500,
    (CURRENT_TIMESTAMP + INTERVAL '60 days'),
    'Water Access Initiative',
    'A non-profit organization focused on providing clean water solutions to rural communities in Uganda',
    true,
    'active',
    42,
    '1'
  ),
  (
    'Mobile Health Clinic for Remote Areas',
    'Support our initiative to bring healthcare to underserved communities',
    '<p>Many remote communities in Uganda lack access to basic healthcare services. Our mobile health clinic will travel to these areas, providing essential medical care, vaccinations, and health education.</p><p>The mobile clinic will be equipped with diagnostic equipment, essential medicines, and staffed by healthcare professionals. It will serve approximately 10,000 people across 15 remote villages.</p>',
    'Health',
    25000,
    12750,
    (CURRENT_TIMESTAMP + INTERVAL '90 days'),
    'Healthcare Without Borders',
    'A team of healthcare professionals dedicated to improving medical access in rural Uganda',
    true,
    'active',
    85,
    '2'
  ),
  (
    'Scholarship Fund for Girls''s Education',
    'Help send 50 girls to secondary school in Northern Uganda',
    '<p>Education is a powerful tool for breaking the cycle of poverty, especially for girls in rural communities. Our scholarship program aims to support 50 girls from low-income families in Northern Uganda to complete their secondary education.</p><p>Each scholarship covers school fees, uniforms, books, and supplies for one academic year. We also provide mentoring and academic support to ensure the students succeed.</p>',
    'Education',
    15000,
    6800,
    (CURRENT_TIMESTAMP + INTERVAL '120 days'),
    'Education Empowerment Trust',
    'Working to increase educational opportunities for girls in underserved communities',
    true,
    'active',
    73,
    '3'
  );
