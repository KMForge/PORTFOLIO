export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export const projects = [
  {
    id: 1,
    title: 'AI-Powered Attendance System',
    category: 'AI / System',
    description: 'Face recognition-based attendance management system using Python and OpenCV.',
    fullDescription:
      'A fully automated attendance monitoring system that uses real-time facial recognition to record student attendance. Eliminates manual tracking and provides instant reports via a dashboard.',
    image: null,
    tags: ['Python', 'OpenCV', 'Flask', 'MySQL'],
    features: [
      'Real-time face detection & recognition',
      'Admin dashboard with analytics',
      'Export attendance reports (CSV/PDF)',
      'Multi-camera support',
      'Email notifications for absences',
    ],
    github: 'https://github.com/KMForge',
    demo: null,
  },
  {
    id: 2,
    title: 'Student Information System',
    category: 'Web App',
    description: 'Full-stack web application for managing student records, grades, and enrollment.',
    fullDescription:
      'A comprehensive student information system built for academic institutions. Features role-based access control for admins, faculty, and students with a clean, responsive interface.',
    image: null,
    tags: ['PHP', 'MySQL', 'HTML/CSS', 'JavaScript'],
    features: [
      'Role-based access (Admin / Faculty / Student)',
      'Enrollment & grade management',
      'Report card generation',
      'Search and filter students',
      'Audit log for all actions',
    ],
    github: 'https://github.com/KMForge',
    demo: null,
  },
  {
    id: 3,
    title: 'Inventory Management System',
    category: 'System',
    description: 'Desktop-based inventory tracker with real-time stock alerts and reporting.',
    fullDescription:
      'A Java-based desktop application for small businesses to manage their product inventory. Features barcode scanning integration, low-stock alerts, and comprehensive reporting tools.',
    image: null,
    tags: ['Java', 'MySQL', 'JavaFX', 'WAMP'],
    features: [
      'Product catalog management',
      'Real-time stock monitoring',
      'Low-stock automated alerts',
      'Sales and purchase tracking',
      'PDF report generation',
    ],
    github: 'https://github.com/KMForge',
    demo: null,
  },
  {
    id: 4,
    title: 'Personal Portfolio Website',
    category: 'Web App',
    description: 'This portfolio — built with React, Tailwind CSS, and modern animations.',
    fullDescription:
      'A modern, fully responsive developer portfolio website featuring glassmorphism design, smooth scroll animations, dark theme, project showcase with modals, and a working contact form.',
    image: null,
    tags: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    features: [
      'Dark cyberpunk theme',
      'Scroll-triggered animations',
      'Project modals with full details',
      'Working contact form',
      'Fully responsive design',
    ],
    github: 'https://github.com/KMForge',
    demo: '#',
  },
  {
    id: 5,
    title: 'E-Learning Platform',
    category: 'Web App',
    description: 'Online course platform with video lessons, quizzes, and progress tracking.',
    fullDescription:
      'A web-based e-learning platform built with Flask and MySQL. Supports course creation, video embedding, interactive quizzes, and tracks student learning progress with visual dashboards.',
    image: null,
    tags: ['Python', 'Flask', 'MySQL', 'Bootstrap'],
    features: [
      'Course creation and management',
      'Video lesson embedding',
      'Interactive quiz system',
      'Student progress dashboard',
      'Certificate generation',
    ],
    github: 'https://github.com/KMForge',
    demo: null,
  },
  {
    id: 6,
    title: 'Clinic Management System',
    category: 'System',
    description: 'Patient records, appointment scheduling, and prescription management system.',
    fullDescription:
      'A complete clinic management solution designed for small to medium healthcare facilities. Handles patient registration, appointment booking, medical records, and billing.',
    image: null,
    tags: ['Java', 'MySQL', 'JavaFX'],
    features: [
      'Patient registration & records',
      'Appointment scheduling calendar',
      'Prescription & diagnosis tracking',
      'Billing and payment records',
      'Doctor availability management',
    ],
    github: 'https://github.com/KMForge',
    demo: null,
  },
];

export const skills = [
  {
    category: 'Frontend',
    icon: 'frontend',
    items: [
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 85 },
      { name: 'JavaScript', level: 78 },
      { name: 'React', level: 72 },
      { name: 'Tailwind CSS', level: 80 },
    ],
  },
  {
    category: 'Backend',
    icon: 'backend',
    items: [
      { name: 'Python', level: 85 },
      { name: 'Flask', level: 78 },
      { name: 'PHP', level: 75 },
      { name: 'Java', level: 80 },
    ],
  },
  {
    category: 'Database',
    icon: 'database',
    items: [
      { name: 'MySQL', level: 82 },
      { name: 'Supabase', level: 65 },
      { name: 'SQLite', level: 70 },
    ],
  },
  {
    category: 'Tools & DevOps',
    icon: 'tools',
    items: [
      { name: 'Git & GitHub', level: 78 },
      { name: 'VS Code', level: 90 },
      { name: 'WAMP Server', level: 80 },
      { name: 'Figma', level: 65 },
    ],
  },
];

export const socialLinks = {
  github: 'https://github.com/KMForge',
  linkedin: 'https://linkedin.com/in/kent-michael-sulibaga',
  facebook: 'https://facebook.com/Kent Michael Sulibaga',
  email: 'sulibagakent@gmail.com',
  discord: 'KMForge',
};

export const aboutStats = [
  { label: 'Projects Built', value: '10+' },
  { label: 'Technologies', value: '15+' },
  { label: 'Years Studying IT', value: '4' },
  { label: 'Certifications', value: '3+' },
];
