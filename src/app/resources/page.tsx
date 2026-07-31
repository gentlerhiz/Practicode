'use client'

import { motion } from 'framer-motion'
import { FileText, Search, BookOpen, ExternalLink } from 'lucide-react'
import { useState } from 'react'

type Category = 'all' | 'web' | 'backend' | 'database' | 'mobile' | 'tools' | 'algorithms'

interface Resource {
  title: string
  description: string
  category: Category
  file: string
  tag: string
}

const resources: Resource[] = [
  // Web
  {
    title: 'HTML5',
    description: 'Comprehensive HTML5 reference covering semantic elements, forms, APIs, and modern web standards.',
    category: 'web',
    file: '/resources/HTML5NotesForProfessionals (2).pdf',
    tag: 'Web',
  },
  {
    title: 'JavaScript',
    description: 'In-depth JavaScript guide covering ES6+, closures, async/await, DOM manipulation, and more.',
    category: 'web',
    file: '/resources/JavaScriptNotesForProfessionals.pdf',
    tag: 'Web',
  },
  {
    title: 'ReactJS',
    description: 'Deep dive into React — components, hooks, state management, and performance optimization.',
    category: 'web',
    file: '/resources/ReactJSNotesForProfessionals.pdf',
    tag: 'Web',
  },
  {
    title: 'AngularJS',
    description: 'Complete AngularJS reference for building dynamic single-page applications.',
    category: 'web',
    file: '/resources/AngularJSNotesForProfessionals.pdf',
    tag: 'Web',
  },
  // Backend
  {
    title: 'Python',
    description: 'Extensive Python notes covering data structures, OOP, file handling, and standard libraries.',
    category: 'backend',
    file: '/resources/PythonNotesForProfessionals.pdf',
    tag: 'Backend',
  },
  {
    title: 'Node.js',
    description: 'Server-side JavaScript with Node.js — streams, events, Express, and async patterns.',
    category: 'backend',
    file: '/resources/NodeJSNotesForProfessionals.pdf',
    tag: 'Backend',
  },
  {
    title: 'Java',
    description: 'Java fundamentals and advanced topics including OOP, collections, concurrency, and JVM internals.',
    category: 'backend',
    file: '/resources/JavaNotesForProfessionals.pdf',
    tag: 'Backend',
  },
  {
    title: 'PHP',
    description: 'PHP language reference covering syntax, functions, OOP, sessions, and web integration.',
    category: 'backend',
    file: '/resources/PHPNotesForProfessionals.pdf',
    tag: 'Backend',
  },
  {
    title: 'C#',
    description: 'C# language guide with .NET fundamentals, LINQ, async programming, and design patterns.',
    category: 'backend',
    file: '/resources/CSharpNotesForProfessionals.pdf',
    tag: 'Backend',
  },
  {
    title: 'R',
    description: 'Statistical computing with R — data frames, visualizations, and data analysis techniques.',
    category: 'backend',
    file: '/resources/RNotesForProfessionals.pdf',
    tag: 'Backend',
  },
  // Database
  {
    title: 'SQL',
    description: 'Core SQL reference — queries, joins, subqueries, aggregations, and database design.',
    category: 'database',
    file: '/resources/SQLNotesForProfessionals.pdf',
    tag: 'Database',
  },
  {
    title: 'MySQL',
    description: 'MySQL-specific features, stored procedures, indexing strategies, and performance tuning.',
    category: 'database',
    file: '/resources/MySQLNotesForProfessionals.pdf',
    tag: 'Database',
  },
  {
    title: 'PostgreSQL',
    description: 'Advanced PostgreSQL covering JSON support, full-text search, CTEs, and extensions.',
    category: 'database',
    file: '/resources/PostgreSQLNotesForProfessionals.pdf',
    tag: 'Database',
  },
  {
    title: 'MongoDB',
    description: 'NoSQL database guide — documents, aggregation pipelines, indexing, and schema design.',
    category: 'database',
    file: '/resources/MongoDBNotesForProfessionals.pdf',
    tag: 'Database',
  },
  {
    title: 'Microsoft SQL Server',
    description: 'T-SQL, stored procedures, triggers, and SQL Server administration essentials.',
    category: 'database',
    file: '/resources/MicrosoftSQLServerNotesForProfessionals.pdf',
    tag: 'Database',
  },
  {
    title: 'Oracle Database',
    description: 'Oracle DB reference covering PL/SQL, database objects, and enterprise features.',
    category: 'database',
    file: '/resources/OracleDatabaseNotesForProfessionals.pdf',
    tag: 'Database',
  },
  // Mobile
  {
    title: 'React Native',
    description: 'Build cross-platform mobile apps with React Native — navigation, APIs, and native modules.',
    category: 'mobile',
    file: '/resources/ReactNativeNotesForProfessionals.pdf',
    tag: 'Mobile',
  },
  {
    title: 'iOS',
    description: 'iOS development notes covering Swift, UIKit, Auto Layout, and Apple platform APIs.',
    category: 'mobile',
    file: '/resources/iOSNotesForProfessionals.pdf',
    tag: 'Mobile',
  },
  // Tools
  {
    title: 'Git',
    description: 'Version control mastery — branching, merging, rebasing, and collaborative workflows.',
    category: 'tools',
    file: '/resources/GitNotesForProfessionals.pdf',
    tag: 'Tools',
  },
  {
    title: 'Linux',
    description: 'Linux command line, shell scripting, file permissions, processes, and system administration.',
    category: 'tools',
    file: '/resources/LinuxNotesForProfessionals.pdf',
    tag: 'Tools',
  },
  {
    title: 'PowerShell',
    description: 'Windows automation with PowerShell — cmdlets, scripting, pipelines, and remoting.',
    category: 'tools',
    file: '/resources/PowerShellNotesForProfessionals.pdf',
    tag: 'Tools',
  },
  // Algorithms
  {
    title: 'Algorithms',
    description: 'Essential algorithms and data structures — sorting, searching, graphs, and complexity analysis.',
    category: 'algorithms',
    file: '/resources/AlgorithmsNotesForProfessionals.pdf',
    tag: 'Algorithms',
  },
]

