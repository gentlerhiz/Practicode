import { Code, BarChart, Palette, TrendingUp } from 'lucide-react'

export const coursesData = {
  'frontend-development': {
    id: '1',
    title: 'Frontend Development',
    slug: 'frontend-development',
    category: 'Cohort Programs',
    duration: '4 months',
    level: 'Beginner to Advanced',
    price: 80000,
    enrollmentStatus: 'Open',
    nextCohort: 'January 15, 2026',
    studentsEnrolled: 380,
    rating: 4.9,
    totalReviews: 285,
    description: 'Master frontend development with React, Next.js, TypeScript, and modern UI/UX practices.',
    overview: 'Become a professional frontend developer in 4 months. Learn HTML, CSS, JavaScript, React, Next.js, TypeScript, and responsive design. Build beautiful, interactive user interfaces and deploy production-ready applications.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80',
    videoPreview: 'https://www.youtube.com/embed/example',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    
    learningOutcomes: [
      'Build responsive web applications with React and Next.js',
      'Master modern CSS with Tailwind and styled-components',
      'Implement state management with Redux and Context API',
      'Work with TypeScript for type-safe applications',
      'Create stunning UI animations with Framer Motion',
      'Optimize performance and accessibility',
      'Deploy applications to Vercel and Netlify',
      'Build a professional portfolio'
    ],
    
    curriculum: [
      { 
        module: 'Web Fundamentals', 
        weeks: '1-4', 
        topics: ['HTML5 & Semantic Markup', 'CSS3 & Responsive Design', 'JavaScript ES6+', 'Git & Version Control'] 
      },
      { 
        module: 'React & Modern Frontend', 
        weeks: '5-8', 
        topics: ['React.js & Hooks', 'State Management (Redux)', 'Component Design Patterns', 'API Integration'] 
      },
      { 
        module: 'Advanced Frontend', 
        weeks: '9-12', 
        topics: ['Next.js & SSR', 'TypeScript', 'Testing with Jest', 'Performance Optimization'] 
      },
      { 
        module: 'Portfolio Projects', 
        weeks: '13-16', 
        topics: ['E-commerce Frontend', 'Dashboard Application', 'Portfolio Website', 'Job Preparation'] 
      }
    ],
    
    prerequisites: ['Basic computer skills', 'No coding experience required', 'Computer with internet access'],
    
    tools: ['VS Code', 'Git & GitHub', 'Figma', 'React DevTools', 'Chrome DevTools', 'Vercel'],
    
    certifications: ['ISO-Standard Certificate', 'LinkedIn Certification', 'Project Portfolio'],
    
    careerPaths: ['Frontend Developer', 'React Developer', 'UI Developer', 'Full Stack Developer', 'Technical Lead'],
    
    instructors: [
      { name: 'Ibrahim Yusuf', title: 'Lead Instructor', experience: '8+ years in web development', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ibrahim' },
      { name: 'Ada Nwosu', title: 'Senior Developer', experience: '6+ years at Microsoft', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ada' }
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
        question: 'Is this different from Full Stack?',
        answer: 'Yes! This course focuses exclusively on frontend development, making you an expert in building user interfaces. For backend, check our Backend Development course.'
      },
      {
        question: 'Do you offer payment plans?',
        answer: 'Yes, we offer flexible payment plans. Contact our academic coordinator for details.'
      },
      {
        question: 'Will this help me get a job?',
        answer: 'Absolutely! We provide job placement assistance, resume reviews, portfolio building, and interview preparation to help you land your first tech role.'
      }
    ]
  },
  'data-analytics': {
    id: '3',
    title: 'Data Analytics with Python & Excel',
    slug: 'data-analytics',
    category: 'Cohort Programs',
    duration: '4 months',
    level: 'Beginner to Intermediate',
    price: 80000,
    enrollmentStatus: 'Open',
    nextCohort: 'January 20, 2026',
    studentsEnrolled: 380,
    rating: 4.8,
    totalReviews: 285,
    description: 'Transform raw data into actionable insights using Python, Excel, SQL, and visualization tools.',
    overview: 'Become a data analyst in 4 months. Learn to collect, clean, analyze, and visualize data. Master Python libraries (Pandas, NumPy), SQL databases, Excel for business analytics, and create stunning dashboards with Power BI and Tableau.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    videoPreview: 'https://www.youtube.com/embed/example',
    icon: BarChart,
    color: 'from-emerald-500 to-teal-500',
    
    learningOutcomes: [
      'Analyze complex datasets using Python and Pandas',
      'Create interactive dashboards with Power BI and Tableau',
      'Write efficient SQL queries for data extraction',
      'Perform statistical analysis and hypothesis testing',
      'Build predictive models with machine learning basics',
      'Present data insights to stakeholders effectively',
      'Clean and transform messy data',
      'Automate repetitive data tasks'
    ],
    
    curriculum: [
      { 
        module: 'Python & Excel Fundamentals', 
        weeks: '1-3', 
        topics: ['Python Basics', 'Advanced Excel Functions', 'Data Types & Structures', 'File Handling'] 
      },
      { 
        module: 'Data Manipulation & SQL', 
        weeks: '4-7', 
        topics: ['Pandas DataFrame', 'Data Cleaning Techniques', 'SQL Queries & Joins', 'Database Management'] 
      },
      { 
        module: 'Visualization & BI Tools', 
        weeks: '8-12', 
        topics: ['Matplotlib & Seaborn', 'Power BI Dashboards', 'Tableau Visualizations', 'Storytelling with Data'] 
      },
      { 
        module: 'Analytics Projects', 
        weeks: '13-16', 
        topics: ['Sales Analytics', 'Customer Segmentation', 'Financial Analysis', 'Capstone Project'] 
      }
    ],
    
    prerequisites: ['Basic Excel knowledge', 'No programming experience required', 'Basic math understanding'],
    
    tools: ['Anaconda', 'Jupyter Notebook', 'Power BI Desktop', 'Tableau Public', 'MySQL/PostgreSQL', 'Excel 365'],
    
    certifications: ['ISO-Standard Certificate', 'Microsoft Power BI Certification Prep', 'Project Portfolio'],
    
    careerPaths: ['Data Analyst', 'Business Analyst', 'Business Intelligence Developer', 'Data Scientist', 'Analytics Consultant'],
    
    instructors: [
      { name: 'Dr. Chioma Eze', title: 'Lead Data Instructor', experience: '10+ years in data science', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chioma' },
      { name: 'Tunde Bakare', title: 'BI Specialist', experience: '7+ years at Deloitte', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tunde' }
    ],
    
    features: [
      'Live online classes 3x per week',
      'Real business case studies',
      'Hands-on projects with actual datasets',
      'Power BI & Tableau training',
      'SQL database practice',
      'Career guidance sessions',
      'Resume optimization',
      'Job referral network'
    ],
    
    schedule: {
      format: 'Hybrid (Online + Physical)',
      classTimes: 'Tue, Thu, Sat - 6:00 PM WAT',
      duration: '2-3 hours per session',
      commitment: '8-12 hours per week'
    },
    
    faqs: [
      {
        question: 'Do I need to know programming?',
        answer: 'No programming experience is required. We start with Python basics and gradually build up your skills.'
      },
      {
        question: 'What tools do I need?',
        answer: 'You\'ll need a laptop with at least 4GB RAM. All software we use is free or has free versions available.'
      },
      {
        question: 'How is this different from Excel-only courses?',
        answer: 'This course combines Excel, Python, SQL, and BI tools, giving you a complete data analytics skillset that\'s in high demand.'
      },
      {
        question: 'Can I get a job after this course?',
        answer: 'Yes! Our graduates work as data analysts at companies like Andela, Flutterwave, and PiggyVest. We provide job placement support.'
      },
      {
        question: 'Is this suitable for business professionals?',
        answer: 'Absolutely! Many of our students are business professionals looking to make data-driven decisions. The course is practical and business-focused.'
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
    price: 70000,
    enrollmentStatus: 'Open',
    nextCohort: 'February 1, 2026',
    studentsEnrolled: 320,
    rating: 4.9,
    totalReviews: 245,
    description: 'Design beautiful, user-friendly interfaces with Figma and industry-standard UX practices.',
    overview: 'Become a UI/UX designer in 3 months. Master user research, wireframing, prototyping, visual design, and usability testing. Learn Figma, Adobe XD, and build a professional portfolio with 5+ real projects.',
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
        topics: ['Visual Design Fundamentals', 'Typography & Color Theory', 'Layout & Grid Systems', 'Design Tools (Figma & Adobe XD)'] 
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
      { name: 'Amara Okafor', title: 'Lead UX Designer', experience: '9+ years at Google & Meta', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amara' },
      { name: 'Daniel Chen', title: 'Product Designer', experience: '6+ years at Paystack', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel' }
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
      classTimes: 'Mon, Wed, Sat - 5:00 PM WAT',
      duration: '2 hours per session',
      commitment: '6-10 hours per week'
    },
    
    faqs: [
      {
        question: 'Do I need to be artistic?',
        answer: 'Not necessarily! UX design is more about understanding users and solving problems. UI design skills can be learned through practice.'
      },
      {
        question: 'What software do I need?',
        answer: 'Figma is free and is our primary tool. We\'ll also use Adobe XD (free trial available) and other free tools.'
      },
      {
        question: 'Will I build a portfolio?',
        answer: 'Yes! You\'ll complete 5+ projects including mobile apps, websites, and dashboards that will form your professional portfolio.'
      },
      {
        question: 'Can I freelance with these skills?',
        answer: 'Absolutely! Many of our students start freelancing during or right after the course. We teach you how to find clients and price your services.'
      },
      {
        question: 'How long until I can get hired?',
        answer: 'Many students get freelance projects within 1-2 months. Full-time positions typically happen within 3-6 months after graduation with our job support.'
      }
    ]
  },
  'python-machine-learning': {
    id: '5',
    title: 'Python for Machine Learning',
    slug: 'python-machine-learning',
    category: 'Cohort Programs',
    duration: '5 months',
    level: 'Intermediate',
    price: 100000,
    enrollmentStatus: 'Filling Fast',
    nextCohort: 'February 10, 2026',
    studentsEnrolled: 220,
    rating: 4.9,
    totalReviews: 185,
    description: 'Master machine learning algorithms, deep learning, and AI applications using Python, TensorFlow, and scikit-learn.',
    overview: 'Dive deep into machine learning and AI. Learn supervised and unsupervised learning, neural networks, natural language processing, and computer vision. Build ML models from scratch and deploy them to production. Work on real-world ML projects and Kaggle competitions.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80',
    videoPreview: 'https://www.youtube.com/embed/example',
    icon: TrendingUp,
    color: 'from-purple-500 to-indigo-500',
    
    learningOutcomes: [
      'Build machine learning models with scikit-learn',
      'Develop deep learning models with TensorFlow and Keras',
      'Implement NLP and computer vision applications',
      'Perform feature engineering and model optimization',
      'Deploy ML models to cloud platforms (AWS, GCP)',
      'Work on real-world ML projects and Kaggle competitions',
      'Master MLOps and model monitoring',
      'Land ML engineer or data scientist roles'
    ],
    
    curriculum: [
      { 
        module: 'Python & ML Basics', 
        weeks: '1-4', 
        topics: ['Python Advanced Features', 'NumPy & Pandas Mastery', 'Mathematics for ML', 'ML Fundamentals & Theory'] 
      },
      { 
        module: 'Supervised Learning', 
        weeks: '5-9', 
        topics: ['Linear & Logistic Regression', 'Decision Trees & Random Forests', 'Support Vector Machines', 'Ensemble Methods (XGBoost)'] 
      },
      { 
        module: 'Deep Learning', 
        weeks: '10-16', 
        topics: ['Neural Networks Architecture', 'Convolutional Neural Networks', 'Recurrent Networks & LSTMs', 'Transfer Learning & Fine-tuning'] 
      },
      { 
        module: 'Advanced Topics', 
        weeks: '17-20', 
        topics: ['Natural Language Processing', 'Computer Vision Projects', 'Model Deployment & MLOps', 'Capstone ML Project'] 
      }
    ],
    
    prerequisites: ['Python programming fundamentals', 'Basic mathematics & statistics knowledge', 'Understanding of programming concepts'],
    
    tools: ['Jupyter Notebook', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Docker', 'AWS SageMaker', 'MLflow', 'Keras'],
    
    certifications: ['ISO-Standard Certificate', 'TensorFlow Developer Certification Prep', 'ML Project Portfolio'],
    
    careerPaths: ['Machine Learning Engineer', 'Data Scientist', 'AI Engineer', 'Research Scientist', 'MLOps Engineer'],
    
    instructors: [
      { name: 'Dr. Ahmed Lawal', title: 'ML Research Lead', experience: 'PhD in AI, 12+ years experience', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed' },
      { name: 'Sarah Chen', title: 'Senior AI Engineer', experience: '8+ years at Amazon AI', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' }
    ],
    
    features: [
      'Live coding sessions 3x per week',
      'Kaggle competition participation',
      'GPU-powered cloud notebooks',
      'Real-world ML project portfolio',
      'Research paper discussions',
      'ML interview preparation',
      'Industry mentor connections',
      'Lifetime community access'
    ],
    
    schedule: {
      format: 'Hybrid (Online + Physical)',
      classTimes: 'Tue, Thu, Sat - 6:00 PM WAT',
      duration: '3 hours per session',
      commitment: '15-20 hours per week'
    },
    
    faqs: [
      {
        question: 'Do I need advanced math skills?',
        answer: 'Basic understanding of math and statistics is sufficient. We cover all necessary mathematical concepts during the course.'
      },
      {
        question: 'What Python level do I need?',
        answer: 'You should be comfortable with Python basics (loops, functions, classes). We have a pre-course Python refresher available.'
      },
      {
        question: 'Will I work on real ML projects?',
        answer: 'Yes! You\'ll build 8+ projects including image classifiers, NLP chatbots, recommendation systems, and a capstone project.'
      },
      {
        question: 'What about GPU access for training?',
        answer: 'We provide free cloud GPU access through Google Colab and AWS credits for all students.'
      },
      {
        question: 'Can I transition from data analytics to ML?',
        answer: 'Absolutely! Many of our students come from data analytics backgrounds. The Python and statistics knowledge you have will be very helpful.'
      }
    ]
  },
  'graphics-design': {
    id: '6',
    title: 'Graphics Design & Branding',
    slug: 'graphics-design',
    category: 'Cohort Programs',
    duration: '3 months',
    level: 'Beginner',
    price: 60000,
    enrollmentStatus: 'Open',
    nextCohort: 'January 25, 2026',
    studentsEnrolled: 280,
    rating: 4.7,
    totalReviews: 212,
    description: 'Master Adobe Creative Suite, brand identity design, and social media graphics. Start your freelance design career.',
    overview: 'Learn professional graphic design from scratch. Master Photoshop, Illustrator, and InDesign. Create logos, brand identities, social media graphics, and print materials. Build a stunning portfolio and start freelancing immediately after the course.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80',
    videoPreview: 'https://www.youtube.com/embed/example',
    icon: Palette,
    color: 'from-orange-500 to-red-500',
    
    learningOutcomes: [
      'Master Adobe Photoshop, Illustrator, and InDesign',
      'Design professional logos and brand identities',
      'Create engaging social media graphics and marketing materials',
      'Understand color theory, typography, and composition',
      'Build a professional design portfolio',
      'Start earning as a freelance designer',
      'Work with real clients on branding projects',
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
        topics: ['Logo Design Process', 'Brand Identity Systems', 'Brand Guidelines Creation', 'Packaging Design'] 
      },
      { 
        module: 'Portfolio & Freelancing', 
        weeks: '10-12', 
        topics: ['Social Media Templates', 'Print Design Projects', 'Portfolio Presentation', 'Client Acquisition & Management'] 
      }
    ],
    
    prerequisites: ['Basic computer skills', 'Creative passion', 'No design experience required'],
    
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Canva Pro', 'Figma', 'Behance', 'Pinterest'],
    
    certifications: ['ISO-Standard Certificate', 'Adobe Certified Professional Prep', 'Professional Portfolio'],
    
    careerPaths: ['Graphic Designer', 'Brand Designer', 'Freelance Designer', 'Social Media Designer', 'Creative Director'],
    
    instructors: [
      { name: 'Yemi Alade', title: 'Senior Brand Designer', experience: '11+ years, worked with MTN, Guinness', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yemi' },
      { name: 'Kola Johnson', title: 'Creative Director', experience: '9+ years at top agencies', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kola' }
    ],
    
    features: [
      'Adobe Creative Cloud license included',
      'Live design critiques every class',
      'Real client projects',
      'Freelance platform setup',
      'Design trend workshops',
      'Portfolio website development',
      'Upwork & Fiverr guidance',
      'Client pitch training'
    ],
    
    schedule: {
      format: 'Hybrid (Online + Physical)',
      classTimes: 'Mon, Wed, Fri - 4:00 PM WAT',
      duration: '3 hours per session',
      commitment: '8-12 hours per week'
    },
    
    faqs: [
      {
        question: 'Do I need expensive software?',
        answer: 'Adobe Creative Cloud subscription is included in your tuition. You\'ll have full access throughout the course.'
      },
      {
        question: 'Can I really start freelancing after 3 months?',
        answer: 'Yes! Many students land their first clients during the course. We help you set up profiles on Fiverr, Upwork, and local platforms.'
      },
      {
        question: 'What if I\'m not naturally creative?',
        answer: 'Design is a learnable skill! We teach you frameworks and processes that anyone can follow to create professional designs.'
      },
      {
        question: 'Will I learn logo design?',
        answer: 'Absolutely! Logo and brand identity design is a major part of the curriculum. You\'ll create 10+ logo designs during the course.'
      },
      {
        question: 'How much can I charge as a beginner designer?',
        answer: 'Our graduates typically charge ₦15,000-₦50,000 per project as beginners. With experience, this grows to ₦100,000+ per project.'
      }
    ]
  },
  'backend-nodejs': {
    id: '2',
    title: 'Backend Development',
    slug: 'backend-nodejs',
    category: 'Cohort Programs',
    duration: '4 months',
    level: 'Intermediate',
    price: 140000,
    enrollmentStatus: 'Open',
    nextCohort: 'February 5, 2026',
    studentsEnrolled: 190,
    rating: 4.8,
    totalReviews: 158,
    description: 'Build scalable server-side applications with Node.js, Express, databases, and microservices architecture.',
    overview: 'Specialize in backend development. Master Node.js, Express, RESTful APIs, GraphQL, databases, authentication, testing, and deployment. Build production-grade APIs and microservices that power modern applications.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80',
    videoPreview: 'https://www.youtube.com/embed/example',
    icon: Code,
    color: 'from-green-500 to-emerald-500',
    
    learningOutcomes: [
      'Build RESTful APIs and GraphQL servers',
      'Implement secure authentication and authorization (JWT, OAuth)',
      'Work with MongoDB, PostgreSQL, and Redis caching',
      'Design scalable microservices architecture',
      'Write comprehensive unit and integration tests',
      'Deploy applications to AWS, Docker, and Kubernetes',
      'Implement real-time features with WebSockets',
      'Follow backend best practices and design patterns'
    ],
    
    curriculum: [
      { 
        module: 'Node.js Fundamentals', 
        weeks: '1-4', 
        topics: ['Node.js Core Modules', 'Express.js Framework', 'Async Programming Patterns', 'Error Handling & Logging'] 
      },
      { 
        module: 'Databases & APIs', 
        weeks: '5-8', 
        topics: ['MongoDB & Mongoose ODM', 'PostgreSQL & Prisma ORM', 'REST API Design', 'GraphQL APIs'] 
      },
      { 
        module: 'Security & Testing', 
        weeks: '9-12', 
        topics: ['JWT & OAuth Authentication', 'Security Best Practices', 'Testing with Jest & Supertest', 'API Documentation (Swagger)'] 
      },
      { 
        module: 'Advanced Backend', 
        weeks: '13-16', 
        topics: ['Microservices Architecture', 'WebSockets & Real-time', 'Redis Caching Strategies', 'CI/CD & Cloud Deployment'] 
      }
    ],
    
    prerequisites: ['JavaScript ES6+ fundamentals', 'Basic web development knowledge', 'Command line basics'],
    
    tools: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Redis', 'Docker', 'Postman', 'AWS', 'Jest'],
    
    certifications: ['ISO-Standard Certificate', 'AWS Developer Associate Prep', 'Backend Project Portfolio'],
    
    careerPaths: ['Backend Developer', 'API Developer', 'Full Stack Developer', 'DevOps Engineer', 'Solutions Architect'],
    
    instructors: [
      { name: 'Chinedu Okafor', title: 'Backend Architect', experience: '10+ years at PayStack & Andela', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chinedu' },
      { name: 'Amina Bello', title: 'Senior Backend Engineer', experience: '7+ years in fintech', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amina' }
    ],
    
    features: [
      'Live coding sessions',
      'Code review with industry experts',
      'Build 6+ production APIs',
      'AWS credits for deployment',
      'Docker container training',
      'System design workshops',
      'Interview preparation',
      'Open-source contribution guidance'
    ],
    
    schedule: {
      format: 'Hybrid (Online + Physical)',
      classTimes: 'Tue, Thu, Sat - 6:00 PM WAT',
      duration: '3 hours per session',
      commitment: '12-16 hours per week'
    },
    
    faqs: [
      {
        question: 'Should I take Full Stack or specialize in Backend?',
        answer: 'If you already know frontend basics, specializing in backend will make you an expert. If you\'re starting fresh, Full Stack gives broader skills.'
      },
      {
        question: 'What\'s the difference between this and Full Stack?',
        answer: 'This course goes much deeper into backend topics like microservices, caching strategies, and advanced database optimization that Full Stack doesn\'t cover.'
      },
      {
        question: 'Will I learn databases?',
        answer: 'Yes! You\'ll master both SQL (PostgreSQL) and NoSQL (MongoDB), plus Redis for caching. Database design is a major focus.'
      },
      {
        question: 'Do I need to know DevOps?',
        answer: 'We cover deployment essentials including Docker, CI/CD, and AWS. You\'ll be able to deploy your applications professionally.'
      },
      {
        question: 'What kind of APIs will I build?',
        answer: 'You\'ll build REST APIs for e-commerce, GraphQL for social platforms, real-time chat servers, and payment processing systems.'
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
