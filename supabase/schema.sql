-- ============================================================
-- Ian Cuaton Portfolio – Supabase SQL Schema
-- Run this in the Supabase SQL Editor (project > SQL Editor)
-- ============================================================

-- ============================================================
-- 1. CONTACT MESSAGES
--    Stores messages submitted through the contact form
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT NOT NULL CHECK (char_length(name) >= 2),
    email       TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    subject     TEXT,
    message     TEXT NOT NULL CHECK (char_length(message) >= 10),
    is_read     BOOLEAN NOT NULL DEFAULT FALSE,
    replied_at  TIMESTAMPTZ,
    ip_address  INET,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 2. PROJECTS
--    Portfolio projects data (replaces hardcoded JS array)
-- ============================================================
CREATE TABLE IF NOT EXISTS projects (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title            TEXT NOT NULL,
    category         TEXT NOT NULL,                       -- 'Web App' | 'AI / System' | 'System'
    description      TEXT NOT NULL,
    full_description TEXT,
    image_url        TEXT,
    tags             TEXT[] NOT NULL DEFAULT '{}',
    features         TEXT[] NOT NULL DEFAULT '{}',
    github_url       TEXT,
    demo_url         TEXT,
    is_featured      BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order       SMALLINT NOT NULL DEFAULT 0,
    is_published     BOOLEAN NOT NULL DEFAULT TRUE,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 3. SKILLS
--    Dynamic skill entries per category
-- ============================================================
CREATE TABLE IF NOT EXISTS skills (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category   TEXT NOT NULL,                            -- 'Frontend' | 'Backend' | 'Database' | 'Tools & DevOps'
    name       TEXT NOT NULL,
    level      SMALLINT NOT NULL CHECK (level BETWEEN 0 AND 100),
    sort_order SMALLINT NOT NULL DEFAULT 0,
    is_visible BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 4. PAGE VIEWS / ANALYTICS (optional)
--    Lightweight visitor tracking without external services
-- ============================================================
CREATE TABLE IF NOT EXISTS page_views (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page       TEXT NOT NULL DEFAULT '/',
    referrer   TEXT,
    user_agent TEXT,
    ip_address INET,
    viewed_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at  ON contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read     ON contact_messages (is_read);
CREATE INDEX IF NOT EXISTS idx_projects_category            ON projects (category);
CREATE INDEX IF NOT EXISTS idx_projects_is_published        ON projects (is_published);
CREATE INDEX IF NOT EXISTS idx_projects_sort_order          ON projects (sort_order);
CREATE INDEX IF NOT EXISTS idx_skills_category              ON skills (category);
CREATE INDEX IF NOT EXISTS idx_page_views_viewed_at         ON page_views (viewed_at DESC);

-- ============================================================
-- AUTO-UPDATE updated_at TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_contact_messages_updated_at
    BEFORE UPDATE ON contact_messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- contact_messages: anyone can INSERT, only authenticated (you) can SELECT/UPDATE/DELETE
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on contact_messages"
    ON contact_messages FOR INSERT
    TO anon
    WITH CHECK (TRUE);

CREATE POLICY "Allow authenticated read on contact_messages"
    ON contact_messages FOR SELECT
    TO authenticated
    USING (TRUE);

CREATE POLICY "Allow authenticated update on contact_messages"
    ON contact_messages FOR UPDATE
    TO authenticated
    USING (TRUE);

CREATE POLICY "Allow authenticated delete on contact_messages"
    ON contact_messages FOR DELETE
    TO authenticated
    USING (TRUE);

-- projects: public read, authenticated write
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on projects"
    ON projects FOR SELECT
    TO anon
    USING (is_published = TRUE);

CREATE POLICY "Allow authenticated write on projects"
    ON projects FOR ALL
    TO authenticated
    USING (TRUE)
    WITH CHECK (TRUE);

-- skills: public read, authenticated write
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on skills"
    ON skills FOR SELECT
    TO anon
    USING (is_visible = TRUE);

CREATE POLICY "Allow authenticated write on skills"
    ON skills FOR ALL
    TO authenticated
    USING (TRUE)
    WITH CHECK (TRUE);

-- page_views: anyone can insert, only authenticated can read
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on page_views"
    ON page_views FOR INSERT
    TO anon
    WITH CHECK (TRUE);

CREATE POLICY "Allow authenticated read on page_views"
    ON page_views FOR SELECT
    TO authenticated
    USING (TRUE);

-- ============================================================
-- SEED DATA – Projects
-- ============================================================
INSERT INTO projects (title, category, description, full_description, tags, features, github_url, is_featured, sort_order) VALUES
(
    'AI-Powered Attendance System',
    'AI / System',
    'Face recognition-based attendance management system using Python and OpenCV.',
    'A fully automated attendance monitoring system that uses real-time facial recognition to record student attendance. Eliminates manual tracking and provides instant reports via a dashboard.',
    ARRAY['Python', 'OpenCV', 'Flask', 'MySQL'],
    ARRAY['Real-time face detection & recognition','Admin dashboard with analytics','Export attendance reports (CSV/PDF)','Multi-camera support','Email notifications for absences'],
    'https://github.com/iancuaton',
    TRUE,
    1
),
(
    'Student Information System',
    'Web App',
    'Full-stack web application for managing student records, grades, and enrollment.',
    'A comprehensive student information system built for academic institutions. Features role-based access control for admins, faculty, and students with a clean, responsive interface.',
    ARRAY['PHP', 'MySQL', 'HTML/CSS', 'JavaScript'],
    ARRAY['Role-based access (Admin / Faculty / Student)','Enrollment & grade management','Report card generation','Search and filter students','Audit log for all actions'],
    'https://github.com/iancuaton',
    TRUE,
    2
),
(
    'Inventory Management System',
    'System',
    'Desktop-based inventory tracker with real-time stock alerts and reporting.',
    'A Java-based desktop application for small businesses to manage their product inventory. Features barcode scanning integration, low-stock alerts, and comprehensive reporting tools.',
    ARRAY['Java', 'MySQL', 'JavaFX', 'WAMP'],
    ARRAY['Product catalog management','Real-time stock monitoring','Low-stock automated alerts','Sales and purchase tracking','PDF report generation'],
    'https://github.com/iancuaton',
    FALSE,
    3
),
(
    'Personal Portfolio Website',
    'Web App',
    'This portfolio — built with React, Tailwind CSS, and modern animations.',
    'A modern, fully responsive developer portfolio website featuring glassmorphism design, smooth scroll animations, dark theme, project showcase with modals, and a working contact form.',
    ARRAY['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    ARRAY['Dark cyberpunk theme','Scroll-triggered animations','Project modals with full details','Working contact form','Fully responsive design'],
    'https://github.com/iancuaton',
    TRUE,
    4
),
(
    'E-Learning Platform',
    'Web App',
    'Online course platform with video lessons, quizzes, and progress tracking.',
    'A web-based e-learning platform built with Flask and MySQL. Supports course creation, video embedding, interactive quizzes, and tracks student learning progress with visual dashboards.',
    ARRAY['Python', 'Flask', 'MySQL', 'Bootstrap'],
    ARRAY['Course creation and management','Video lesson embedding','Interactive quiz system','Student progress dashboard','Certificate generation'],
    'https://github.com/iancuaton',
    FALSE,
    5
),
(
    'Clinic Management System',
    'System',
    'Patient records, appointment scheduling, and prescription management system.',
    'A complete clinic management solution for small to medium healthcare facilities. Handles patient registration, appointment booking, medical records, and billing.',
    ARRAY['Java', 'MySQL', 'JavaFX'],
    ARRAY['Patient registration & records','Appointment scheduling calendar','Prescription & diagnosis tracking','Billing and payment records','Doctor availability management'],
    'https://github.com/iancuaton',
    FALSE,
    6
);

-- ============================================================
-- SEED DATA – Skills
-- ============================================================
INSERT INTO skills (category, name, level, sort_order) VALUES
-- Frontend
('Frontend', 'HTML5', 90, 1),
('Frontend', 'CSS3', 85, 2),
('Frontend', 'JavaScript', 78, 3),
('Frontend', 'React', 72, 4),
('Frontend', 'Tailwind CSS', 80, 5),
-- Backend
('Backend', 'Python', 85, 1),
('Backend', 'Flask', 78, 2),
('Backend', 'PHP', 75, 3),
('Backend', 'Java', 80, 4),
-- Database
('Database', 'MySQL', 82, 1),
('Database', 'Supabase', 65, 2),
('Database', 'SQLite', 70, 3),
-- Tools
('Tools & DevOps', 'Git & GitHub', 78, 1),
('Tools & DevOps', 'VS Code', 90, 2),
('Tools & DevOps', 'Figma', 65, 3);

-- ============================================================
-- USEFUL QUERIES FOR YOUR ADMIN DASHBOARD
-- ============================================================

-- Get all unread messages (newest first):
-- SELECT * FROM contact_messages WHERE is_read = FALSE ORDER BY created_at DESC;

-- Mark a message as read:
-- UPDATE contact_messages SET is_read = TRUE WHERE id = '<uuid>';

-- Get featured projects:
-- SELECT * FROM projects WHERE is_featured = TRUE AND is_published = TRUE ORDER BY sort_order;

-- Get skills grouped by category:
-- SELECT category, json_agg(json_build_object('name', name, 'level', level) ORDER BY sort_order) AS items
-- FROM skills WHERE is_visible = TRUE GROUP BY category;

-- Total message count per day (last 30 days):
-- SELECT DATE(created_at) AS day, COUNT(*) FROM contact_messages
-- WHERE created_at >= NOW() - INTERVAL '30 days' GROUP BY day ORDER BY day DESC;