const categories: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'tools', label: 'Tools' },
  { id: 'algorithms', label: 'Algorithms' },
]

const tagColors: Record<string, string> = {
  Web: 'bg-blue-50 text-blue-700 border-blue-200',
  Backend: 'bg-green-50 text-green-700 border-green-200',
  Database: 'bg-purple-50 text-purple-700 border-purple-200',
  Mobile: 'bg-pink-50 text-pink-700 border-pink-200',
  Tools: 'bg-orange-50 text-orange-700 border-orange-200',
  Algorithms: 'bg-yellow-50 text-yellow-700 border-yellow-200',
}

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = resources.filter((r) => {
    const matchesCategory = activeCategory === 'all' || r.category === activeCategory
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      q === '' ||
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.tag.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-[#000000] overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="py-20 lg:py-28 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.2em] mb-4"
              >
                Free Learning Materials
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight"
              >
                Professional
                <br />
                <span className="relative inline-block mt-2">
                  Reference Books
                  <span className="absolute -bottom-2 left-0 w-full h-4 bg-[#FFCA1A] -z-10 rounded-sm" />
                </span>
              </motion.h1>



              {/* Search */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative max-w-2xl mx-auto"
              >
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by topic — JavaScript, SQL, Git…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-gray-700 bg-white/10 backdrop-blur-sm focus:bg-white focus:border-[#FFCA1A] focus:outline-none text-white focus:text-black placeholder-gray-400 transition-all duration-300"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-16 bg-white border-b-2 border-gray-100 z-40 shadow-sm">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 py-5">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-[#000000] text-white shadow-lg'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                {cat.label}
                {cat.id !== 'all' && (
                  <span className="ml-2 text-xs opacity-60">
                    {resources.filter((r) => r.category === cat.id).length}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          {/* Result count */}
          <p className="text-sm text-gray-400 mb-8 text-center">
            {filtered.length === resources.length
              ? `Showing all ${resources.length} resources`
              : `${filtered.length} result${filtered.length !== 1 ? 's' : ''} found`}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex w-20 h-20 rounded-full bg-gray-100 items-center justify-center mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium">
                No resources match &ldquo;{searchQuery}&rdquo;. Try a different keyword.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((resource, index) => (
                <motion.div
                  key={resource.file}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className="group bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-[#FFCA1A] transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  {/* Card top */}
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-[#FFCA1A]/10 rounded-xl flex items-center justify-center group-hover:bg-[#FFCA1A]/20 transition-colors duration-300">
                        <FileText className="w-6 h-6 text-[#000000]" strokeWidth={2} />
                      </div>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full border ${
                          tagColors[resource.tag] ?? 'bg-gray-50 text-gray-600 border-gray-200'
                        }`}
                      >
                        {resource.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#000000] mb-2 group-hover:text-gray-700 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                      {resource.description}
                    </p>
                  </div>

                  {/* Card footer */}
                  <div className="px-6 pb-6">
                    <a
                      href={resource.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-[#000000] text-white text-sm font-bold rounded-xl hover:bg-[#FFCA1A] hover:text-[#000000] transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    >
                      <BookOpen className="w-4 h-4" strokeWidth={2.5} />
                      <span>Read Now</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
