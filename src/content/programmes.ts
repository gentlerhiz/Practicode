import {
  Award,
  BadgeCheck,
  BookOpen,
  Braces,
  BrainCircuit,
  Calendar,
  ChartColumn,
  ChartPie,
  Clock,
  Code,
  CodeXml,
  FileCode,
  Frame,
  Funnel,
  GitBranch,
  GitPullRequest,
  Hammer,
  Hourglass,
  Image as ImageIcon,
  Laptop,
  Mail,
  MapPin,
  NotebookPen,
  Paintbrush,
  PenTool,
  Plug,
  Presentation,
  Rocket,
  Shapes,
  Sheet,
  Sigma,
  StickyNote,
  Table,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

export type ProgrammeId = 'fe' | 'da' | 'ux' | 'ai'
export type Tone = ProgrammeId

export type Tool = { name: string; icon: LucideIcon }
export type Fact = { label: string; value: string; note: string; icon: LucideIcon; tone: Tone }
export type Stage = { when: string; title: string; topics: string[] }
export type Project = { title: string; body: string; icon: LucideIcon }

export type Programme = {
  id: ProgrammeId
  slug: string
  title: string
  short: string
  subject: string
  level: 'Beginner' | 'Intermediate'
  meta: string
  live: boolean
  icon: LucideIcon
  summary: string
  lead: string
  /** Tools shown on cards (the first few). */
  tools: Tool[]
  facts: Fact[]
  syllabusTitle: string
  syllabusLead: string
  /** Front-End lists its weeks; the others list stages. */
  weeks?: string[]
  capstone?: string
  stages?: Stage[]
  projects: Project[]
  certificate: string
  /** Words the Programmes search matches as well as the title. */
  keywords: string
  seoTitle: string
  seoDescription: string
}

const t = (name: string, icon: LucideIcon): Tool => ({ name, icon })
const where: Fact = { label: 'Where', value: 'Ibadan or online', note: 'Old Bodija centre or live online', icon: MapPin, tone: 'ux' }

export const programmes: Programme[] = [
  {
    id: 'fe',
    slug: 'front-end-web-development',
    title: 'Front-End Web Development',
    short: 'Front-End',
    subject: 'Web Development',
    level: 'Beginner',
    meta: 'Beginner · 15 weeks + capstone',
    live: true,
    icon: CodeXml,
    summary: 'Build responsive, interactive websites from scratch, then put them online for real.',
    lead: 'Build responsive, interactive websites from scratch: from your first HTML page to a live site that sends real data, with your instructors beside you all the way.',
    tools: [
      t('HTML5', FileCode),
      t('CSS3', Paintbrush),
      t('JavaScript', Braces),
      t('VS Code', Code),
      t('Git', GitBranch),
      t('GitHub', GitPullRequest),
      t('REST APIs', Plug),
      t('EmailJS', Mail),
      t('Netlify', Rocket),
      t('DevTools', Laptop),
    ],
    facts: [
      { label: 'Length', value: '15 weeks', note: 'Then a two-week capstone', icon: Calendar, tone: 'fe' },
      { label: 'Time', value: '~9 hours a week', note: 'Live 60-minute lessons', icon: Clock, tone: 'da' },
      where,
      { label: 'You finish with', value: 'A certificate', note: 'Plus a published capstone site', icon: Award, tone: 'ai' },
    ],
    syllabusTitle: 'What you’ll learn, week by week',
    syllabusLead: '130 one-hour lessons over 15 weeks, about 9 hours a week, then a two-week capstone project.',
    weeks: [
      'How the web works',
      'HTML: structure and meaning',
      'Your toolkit and your first live site',
      'CSS fundamentals',
      'Typography, images and icons',
      'Flexbox',
      'Grid and responsive design',
      'JavaScript fundamentals',
      'Thinking in JavaScript',
      'The DOM and events',
      'Data and APIs: fetch, JSON and EmailJS',
      'Git for teams and modern tooling',
      'Accessibility',
      'Design for developers',
      'Ship it: performance, SEO and real clients',
    ],
    capstone: 'Capstone: plan, build and publish your own site',
    projects: [
      { title: 'Mama Nkechi’s Kitchen', body: 'A responsive restaurant site with a menu, prices in naira and an order button that opens WhatsApp.', icon: FileCode },
      { title: 'A contact form that really sends', body: 'Connect a form to EmailJS so messages land in a real inbox, then check every field before it goes.', icon: Mail },
      { title: 'Your capstone site, live', body: 'Plan, build and publish your own website on Netlify, with a link you can share with anyone.', icon: Rocket },
    ],
    certificate:
      'In the last two weeks you plan, build and publish your own website. When you finish, you receive a PractiCode Academy certificate of completion in the name you gave us when you enrolled.',
    keywords: 'html css javascript website web front-end frontend developer',
    seoTitle: 'Front-End Web Development Course in Ibadan and Online',
    seoDescription:
      'Learn HTML, CSS and JavaScript in live classes in Ibadan or online. 15 weeks plus a capstone: build and publish real websites, with a certificate of completion.',
  },
  {
    id: 'da',
    slug: 'data-analysis',
    title: 'Data Analysis',
    short: 'Data Analysis',
    subject: 'Data',
    level: 'Beginner',
    meta: 'Beginner · 12 weeks',
    live: true,
    icon: ChartColumn,
    summary: 'Turn raw data into insights with Excel and Power BI, and build dashboards people actually read.',
    lead: 'Turn raw data into insights with Excel, Power Query and Power BI. Clean messy spreadsheets, model your data and build dashboards that help people decide.',
    tools: [t('Excel', Sheet), t('Power Query', Funnel), t('Power Pivot', Table), t('DAX', Sigma), t('Power BI', ChartPie)],
    facts: [
      { label: 'Length', value: '12 weeks', note: 'Four stages, one capstone', icon: Calendar, tone: 'fe' },
      { label: 'Classes', value: '3 a week', note: 'Live, with a task in every class', icon: Clock, tone: 'da' },
      where,
      { label: 'You finish with', value: 'A certificate', note: 'Plus a Power BI dashboard', icon: Award, tone: 'ai' },
    ],
    syllabusTitle: 'What you’ll learn, stage by stage',
    syllabusLead: 'Twelve weeks in four stages, with a hands-on task in every class and a dashboard capstone at the end.',
    stages: [
      { when: 'Weeks 1–3', title: 'Excel foundations', topics: ['Formulas and functions you will use every day', 'Sorting, filtering and tables', 'PivotTables to summarise thousands of rows', 'Charts that tell a clear story'] },
      { when: 'Weeks 4–6', title: 'Clean and shape data with Power Query', topics: ['Bring in data from files and folders', 'Fix messy columns, dates and duplicates', 'Merge and append tables', 'Steps that refresh with new data'] },
      { when: 'Weeks 7–9', title: 'Model data with Power Pivot and DAX', topics: ['Relationships between tables', 'Building a data model', 'Calculated columns and measures in DAX', 'Comparing months, quarters and years'] },
      { when: 'Weeks 10–12', title: 'Power BI dashboards and capstone', topics: ['Visuals, layout and colour', 'Filters, slicers and drill-down', 'Sharing a report people can use', 'Capstone: a dashboard on a real dataset'] },
    ],
    projects: [
      { title: 'A sales report for a Bodija shop', body: 'Summarise a month of sales in naira with PivotTables and charts, and spot the best-selling items.', icon: Sheet },
      { title: 'Clean a messy export', body: 'Take a real-world spreadsheet full of gaps and typos and turn it into a tidy table with Power Query.', icon: Funnel },
      { title: 'Your capstone dashboard', body: 'Build a Power BI dashboard on a dataset you choose, then present what it shows.', icon: ChartPie },
    ],
    certificate:
      'In the last weeks you build a dashboard on a real dataset and present what it shows. When you finish, you receive a PractiCode Academy certificate of completion in the name you gave us when you enrolled.',
    keywords: 'excel power bi power query dax data analysis analytics dashboards',
    seoTitle: 'Data Analysis Course with Excel and Power BI in Ibadan and Online',
    seoDescription:
      'Learn data analysis with Excel, Power Query, Power Pivot, DAX and Power BI in live classes in Ibadan or online. Build a real dashboard and earn a certificate.',
  },
  {
    id: 'ux',
    slug: 'ui-ux-design',
    title: 'UI/UX Product Design',
    short: 'UI/UX',
    subject: 'Design',
    level: 'Beginner',
    meta: 'Beginner · 12 weeks',
    live: true,
    icon: PenTool,
    summary: 'Design digital products people enjoy, from user research to a clickable prototype.',
    lead: 'Design digital products people enjoy using, from user research to an interactive prototype in Figma. Find a real problem, design the fix and test it with real people.',
    tools: [
      t('Figma', Frame),
      t('FigJam', StickyNote),
      t('Figma Community', Users),
      t('Iconify', Shapes),
      t('Unsplash', ImageIcon),
      t('Autoflow', Workflow),
    ],
    facts: [
      { label: 'Length', value: '12 weeks', note: 'Four stages, one capstone', icon: Calendar, tone: 'fe' },
      { label: 'Classes', value: '3 a week', note: 'Live, with a task in every class', icon: Clock, tone: 'da' },
      where,
      { label: 'You finish with', value: 'A certificate', note: 'Plus a tested prototype', icon: Award, tone: 'ai' },
    ],
    syllabusTitle: 'What you’ll learn, stage by stage',
    syllabusLead: 'Twelve weeks in four stages, from research to a prototype you have tested with real people.',
    stages: [
      { when: 'Weeks 1–3', title: 'UX foundations and research', topics: ['Design thinking, step by step', 'Interviews and short surveys', 'Personas and user journeys', 'Mapping it all out in FigJam'] },
      { when: 'Weeks 4–6', title: 'UI design in Figma', topics: ['Frames, auto layout and components', 'Type, colour and spacing', 'Icons and images with Iconify and Unsplash', 'Layouts for phone and desktop'] },
      { when: 'Weeks 7–9', title: 'Prototypes and testing', topics: ['From wireframe to high fidelity', 'Interactive prototypes', 'Usability tests with real people', 'Improving the design from feedback'] },
      { when: 'Weeks 10–12', title: 'Design systems and capstone', topics: ['Styles and reusable components', 'Handing designs to developers', 'Presenting your case study', 'Capstone: a tested app or website design'] },
    ],
    projects: [
      { title: 'Research a real problem', body: 'Interview people in Ibadan about an everyday task, then map what you learn as personas and a journey in FigJam.', icon: StickyNote },
      { title: 'An ordering app for Mama Nkechi', body: 'Design the screens of a food-ordering app in Figma, with components you can reuse.', icon: Frame },
      { title: 'Your tested prototype', body: 'Turn your capstone design into a clickable prototype, test it with real people and show what you changed.', icon: Workflow },
    ],
    certificate:
      'In the last weeks you design, prototype and test your own product, then present the case study. When you finish, you receive a PractiCode Academy certificate of completion in the name you gave us when you enrolled.',
    keywords: 'figma ui ux product design prototype user research',
    seoTitle: 'UI/UX Design Course with Figma in Ibadan and Online',
    seoDescription:
      'Learn UI/UX product design in Figma in live classes in Ibadan or online: user research, screens, prototypes and usability tests. Finish with a tested prototype and a certificate.',
  },
  {
    id: 'ai',
    slug: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    short: 'AI & ML',
    subject: 'AI',
    level: 'Intermediate',
    meta: 'Intermediate',
    live: false,
    icon: BrainCircuit,
    summary: 'Use Python to train machine learning models, check whether they work, and learn where AI goes wrong.',
    lead: 'Use Python to explore data, train machine learning models, check whether they work and learn where AI goes wrong. We’re preparing this programme now.',
    tools: [t('Python', Code), t('Jupyter', NotebookPen), t('pandas', Table), t('scikit-learn', BrainCircuit)],
    facts: [
      { label: 'Level', value: 'Intermediate', note: 'Some computer confidence helps', icon: BadgeCheck, tone: 'fe' },
      { label: 'Main tools', value: 'Python + Jupyter', note: 'With pandas and scikit-learn', icon: Code, tone: 'da' },
      where,
      { label: 'Status', value: 'Coming soon', note: 'Enrolment is not open yet', icon: Hourglass, tone: 'ai' },
    ],
    syllabusTitle: 'What we’re planning',
    syllabusLead: 'A first outline. The full syllabus may change before enrolment opens.',
    stages: [
      { when: 'Stage 1', title: 'Python for data', topics: ['Python basics in Jupyter notebooks', 'Lists, dictionaries and functions', 'Reading files and cleaning text'] },
      { when: 'Stage 2', title: 'Exploring data with pandas', topics: ['Loading and filtering tables', 'Grouping and summarising', 'Charts that show patterns'] },
      { when: 'Stage 3', title: 'Machine learning with scikit-learn', topics: ['Training your first model', 'Testing whether it really works', 'Choosing between models'] },
      { when: 'Stage 4', title: 'Using AI responsibly', topics: ['Where models go wrong', 'Bias in data', 'A small project you can explain'] },
    ],
    projects: [],
    certificate: '',
    keywords: 'ai artificial intelligence machine learning python ml',
    seoTitle: 'AI and Machine Learning Course (Coming Soon)',
    seoDescription:
      'Our AI and Machine Learning programme with Python, pandas and scikit-learn is coming soon, in Ibadan and online. Leave your details to hear when enrolment opens.',
  },
]

export const findProgramme = (slug: string) => programmes.find((p) => p.slug === slug)
export const programmeById = (id: ProgrammeId) => programmes.find((p) => p.id === id)!
export const liveProgrammes = programmes.filter((p) => p.live)

/** How every lesson runs (60 minutes). */
export const lessonShape = [
  { mins: '5–10 min', title: 'Recap', body: 'What we covered last time, and today’s question.', icon: BookOpen, tone: 'fe' as Tone },
  { mins: '15–20 min', title: 'Teach', body: 'One new idea, explained with real examples.', icon: Presentation, tone: 'da' as Tone },
  { mins: '10 min', title: 'Live demo', body: 'Watch it done, step by step, on screen.', icon: Laptop, tone: 'ux' as Tone },
  { mins: '20 min', title: 'You build it', body: 'Hands-on practice while instructors help.', icon: Hammer, tone: 'fe' as Tone, highlight: true },
  { mins: '5 min', title: 'Check', body: 'Quick questions to lock it in.', icon: BadgeCheck, tone: 'ai' as Tone },
]
