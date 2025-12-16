import { Code, BarChart, Palette, TrendingUp, Brain } from 'lucide-react'

export const coursesData = {
  'responsive-web-design': {
    id: '1',
    title: 'Responsive Web Design',
    slug: 'responsive-web-design',
    category: 'Cohort Programs',
    duration: '3 months',
    level: 'Beginner to Intermediate',
    price: 80000,
    enrollmentStatus: 'Open',
    nextCohort: 'January 15, 2026',
    studentsEnrolled: 380,
    rating: 4.9,
    totalReviews: 285,
    description: 'Master HTML5, CSS3, and responsive design principles. Build beautiful, mobile-first websites that work on all devices.',
    overview: 'Become a professional web designer in 3 months. Learn HTML5, CSS3, Flexbox, Grid, and modern responsive design techniques. Build real-world websites and deploy them to production.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80',
    videoPreview: 'https://www.youtube.com/embed/example',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    
    learningOutcomes: [
      'Build responsive, mobile-first websites',
      'Master HTML5 semantic markup',
      'Create stunning layouts with CSS3, Flexbox, and Grid',
      'Implement modern design principles',
      'Optimize websites for performance and accessibility',
      'Deploy websites to live servers',
      'Build a professional portfolio',
      'Work with design tools like Figma'
    ],
    
    curriculum: [
      { 
        module: 'HTML Foundations', 
        weeks: '1-2', 
        topics: ['HTML5 & Semantic Markup', 'Forms & Validation', 'SEO Best Practices', 'Accessibility Standards'] 
      },
      { 
        module: 'CSS Mastery', 
        weeks: '3-5', 
        topics: ['CSS3 Fundamentals', 'Flexbox & Grid Layout', 'Responsive Design', 'CSS Animations & Transitions'] 
      },
      { 
        module: 'Advanced Techniques', 
        weeks: '6-8', 
        topics: ['Mobile-First Design', 'CSS Frameworks (Tailwind/Bootstrap)', 'Design Systems', 'Performance Optimization'] 
      },
      { 
        module: 'Real Projects', 
        weeks: '9-12', 
        topics: ['Portfolio Website', 'E-commerce Landing Page', 'Blog Template', 'Business Website'] 
      }
    ],
    
    prerequisites: ['Basic computer skills', 'No coding experience required', 'Computer with internet access'],
    
    tools: ['VS Code', 'Figma', 'Git & GitHub', 'Chrome DevTools', 'Netlify/Vercel'],
    
    certifications: ['ISO-Standard Certificate', 'Project Portfolio'],
    
    careerPaths: ['Web Designer', 'Frontend Developer', 'UI Developer', 'Freelance Web Developer'],
    
    instructors: [
      { name: 'Ibrahim Yusuf', title: 'Lead Instructor', experience: '8+ years in web development', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ibrahim' },
      { name: 'Ada Nwosu', title: 'Senior Developer', experience: '6+ years experience', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ada' }
    ],
    
    features: [
      'Live online classes 3x per week',
      '24/7 access to learning materials',
      'Lifetime access to course updates',
      'Job placement assistance',
      'Mentorship from industry experts',
      'Build 10+ real-world projects',
      'Resume & portfolio review',
      'Interview preparation'
    ],
    
    schedule: {
      format: 'Hybrid (Online + Physical)',
      classTimes: 'Mon, Wed, Fri - 6:00 PM WAT',
      duration: '2-3 hours per session',
      commitment: '8-12 hours per week'
    },
    
    faqs: [
      {
        question: 'Do I need coding experience?',
        answer: 'No! This course is designed for complete beginners. We start from the basics and gradually build up to advanced topics.'
      },
      {
        question: 'What if I miss a class?',
        answer: 'All classes are recorded and available for replay. You can watch them anytime at your own pace.'
      },
      {
        question: 'Will I get a certificate?',
        answer: 'Yes! Upon completion, you will receive an ISO-standard certificate that you can add to your LinkedIn profile and resume.'
      },
      {
        question: 'Can I build real websites after this course?',
        answer: 'Absolutely! You\'ll build 10+ real projects during the course and have the skills to create professional websites.'
      },
      {
        question: 'Do you offer payment plans?',
        answer: 'Yes, we offer flexible payment plans. Contact our academic coordinator for details.'
      }
    ]
  },
  'javascript-web-development': {
    id: '2',
    title: 'Javascript for Web Development',
    slug: 'javascript-web-development',
    category: 'Cohort Programs',
    duration: '3 months',
    level: 'Beginner to Advanced',
    price: 80000,
    enrollmentStatus: 'Open',
    nextCohort: 'January 20, 2026',
    studentsEnrolled: 340,
    rating: 4.9,
    totalReviews: 265,
    description: 'Master JavaScript ES6+, DOM manipulation, async programming, and modern web development with React.',
    overview: 'Become a JavaScript expert in 3 months. Learn JavaScript fundamentals, ES6+ features, DOM manipulation, API integration, and React. Build interactive web applications and dynamic user interfaces.',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=1200&q=80',
    videoPreview: 'https://www.youtube.com/embed/example',
    icon: Code,
    color: 'from-yellow-500 to-orange-500',
    
    learningOutcomes: [
      'Master JavaScript ES6+ features',
      'Build interactive web applications',
      'Work with APIs and async programming',
      'Create dynamic user interfaces with React',
      'Implement state management',
      'Debug and optimize JavaScript code',
      'Build real-world projects',
      'Deploy applications to production'
    ],
    
    curriculum: [
      { 
        module: 'JavaScript Fundamentals', 
        weeks: '1-3', 
        topics: ['Variables & Data Types', 'Functions & Scope', 'Arrays & Objects', 'ES6+ Features'] 
      },
      { 
        module: 'DOM & Browser APIs', 
        weeks: '4-6', 
        topics: ['DOM Manipulation', 'Event Handling', 'Local Storage', 'Fetch API & AJAX'] 
      },
      { 
        module: 'React Development', 
        weeks: '7-9', 
        topics: ['React Basics & JSX', 'Components & Props', 'State & Hooks', 'React Router'] 
      },
      { 
        module: 'Advanced Projects', 
        weeks: '10-12', 
        topics: ['API Integration', 'Authentication', 'State Management', 'Full Projects'] 
      }
    ],
    
    prerequisites: ['Basic HTML & CSS knowledge', 'Basic computer skills', 'No JavaScript experience required'],
    
    tools: ['VS Code', 'Node.js', 'React', 'Git & GitHub', 'Chrome DevTools', 'Postman'],
    
    certifications: ['ISO-Standard Certificate', 'React Developer Certificate', 'Project Portfolio'],
    
    careerPaths: ['JavaScript Developer', 'React Developer', 'Frontend Developer', 'Full Stack Developer'],
    
    instructors: [
      { name: 'Chinedu Okafor', title: 'Senior JavaScript Developer', experience: '10+ years experience', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chinedu' },
      { name: 'Sarah Chen', title: 'React Specialist', experience: '7+ years at tech companies', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' }
    ],
    
    features: [
      'Live coding sessions 3x per week',
      'Code reviews from experts',
      'Build 8+ projects',
      'React certification prep',
      'Interview preparation',
      'Job placement assistance',
      'Lifetime course access',
      'Community support'
    ],
    
    schedule: {
      format: 'Hybrid (Online + Physical)',
      classTimes: 'Tue, Thu, Sat - 6:00 PM WAT',
      duration: '2-3 hours per session',
      commitment: '10-15 hours per week'
    },
    
    faqs: [
      {
        question: 'Do I need to know HTML/CSS first?',
        answer: 'Basic HTML/CSS knowledge is recommended but not required. We provide a quick refresher at the start.'
      },
      {
        question: 'Will I learn React?',
        answer: 'Yes! React is a major part of this course. You\'ll build multiple React applications.'
      },
      {
        question: 'What projects will I build?',
        answer: 'You\'ll build todo apps, weather apps, e-commerce sites, social media dashboards, and more.'
      },
      {
        question: 'Is JavaScript hard to learn?',
        answer: 'Not with our structured approach! We break down complex concepts into simple, digestible lessons.'
      },
      {
        question: 'Can I get a job after this?',
        answer: 'Yes! JavaScript developers are in high demand. We provide job placement assistance and interview prep.'
      }
    ]
  },
  'data-analysis': {
    id: '3',
    title: 'Data Analysis',
    slug: 'data-analysis',
    category: 'Cohort Programs',
    duration: '3 months',
    level: 'Beginner to Intermediate',
    price: 80000,
    enrollmentStatus: 'Open',
    nextCohort: 'January 25, 2026',
    studentsEnrolled: 380,
    rating: 4.8,
    totalReviews: 285,
    description: 'Transform raw data into actionable insights using Excel, Power BI, Python, and SQL.',
    overview: 'Become a data analyst in 3 months. Learn to collect, clean, analyze, and visualize data. Master Excel, SQL, Python (Pandas, NumPy), and create stunning dashboards with Power BI.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    videoPreview: 'https://www.youtube.com/embed/example',
    icon: BarChart,
    color: 'from-emerald-500 to-teal-500',
    
    learningOutcomes: [
      'Analyze complex datasets using Excel and Python',
      'Create interactive dashboards with Power BI',
      'Write efficient SQL queries for data extraction',
      'Perform statistical analysis and reporting',
      'Clean and transform messy data',
      'Present data insights to stakeholders',
      'Automate repetitive data tasks',
      'Build a professional portfolio'
    ],
    
    curriculum: [
      { 
        module: 'Excel & Data Fundamentals', 
        weeks: '1-3', 
        topics: ['Advanced Excel Functions', 'Pivot Tables & Charts', 'Data Cleaning Techniques', 'Statistical Analysis'] 
      },
      { 
        module: 'SQL & Databases', 
        weeks: '4-6', 
        topics: ['SQL Basics', 'Queries & Joins', 'Database Management', 'Data Extraction'] 
      },
      { 
        module: 'Python for Analysis', 
        weeks: '7-9', 
        topics: ['Python Basics', 'Pandas & NumPy', 'Data Manipulation', 'Matplotlib & Seaborn'] 
      },
      { 
        module: 'Power BI & Projects', 
        weeks: '10-12', 
        topics: ['Power BI Dashboards', 'DAX Functions', 'Data Storytelling', 'Capstone Project'] 
      }
    ],
    
    prerequisites: ['Basic computer skills', 'Basic Excel knowledge', 'No programming experience required'],
    
    tools: ['Microsoft Excel', 'Power BI Desktop', 'Python & Jupyter', 'SQL Server', 'Tableau'],
    
    certifications: ['ISO-Standard Certificate', 'Microsoft Power BI Certification Prep', 'Project Portfolio'],
    
    careerPaths: ['Data Analyst', 'Business Analyst', 'Business Intelligence Developer', 'Analytics Consultant'],
    
    instructors: [
      { name: 'Dr. Chioma Eze', title: 'Lead Data Instructor', experience: '10+ years in data science', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chioma' },
      { name: 'Tunde Bakare', title: 'BI Specialist', experience: '7+ years experience', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tunde' }
    ],
    
    features: [
      'Live online classes 3x per week',
      'Real business case studies',
      'Hands-on projects with real datasets',
      'Power BI & SQL training',
      'Python for data analysis',
      'Career guidance sessions',
      'Resume optimization',
      'Job referral network'
    ],
    
    schedule: {
      format: 'Hybrid (Online + Physical)',
      classTimes: 'Mon, Wed, Fri - 6:00 PM WAT',
      duration: '2-3 hours per session',
      commitment: '10-15 hours per week'
    },
    
    faqs: [
      {
        question: 'Do I need programming experience?',
        answer: 'No! We teach Python from scratch. Basic Excel knowledge is helpful but not required.'
      },
      {
        question: 'What tools will I learn?',
        answer: 'You\'ll master Excel, SQL, Python (Pandas, NumPy), and Power BI - the complete data analytics toolkit.'
      },
      {
        question: 'Can I get a job after this course?',
        answer: 'Yes! Data analysts are in high demand. We provide job placement support and interview preparation.'
      },
      {
        question: 'Is this suitable for business professionals?',
        answer: 'Absolutely! Many students are business professionals looking to make data-driven decisions.'
      },
      {
        question: 'Will I work on real projects?',
        answer: 'Yes! You\'ll analyze real business datasets and create professional dashboards.'
      }
    ]
  },
  'ui-ux-design': {
    id: '4',
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    category: 'Cohort Programs',
    duration: '3 months',
    level: 'Beginner to Advanced',
    price: 80000,
    enrollmentStatus: 'Open',
    nextCohort: 'February 1, 2026',
    studentsEnrolled: 320,
    rating: 4.9,
    totalReviews: 245,
    description: 'Design beautiful, user-friendly interfaces with Figma. Master user research, wireframing, prototyping, and usability testing.',
    overview: 'Become a UI/UX designer in 3 months. Master user research, wireframing, prototyping, visual design, and usability testing. Learn Figma, Adobe XD, and build a professional portfolio with real projects.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
    videoPreview: 'https://www.youtube.com/embed/example',
    icon: Palette,
    color: 'from-pink-500 to-purple-500',
    
    learningOutcomes: [
      'Create user-centered designs based on research',
      'Design high-fidelity mockups in Figma',
      'Build interactive prototypes for testing',
      'Conduct usability tests and iterate designs',
      'Develop design systems and style guides',
      'Present and defend design decisions',
      'Collaborate with developers effectively',
      'Build a professional portfolio'
    ],
    
    curriculum: [
      { 
        module: 'UX Foundations', 
        weeks: '1-3', 
        topics: ['Design Thinking', 'User Research Methods', 'Personas & User Journeys', 'Information Architecture'] 
      },
      { 
        module: 'UI Design Principles', 
        weeks: '4-6', 
        topics: ['Visual Design Fundamentals', 'Typography & Color Theory', 'Layout & Grid Systems', 'Figma & Adobe XD Mastery'] 
      },
      { 
        module: 'Prototyping & Testing', 
        weeks: '7-9', 
        topics: ['Wireframing', 'Interactive Prototyping', 'Usability Testing', 'Design Iteration'] 
      },
      { 
        module: 'Portfolio & Projects', 
        weeks: '10-12', 
        topics: ['Mobile App Design', 'Web Dashboard Design', 'Design Systems', 'Portfolio Development'] 
      }
    ],
    
    prerequisites: ['No design experience required', 'Creative mindset', 'Basic computer skills'],
    
    tools: ['Figma', 'Adobe XD', 'Adobe Photoshop', 'Illustrator', 'Miro', 'Notion'],
    
    certifications: ['ISO-Standard Certificate', 'Google UX Design Certification Prep', 'Professional Portfolio'],
    
    careerPaths: ['UI Designer', 'UX Designer', 'Product Designer', 'Interaction Designer', 'UX Researcher'],
    
    instructors: [
      { name: 'Amara Okafor', title: 'Lead UX Designer', experience: '9+ years experience', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amara' },
      { name: 'Daniel Chen', title: 'Product Designer', experience: '6+ years at tech companies', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel' }
    ],
    
    features: [
      'Live design critiques',
      'Real client projects',
      'Figma & Adobe XD training',
      'Portfolio review sessions',
      'Design system workshop',
      'Freelance opportunities',
      'Networking with designers',
      'Job placement support'
    ],
    
    schedule: {
      format: 'Hybrid (Online + Physical)',
      classTimes: 'Tue, Thu, Sat - 5:00 PM WAT',
      duration: '2-3 hours per session',
      commitment: '8-12 hours per week'
    },
    
    faqs: [
      {
        question: 'Do I need to be artistic?',
        answer: 'Not necessarily! UX design is about understanding users and solving problems. UI design skills can be learned.'
      },
      {
        question: 'What software do I need?',
        answer: 'Figma is free and is our primary tool. We\'ll also use Adobe XD and other free tools.'
      },
      {
        question: 'Will I build a portfolio?',
        answer: 'Yes! You\'ll complete 5+ projects including mobile apps, websites, and dashboards.'
      },
      {
        question: 'Can I freelance with these skills?',
        answer: 'Absolutely! Many students start freelancing during or right after the course.'
      },
      {
        question: 'How long until I can get hired?',
        answer: 'Many students get freelance projects within 1-2 months. Full-time positions typically happen within 3-6 months.'
      }
    ]
  },
  'python-machine-learning': {
    id: '5',
    title: 'Python Programming for Machine Learning',
    slug: 'python-machine-learning',
    category: 'Cohort Programs',
    duration: '3 months',
    level: 'Beginner to Intermediate',
    price: 80000,
    enrollmentStatus: 'Open',
    nextCohort: 'February 10, 2026',
    studentsEnrolled: 220,
    rating: 4.9,
    totalReviews: 185,
    description: 'Master Python programming and machine learning fundamentals. Build ML models, work with data, and create AI applications.',
    overview: 'Dive into Python programming and machine learning in 3 months. Learn Python basics, data structures, NumPy, Pandas, and build machine learning models with scikit-learn. Work on real AI/ML projects.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80',
    videoPreview: 'https://www.youtube.com/embed/example',
    icon: Brain,
    color: 'from-purple-500 to-indigo-500',
    
    learningOutcomes: [
      'Master Python programming fundamentals',
      'Work with NumPy, Pandas, and data libraries',
      'Build machine learning models with scikit-learn',
      'Understand ML algorithms and when to use them',
      'Perform data preprocessing and feature engineering',
      'Create data visualizations',
      'Deploy ML models to production',
      'Build AI-powered applications'
    ],
    
    curriculum: [
      { 
        module: 'Python Fundamentals', 
        weeks: '1-3', 
        topics: ['Python Basics', 'Data Structures', 'Functions & Modules', 'Object-Oriented Programming'] 
      },
      { 
        module: 'Data Science Libraries', 
        weeks: '4-6', 
        topics: ['NumPy Arrays', 'Pandas DataFrames', 'Data Cleaning', 'Matplotlib & Seaborn'] 
      },
      { 
        module: 'Machine Learning', 
        weeks: '7-9', 
        topics: ['ML Fundamentals', 'Supervised Learning', 'Unsupervised Learning', 'Model Evaluation'] 
      },
      { 
        module: 'ML Projects', 
        weeks: '10-12', 
        topics: ['Regression Projects', 'Classification Projects', 'Model Deployment', 'Capstone Project'] 
      }
    ],
    
    prerequisites: ['Basic computer skills', 'Basic mathematics', 'No programming experience required'],
    
    tools: ['Python', 'Jupyter Notebook', 'NumPy', 'Pandas', 'scikit-learn', 'Matplotlib', 'VS Code'],
    
    certifications: ['ISO-Standard Certificate', 'Python Certification', 'ML Project Portfolio'],
    
    careerPaths: ['Python Developer', 'Machine Learning Engineer', 'Data Scientist', 'AI Developer', 'ML Analyst'],
    
    instructors: [
      { name: 'Dr. Ahmed Lawal', title: 'ML Research Lead', experience: 'PhD in AI, 12+ years experience', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed' },
      { name: 'Sarah Chen', title: 'Python Expert', experience: '8+ years in ML/AI', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahML' }
    ],
    
    features: [
      'Live coding sessions 3x per week',
      'Hands-on ML projects',
      'Real-world datasets',
      'ML model deployment',
      'Python certification prep',
      'Career guidance',
      'Interview preparation',
      'Community support'
    ],
    
    schedule: {
      format: 'Hybrid (Online + Physical)',
      classTimes: 'Mon, Wed, Sat - 6:00 PM WAT',
      duration: '2-3 hours per session',
      commitment: '12-15 hours per week'
    },
    
    faqs: [
      {
        question: 'Do I need programming experience?',
        answer: 'No! We teach Python from scratch. Basic computer skills and math understanding are sufficient.'
      },
      {
        question: 'Is this different from full data science?',
        answer: 'This course focuses on Python programming and ML fundamentals, perfect for beginners entering AI/ML.'
      },
      {
        question: 'What ML projects will I build?',
        answer: 'You\'ll build prediction models, classification systems, recommendation engines, and more.'
      },
      {
        question: 'Do I need advanced math?',
        answer: 'Basic math is sufficient. We cover necessary mathematical concepts during the course.'
      },
      {
        question: 'Can I get an ML job after this?',
        answer: 'Yes! This course prepares you for entry-level ML roles. We provide job placement assistance.'
      }
    ]
  },
  'graphics-design': {
    id: '6',
    title: 'Graphics Design',
    slug: 'graphics-design',
    category: 'Cohort Programs',
    duration: '3 months',
    level: 'Beginner to Advanced',
    price: 80000,
    enrollmentStatus: 'Open',
    nextCohort: 'January 28, 2026',
    studentsEnrolled: 280,
    rating: 4.7,
    totalReviews: 212,
    description: 'Master Adobe Creative Suite and design principles. Create logos, brand identities, social media graphics, and start freelancing.',
    overview: 'Learn professional graphic design from scratch in 3 months. Master Photoshop, Illustrator, and InDesign. Create logos, brand identities, social media graphics, and print materials. Build a portfolio and start freelancing.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80',
    videoPreview: 'https://www.youtube.com/embed/example',
    icon: Palette,
    color: 'from-orange-500 to-red-500',
    
    learningOutcomes: [
      'Master Adobe Photoshop, Illustrator, and InDesign',
      'Design professional logos and brand identities',
      'Create engaging social media graphics',
      'Understand color theory, typography, and composition',
      'Build a professional design portfolio',
      'Start earning as a freelance designer',
      'Work with real clients on projects',
      'Price your design services effectively'
    ],
    
    curriculum: [
      { 
        module: 'Design Fundamentals', 
        weeks: '1-2', 
        topics: ['Design Principles & Theory', 'Color Theory & Psychology', 'Typography Mastery', 'Composition & Layout'] 
      },
      { 
        module: 'Adobe Creative Suite', 
        weeks: '3-6', 
        topics: ['Photoshop Photo Editing', 'Illustrator Vector Graphics', 'InDesign Layouts', 'Workflow Optimization'] 
      },
      { 
        module: 'Brand Design', 
        weeks: '7-9', 
        topics: ['Logo Design Process', 'Brand Identity Systems', 'Brand Guidelines', 'Packaging Design'] 
      },
      { 
        module: 'Portfolio & Freelancing', 
        weeks: '10-12', 
        topics: ['Social Media Templates', 'Print Design Projects', 'Portfolio Presentation', 'Client Management'] 
      }
    ],
    
    prerequisites: ['Basic computer skills', 'Creative passion', 'No design experience required'],
    
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Canva Pro', 'Figma', 'Behance'],
    
    certifications: ['ISO-Standard Certificate', 'Adobe Certified Professional Prep', 'Professional Portfolio'],
    
    careerPaths: ['Graphic Designer', 'Brand Designer', 'Freelance Designer', 'Social Media Designer', 'Creative Director'],
    
    instructors: [
      { name: 'Yemi Alade', title: 'Senior Brand Designer', experience: '11+ years professional experience', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yemi' },
      { name: 'Kola Johnson', title: 'Creative Director', experience: '9+ years at top agencies', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kola' }
    ],
    
    features: [
      'Adobe Creative Cloud training',
      'Live design critiques',
      'Real client projects',
      'Freelance platform setup',
      'Design trend workshops',
      'Portfolio website development',
      'Upwork & Fiverr guidance',
      'Client pitch training'
    ],
    
    schedule: {
      format: 'Hybrid (Online + Physical)',
      classTimes: 'Tue, Thu, Sat - 4:00 PM WAT',
      duration: '2-3 hours per session',
      commitment: '10-12 hours per week'
    },
    
    faqs: [
      {
        question: 'Do I need expensive software?',
        answer: 'We provide guidance on accessing Adobe Creative Cloud. Alternatives like Canva and GIMP are also covered.'
      },
      {
        question: 'Can I really start freelancing after 3 months?',
        answer: 'Yes! Many students land their first clients during the course. We help you set up on Fiverr and Upwork.'
      },
      {
        question: 'What if I\'m not naturally creative?',
        answer: 'Design is a learnable skill! We teach you frameworks and processes anyone can follow.'
      },
      {
        question: 'Will I learn logo design?',
        answer: 'Absolutely! Logo and brand identity design is a major part of the curriculum.'
      },
      {
        question: 'How much can I charge as a beginner?',
        answer: 'Our graduates typically charge ₦15,000-₦50,000 per project initially, growing to ₦100,000+ with experience.'
      }
    ]
  },
  // MICRO COURSES
  'cybersecurity-basics': {
    id: 'm1',
    title: 'Cybersecurity Basics',
    slug: 'cybersecurity-basics',
    category: 'Micro Courses',
    duration: '4 weeks',
    level: 'Beginner',
    price: 25000,
    enrollmentStatus: 'Open',
    nextCohort: 'Rolling admission',
    studentsEnrolled: 180,
    rating: 4.6,
    totalReviews: 95,
    description: 'Learn essential cybersecurity concepts, ethical hacking basics, and how to protect systems from threats.',
    overview: 'Master cybersecurity fundamentals in just 4 weeks. Learn about network security, encryption, ethical hacking basics, and how to protect systems and data from cyber threats.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
    videoPreview: 'https://www.youtube.com/embed/example',
    icon: Code,
    color: 'from-red-500 to-orange-500',
    
    learningOutcomes: [
      'Understand cybersecurity fundamentals',
      'Learn basic ethical hacking techniques',
      'Implement security best practices',
      'Protect systems from common threats',
      'Use security tools and software',
      'Identify vulnerabilities'
    ],
    
    curriculum: [
      { module: 'Security Fundamentals', weeks: '1', topics: ['Cybersecurity Basics', 'Threat Landscape', 'Security Principles'] },
      { module: 'Network Security', weeks: '2', topics: ['Firewalls', 'VPNs', 'Network Monitoring'] },
      { module: 'Ethical Hacking', weeks: '3', topics: ['Penetration Testing', 'Vulnerability Scanning', 'Security Tools'] },
      { module: 'Security Practices', weeks: '4', topics: ['Secure Coding', 'Data Protection', 'Incident Response'] }
    ],
    
    prerequisites: ['Basic computer knowledge'],
    tools: ['Kali Linux', 'Wireshark', 'Metasploit', 'Nmap'],
    certifications: ['Certificate of Completion'],
    careerPaths: ['Cybersecurity Analyst', 'Security Consultant', 'Ethical Hacker'],
    instructors: [
      { name: 'Security Expert', title: 'Cybersecurity Specialist', experience: '10+ years', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Security' }
    ],
    features: [
      'Self-paced learning',
      'Hands-on labs',
      'Security tools training',
      'Certificate of completion'
    ],
    schedule: {
      format: 'Online',
      classTimes: 'Self-paced',
      duration: '4 weeks',
      commitment: '4-6 hours per week'
    },
    faqs: [
      {
        question: 'Is this course for beginners?',
        answer: 'Yes! No prior cybersecurity experience is needed. We cover everything from the basics.'
      }
    ]
  },
  'social-media-design': {
    id: 'm2',
    title: 'Social Media Design',
    slug: 'social-media-design',
    category: 'Micro Courses',
    duration: '3 weeks',
    level: 'Beginner',
    price: 20000,
    enrollmentStatus: 'Open',
    nextCohort: 'Rolling admission',
    studentsEnrolled: 250,
    rating: 4.7,
    totalReviews: 142,
    description: 'Create stunning social media graphics for Instagram, Facebook, and Twitter using Canva and design principles.',
    overview: 'Learn to create professional social media graphics in 3 weeks. Master Canva, design principles, and create content that engages your audience across all platforms.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80',
    videoPreview: 'https://www.youtube.com/embed/example',
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    
    learningOutcomes: [
      'Master Canva Pro',
      'Design for all social platforms',
      'Create branded content',
      'Understand color and typography',
      'Build a content calendar',
      'Grow your following'
    ],
    
    curriculum: [
      { module: 'Design Basics', weeks: '1', topics: ['Canva Mastery', 'Design Principles', 'Color Theory'] },
      { module: 'Platform-Specific Design', weeks: '2', topics: ['Instagram Posts', 'Facebook Graphics', 'Twitter Headers'] },
      { module: 'Content Strategy', weeks: '3', topics: ['Content Calendar', 'Branding', 'Engagement Tips'] }
    ],
    
    prerequisites: ['Basic computer skills'],
    tools: ['Canva Pro', 'Figma'],
    certifications: ['Certificate of Completion'],
    careerPaths: ['Social Media Manager', 'Content Creator', 'Freelance Designer'],
    instructors: [
      { name: 'Design Guru', title: 'Social Media Designer', experience: '5+ years', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Designer' }
    ],
    features: [
      'Canva Pro access included',
      '50+ templates',
      'Social media strategy guide',
      'Certificate of completion'
    ],
    schedule: {
      format: 'Online',
      classTimes: 'Self-paced',
      duration: '3 weeks',
      commitment: '3-5 hours per week'
    },
    faqs: [
      {
        question: 'Do I need design experience?',
        answer: 'No! This course is perfect for beginners. We teach you everything step by step.'
      }
    ]
  },
  'javascript-crash': {
    id: 'm3',
    title: 'JavaScript Crash Course',
    slug: 'javascript-crash',
    category: 'Micro Courses',
    duration: '3 weeks',
    level: 'Beginner',
    price: 22000,
    enrollmentStatus: 'Open',
    nextCohort: 'Rolling admission',
    studentsEnrolled: 320,
    rating: 4.8,
    totalReviews: 198,
    description: 'Master JavaScript fundamentals fast. Learn ES6+, DOM manipulation, and build interactive web projects.',
    overview: 'Learn JavaScript essentials in 3 intensive weeks. Cover variables, functions, arrays, objects, DOM manipulation, and ES6+ features. Build 5 hands-on projects.',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=1200&q=80',
    videoPreview: 'https://www.youtube.com/embed/example',
    icon: Code,
    color: 'from-yellow-500 to-orange-500',
    
    learningOutcomes: [
      'Master JavaScript fundamentals',
      'Work with ES6+ features',
      'Manipulate the DOM',
      'Handle async operations',
      'Build interactive projects',
      'Debug like a pro'
    ],
    
    curriculum: [
      { module: 'JS Fundamentals', weeks: '1', topics: ['Variables & Data Types', 'Functions', 'Arrays & Objects'] },
      { module: 'DOM & Events', weeks: '2', topics: ['DOM Manipulation', 'Event Handling', 'Forms'] },
      { module: 'Modern JavaScript', weeks: '3', topics: ['ES6+ Features', 'Async/Await', 'Mini Projects'] }
    ],
    
    prerequisites: ['Basic HTML & CSS'],
    tools: ['VS Code', 'Chrome DevTools'],
    certifications: ['Certificate of Completion'],
    careerPaths: ['Frontend Developer', 'Web Developer', 'JavaScript Developer'],
    instructors: [
      { name: 'JS Expert', title: 'JavaScript Developer', experience: '7+ years', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JSExpert' }
    ],
    features: [
      '5 hands-on projects',
      'Code challenges',
      'Cheat sheets',
      'Certificate of completion'
    ],
    schedule: {
      format: 'Online',
      classTimes: 'Self-paced',
      duration: '3 weeks',
      commitment: '5-8 hours per week'
    },
    faqs: [
      {
        question: 'Do I need programming experience?',
        answer: 'Basic HTML/CSS knowledge is helpful, but we start from the JavaScript basics.'
      }
    ]
  },
  'freelancing-career': {
    id: 'm4',
    title: 'Freelancing Career Launch',
    slug: 'freelancing-career',
    category: 'Micro Courses',
    duration: '2 weeks',
    level: 'Beginner',
    price: 18000,
    enrollmentStatus: 'Open',
    nextCohort: 'Rolling admission',
    studentsEnrolled: 195,
    rating: 4.5,
    totalReviews: 87,
    description: 'Launch your freelance career on Upwork, Fiverr, and local platforms. Learn pricing, proposals, and client management.',
    overview: 'Start earning as a freelancer in 2 weeks. Learn how to set up profiles, write winning proposals, price your services, and land your first clients on Upwork, Fiverr, and local platforms.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80',
    videoPreview: 'https://www.youtube.com/embed/example',
    icon: TrendingUp,
    color: 'from-green-500 to-teal-500',
    
    learningOutcomes: [
      'Set up winning freelance profiles',
      'Write proposals that convert',
      'Price your services correctly',
      'Find and land clients',
      'Manage projects effectively',
      'Build client relationships'
    ],
    
    curriculum: [
      { module: 'Freelance Foundations', weeks: '1', topics: ['Platform Setup', 'Profile Optimization', 'Pricing Strategy'] },
      { module: 'Getting Clients', weeks: '2', topics: ['Proposal Writing', 'Client Communication', 'Project Management'] }
    ],
    
    prerequisites: ['Any skill to offer (design, writing, coding, etc.)'],
    tools: ['Upwork', 'Fiverr', 'LinkedIn'],
    certifications: ['Certificate of Completion'],
    careerPaths: ['Freelancer', 'Independent Contractor', 'Consultant'],
    instructors: [
      { name: 'Freelance Pro', title: 'Freelance Consultant', experience: '8+ years freelancing', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Freelancer' }
    ],
    features: [
      'Profile templates',
      'Proposal templates',
      'Pricing calculator',
      'Certificate of completion'
    ],
    schedule: {
      format: 'Online',
      classTimes: 'Self-paced',
      duration: '2 weeks',
      commitment: '3-4 hours per week'
    },
    faqs: [
      {
        question: 'What skills can I freelance with?',
        answer: 'Any skill! Design, writing, coding, virtual assistance, marketing, and more. We show you how to package and sell your skills.'
      }
    ]
  },
  'ai-tools-productivity': {
    id: 'm5',
    title: 'AI Tools for Productivity',
    slug: 'ai-tools-productivity',
    category: 'Micro Courses',
    duration: '2 weeks',
    level: 'Beginner',
    price: 20000,
    enrollmentStatus: 'Open',
    nextCohort: 'Rolling admission',
    studentsEnrolled: 285,
    rating: 4.9,
    totalReviews: 156,
    description: 'Master ChatGPT, Midjourney, and AI productivity tools to 10x your output in 2025.',
    overview: 'Supercharge your productivity with AI in just 2 weeks. Master ChatGPT, Midjourney, Notion AI, and other cutting-edge tools. Learn prompt engineering and AI workflows.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
    videoPreview: 'https://www.youtube.com/embed/example',
    icon: TrendingUp,
    color: 'from-purple-500 to-pink-500',
    
    learningOutcomes: [
      'Master ChatGPT and prompt engineering',
      'Create AI art with Midjourney',
      'Automate tasks with AI',
      'Use AI for content creation',
      'Boost productivity 10x',
      'Stay ahead of AI trends'
    ],
    
    curriculum: [
      { module: 'AI Fundamentals', weeks: '1', topics: ['ChatGPT Mastery', 'Prompt Engineering', 'AI Writing Tools'] },
      { module: 'Advanced AI Tools', weeks: '2', topics: ['Midjourney Art', 'AI Automation', 'Productivity Workflows'] }
    ],
    
    prerequisites: ['None - open to everyone'],
    tools: ['ChatGPT', 'Midjourney', 'Notion AI', 'Copy.ai'],
    certifications: ['Certificate of Completion'],
    careerPaths: ['AI Consultant', 'Content Creator', 'Productivity Coach'],
    instructors: [
      { name: 'AI Innovator', title: 'AI & Automation Expert', experience: '5+ years with AI', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AIExpert' }
    ],
    features: [
      'AI tool access guide',
      '100+ prompt templates',
      'Automation workflows',
      'Certificate of completion'
    ],
    schedule: {
      format: 'Online',
      classTimes: 'Self-paced',
      duration: '2 weeks',
      commitment: '3-5 hours per week'
    },
    faqs: [
      {
        question: 'Do I need technical skills?',
        answer: 'Not at all! This course is designed for everyone. If you can use a computer, you can learn AI tools.'
      }
    ]
  }
}

export type CourseData = typeof coursesData[keyof typeof coursesData]
