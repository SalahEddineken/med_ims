-- Seed data for portfolio website
-- This migration populates tables with initial data

-- =====================================================
-- SEED PROJECTS
-- =====================================================
INSERT INTO projects (title, description, long_description, tags, demo_url, github_url, image_url, features, timeline, display_order, is_featured)
VALUES
(
    'Algeria''s 2020 COVID-19 Pandemic',
    'the COVID-19 pandemic''s impact on Algeria, focusing on the critical first year of the crisis (2020).',
    'This project analyzes the COVID-19 pandemic''s impact on Algeria, focusing on the critical first year of the crisis (2020). It provides a comprehensive overview of the pandemic''s impact on the country, including the number of cases, deaths, and recoveries. It also provides a detailed analysis of the government''s response to the pandemic, including the measures taken to contain the spread of the virus.',
    ARRAY['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
    'https://salaheddineken.github.io/COVID-19-in-Algeria-2020-/',
    '',
    '/analytics-dashboard.png',
    ARRAY['Data analysis', 'Data visualization', 'Data cleaning', 'Data preprocessing'],
    '3 months',
    1,
    true
),
(
    'The Sahara Superpower: Algeria''s Solar Potential',
    'immense energy potential of Southern Algeria through a data-driven lens.',
    'This project analyzes the solar potential of Southern Algeria through a data-driven lens. It provides a comprehensive overview of the solar potential of the region, including the amount of solar radiation, the amount of solar energy that can be harvested, and the amount of solar energy that can be used to generate electricity.',
    ARRAY['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
    'https://salaheddineken.github.io/Algeria-s-Solar-Potentia/',
    '',
    '/sales-analytics-dashboard.png',
    ARRAY['Data analysis', 'Data visualization', 'Data cleaning', 'Data preprocessing'],
    '2 months',
    2,
    true
),
(
    'Algerian Road Safety Analysis',
    'a data-driven analysis of national traffic accident data in Algeria to uncover critical insights and inform public safety initiatives.',
    'This project analyzes the national traffic accident data in Algeria to uncover critical insights and inform public safety initiatives. It provides a comprehensive overview of the accidents, including the number of accidents, the number of deaths, and the number of injuries.',
    ARRAY['Python', 'SQL', 'Tableau', 'Power BI'],
    'https://salaheddineken.github.io/Algerian-Road-Safety/',
    '',
    '/projects/road-safety-algeria.jpeg',
    ARRAY['Data analysis', 'Data visualization', 'Data cleaning', 'Data preprocessing'],
    '3 months',
    3,
    true
),
(
    'Youth Unemployment Trends in Algeria',
    'a data-driven analysis of youth unemployment trends in Algeria.',
    'This project analyzes the complex issue of youth unemployment in Algeria through a data-driven lens, culminating in a comprehensive analysis ready for infographic presentation.',
    ARRAY['Python', 'Pandas', 'SQL'],
    'https://salaheddineken.github.io/Algeria-s-Youth-Employment/',
    '',
    '/financial-forecasting-charts.jpg',
    ARRAY['Data analysis', 'Data visualization', 'Data cleaning', 'Data preprocessing'],
    '2 months and a half',
    4,
    true
),
(
    'Algeria''s Economic Crossroads',
    'a data-driven analysis of Algeria''s economic crossroads.',
    'This project analyzes Algeria''s economic crossroads through a data-driven lens. It provides a comprehensive overview of the economic crossroads of the country, including the amount of economic crossroads, the amount of economic crossroads imported and exported.',
    ARRAY['Python', 'Pandas', 'SQL', 'Tableau'],
    'https://salaheddineken.github.io/Algeria-Economic-Crossroads/',
    '',
    '/projects/algeria-economic-crossroads.jpeg',
    ARRAY['Data analysis', 'Data visualization', 'Data cleaning', 'Data preprocessing'],
    '2 months and a half',
    5,
    true
);

-- =====================================================
-- SEED MUSIC TRACKS
-- =====================================================
INSERT INTO music_tracks (title, artist, duration, genre, audio_url, cover_url, display_order, is_published)
VALUES
(
    'Midnight Crush',
    'Salaheddine Kennouda',
    '3:45',
    'Lofi',
    '/music/Midnight%20Crush.mp3',
    '/music/covers/Midnight%20Crush-Thumbnail.jpg',
    1,
    true
),
(
    'Urban Echoes',
    'Salaheddine Kennouda',
    '4:12',
    'Ambient',
    '/music/urban-echoes.mp3',
    '/music/covers/urban-echoes.jpg',
    2,
    false
),
(
    'Digital Sunrise',
    'Salaheddine Kennouda',
    '5:30',
    'Synthwave',
    '/music/digital-sunrise.mp3',
    '/music/covers/digital-sunrise.jpg',
    3,
    false
);

-- =====================================================
-- SEED EXPERIENCE
-- =====================================================
INSERT INTO experience (title, company, employment_type, period, description, description2, description3, display_order, is_current)
VALUES
(
    'Data Management Intern',
    'INSFP - Martyr Larbi Ben M''hidi | Mila',
    'Internship',
    '2025 - Present',
    'Architected the back-end on Microsoft SQL Server for persistent data storage, capable of handling over 1,000 student records with efficient query performance',
    'Designed the user interface with the VCL framework and Figma to provide an intuitive and efficient user experience',
    'Implemented a comprehensive student management system, including features for student registration, course enrollment, and academic performance tracking',
    1,
    true
),
(
    'Stock Manager',
    'EURL Montiko',
    'On Site - Full Time',
    '2024',
    'Managed the stock of the company and the inventory of the products',
    'Provided recommendations for improving sales performance',
    NULL,
    2,
    false
),
(
    'Data Management Intern',
    'Bloomsbury Publishing Plc',
    'Remote - Full Time',
    '2024',
    'Developed features and maintained codebases for multiple projects',
    'Developed a robust database schema to support the application, ensuring data integrity and security',
    NULL,
    3,
    false
);

-- =====================================================
-- SEED EDUCATION
-- =====================================================
INSERT INTO education (degree, institution, display_order)
VALUES
(
    'Advanced Technician Certificate in Computer science /Option: Databases',
    'INSFP - Martyr Larbi Ben M''hidi | Mila',
    1
),
(
    'Bachelor of science and Technology',
    'University of Constantine 1',
    2
);

-- =====================================================
-- SEED CERTIFICATES
-- =====================================================
INSERT INTO certificates (title, issuer, issue_date, credential_url, image_url, display_order)
VALUES
(
    'Data Analytics Professional Certificate',
    'Google',
    '2024',
    'https://www.coursera.org/account/accomplishments/professional-cert/F946RN7MVI5E',
    '/certificates/google-data-analytics.png',
    1
),
(
    'Data Analytics Professional Certificate',
    'Meta',
    '2025',
    'https://www.coursera.org/account/accomplishments/professional-cert/RV7CJF3KHA2R',
    '/certificates/meta-data-analytics.png',
    2
);

-- =====================================================
-- SEED SKILLS
-- =====================================================
INSERT INTO skills (name, category, proficiency_level, display_order)
VALUES
('JavaScript/TypeScript', 'Programming', 85, 1),
('React/Next.js', 'Framework', 90, 2),
('Node.js', 'Runtime', 80, 3),
('Python', 'Programming', 85, 4),
('UI/UX Design', 'Design', 75, 5),
('Music Production', 'Creative', 70, 6);

