"use client"

import { Card } from "./ui/card"
import { ExternalLink, Github, X, BarChart3, Code, Monitor } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const dataAnalysisProjects = [
  {
    title: "Algeria's 2020 COVID-19 Pandemic",
    description: "the COVID-19 pandemic's impact on Algeria, focusing on the critical first year of the crisis (2020).",
    longDescription: "This project analyzes the COVID-19 pandemic's impact on Algeria, focusing on the critical first year of the crisis (2020). It provides a comprehensive overview of the pandemic's impact on the country, including the number of cases, deaths, and recoveries. It also provides a detailed analysis of the government's response to the pandemic, including the measures taken to contain the spread of the virus.",
    tags: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    demo: "https://salaheddineken.github.io/COVID-19-in-Algeria-2020-/",
    github: "",
    image: "/analytics-dashboard.png",
    features: ["Data analysis", "Data visualization", "Data cleaning", "Data preprocessing"],
    timeline: "3 months",
  },
  {
    title: "The Sahara Superpower: Algeria's Solar Potential",
    description: " immense energy potential of Southern Algeria through a data-driven lens.",
    longDescription: "This project analyzes the solar potential of Southern Algeria through a data-driven lens. It provides a comprehensive overview of the solar potential of the region, including the amount of solar radiation, the amount of solar energy that can be harvested, and the amount of solar energy that can be used to generate electricity.",
    tags: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    demo: "https://salaheddineken.github.io/Algeria-s-Solar-Potentia/",
    github: "",
    image: "/sales-analytics-dashboard.png",
    features: ["Data analysis", "Data visualization", "Data cleaning", "Data preprocessing"],
    timeline: "2 months",
  },
  {
    title: "Algerian Road Safety Analysis",
    description: "a data-driven analysis of national traffic accident data in Algeria to uncover critical insights and inform public safety initiatives.",
    longDescription: "This project analyzes the national traffic accident data in Algeria to uncover critical insights and inform public safety initiatives. It provides a comprehensive overview of the accidents, including the number of accidents, the number of deaths, and the number of injuries.",
    tags: ["Python", "SQL", "Tableau", "Power BI"],
    demo: "https://salaheddineken.github.io/Algerian-Road-Safety/",
    github: "",
    image: "/projects/road-safety-algeria.jpeg",
    features: ["Data analysis", "Data visualization", "Data cleaning", "Data preprocessing"],
    timeline: "3 months",
  },
  {
    title: "Youth Unemployment Trends in Algeria ",
    description: "a data-driven analysis of youth unemployment trends in Algeria.",
    longDescription: "This project analyzes the complex issue of youth unemployment in Algeria through a data-driven lens, culminating in a comprehensive analysis ready for infographic presentation.",
    tags: ["Python", "Pandas", "SQL"],
    demo: "https://salaheddineken.github.io/Algeria-s-Youth-Employment/",
    github: "",
    image: "/financial-forecasting-charts.jpg",
    features: ["Data analysis", "Data visualization", "Data cleaning", "Data preprocessing"],
    timeline: "2 months and a half",
  },
  {
    title: "Algeria's Economic Crossroads",
    description: "a data-driven analysis of Algeria's economic crossroads.",
    longDescription: "This project analyzes Algeria's economic crossroads through a data-driven lens. It provides a comprehensive overview of the economic crossroads of the country, including the amount of economic crossroads, the amount of economic crossroads imported and exported.",
    tags: ["Python", "Pandas", "SQL", "Tableau"],
    demo: "https://salaheddineken.github.io/Algeria-Economic-Crossroads/",
    github: "",
    image: "/projects/algeria-economic-crossroads.jpeg",
    features: ["Data analysis", "Data visualization", "Data cleaning", "Data preprocessing"],
    timeline: "2 months and a half",
  },
]

const webDevelopmentProjects = [
  {
    title: "Portfolio Website",
    description: "Modern, responsive portfolio website built with Next.js and TypeScript",
    longDescription: "A fully responsive portfolio website showcasing my work and skills. Built with modern web technologies including Next.js, TypeScript, Tailwind CSS, and Framer Motion for smooth animations. Features dark/light mode, mobile-first design, and optimized performance.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demo: "https://salaheddineken.vercel.app",
    github: "https://github.com/salaheddineken/portfolio",
    image: "/placeholder.svg",
    features: ["Responsive design", "Dark/Light mode", "Smooth animations", "SEO optimized", "Performance optimized"],
    timeline: "1 month",
  },
  {
    title: "Task Management App",
    description: "Full-stack task management application with real-time updates",
    longDescription: "A comprehensive task management application built with React, Node.js, and MongoDB. Features include user authentication, real-time task updates, drag-and-drop functionality, team collaboration, and progress tracking. Includes both web and mobile responsive design.",
    tags: ["React", "Node.js", "MongoDB", "Socket.io", "Express"],
    demo: "https://taskmanager-demo.vercel.app",
    github: "https://github.com/salaheddineken/task-manager",
    image: "/task-management-app.png",
    features: ["User authentication", "Real-time updates", "Drag & drop", "Team collaboration", "Progress tracking"],
    timeline: "2 months",
  },
  {
    title: "E-commerce Platform",
    description: "Complete e-commerce solution with payment integration",
    longDescription: "A full-featured e-commerce platform built with Next.js and Stripe integration. Includes product catalog, shopping cart, user authentication, payment processing, order management, and admin dashboard. Features responsive design and optimized for performance and SEO.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Prisma", "Tailwind CSS"],
    demo: "https://ecommerce-demo.vercel.app",
    github: "https://github.com/salaheddineken/ecommerce-platform",
    image: "/ecommerce-platform-interface.png",
    features: ["Payment integration", "Product catalog", "Shopping cart", "User authentication", "Admin dashboard"],
    timeline: "3 months",
  },
  {
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for real-time data visualization and analytics",
    longDescription: "A comprehensive data visualization dashboard built with React and D3.js. Features real-time data updates, interactive charts, customizable widgets, and export functionality. Designed for business intelligence and data analysis with a focus on user experience and performance.",
    tags: ["React", "D3.js", "WebSocket", "Chart.js", "Material-UI"],
    demo: "https://dashboard-demo.vercel.app",
    github: "https://github.com/salaheddineken/data-dashboard",
    image: "/analytics-dashboard.png",
    features: ["Real-time updates", "Interactive charts", "Customizable widgets", "Export functionality", "Responsive design"],
    timeline: "2 months",
  },
]

const softwareProjects = [
  {
    title: "API Development Suite",
    description: "RESTful API development with comprehensive documentation and testing",
    longDescription: "A complete API development suite including RESTful APIs, comprehensive documentation, automated testing, and deployment scripts. Built with Node.js, Express, and includes features like rate limiting, authentication, data validation, and error handling. Includes Swagger documentation and Postman collections.",
    tags: ["Node.js", "Express", "Jest", "Swagger", "Docker"],
    demo: "https://api-docs.vercel.app",
    github: "https://github.com/salaheddineken/api-suite",
    image: "/placeholder.svg",
    features: ["RESTful APIs", "API documentation", "Automated testing", "Rate limiting", "Authentication"],
    timeline: "1.5 months",
  },
  {
    title: "Desktop Data Analyzer",
    description: "Cross-platform desktop application for data analysis and visualization",
    longDescription: "A powerful desktop application built with Electron and Python for comprehensive data analysis. Features include data import/export, statistical analysis, custom visualizations, and report generation. Designed for data scientists and analysts who need offline data processing capabilities.",
    tags: ["Electron", "Python", "Pandas", "Matplotlib", "SQLite"],
    demo: "",
    github: "https://github.com/salaheddineken/data-analyzer",
    image: "/placeholder.svg",
    features: ["Cross-platform", "Data import/export", "Statistical analysis", "Custom visualizations", "Report generation"],
    timeline: "2.5 months",
  },
  {
    title: "Automation Scripts Suite",
    description: "Collection of Python automation scripts for various business processes",
    longDescription: "A comprehensive suite of automation scripts designed to streamline business processes. Includes web scraping, data processing, file management, and system monitoring tools. Built with Python and includes error handling, logging, and configuration management.",
    tags: ["Python", "Selenium", "BeautifulSoup", "Pandas", "Schedule"],
    demo: "",
    github: "https://github.com/salaheddineken/automation-scripts",
    image: "/placeholder.svg",
    features: ["Web scraping", "Data processing", "File management", "System monitoring", "Error handling"],
    timeline: "1 month",
  },
  {
    title: "Database Management Tool",
    description: "GUI application for database administration and management",
    longDescription: "A user-friendly desktop application for database administration and management. Features include database connection management, query execution, data visualization, backup/restore functionality, and user management. Built with Python and Tkinter for cross-platform compatibility.",
    tags: ["Python", "Tkinter", "SQLAlchemy", "MySQL", "PostgreSQL"],
    demo: "",
    github: "https://github.com/salaheddineken/db-manager",
    image: "/placeholder.svg",
    features: ["Database connections", "Query execution", "Data visualization", "Backup/restore", "User management"],
    timeline: "2 months",
  },
]

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<'data' | 'web' | 'software'>('data')
  const [selectedProject, setSelectedProject] = useState<typeof dataAnalysisProjects[0] | null>(null)

  return (
    <section className="py-20 md:py-28 relative z-0">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sentient mb-4">
            Featured <i className="font-light">Projects</i>
          </h2>
          <p className="font-mono text-foreground/60">A selection of my recent data analysis and software development projects completed in my free time and during my studies.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-background/50 backdrop-blur-sm border border-border rounded-lg p-1">
            <button
              onClick={() => setActiveTab('data')}
              className={`flex items-center gap-2 px-4 py-3 rounded-md font-mono text-sm transition-all duration-200 ${
                activeTab === 'data'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-foreground/60 hover:text-foreground hover:bg-background/50'
              }`}
            >
              <BarChart3 size={16} />
              Data Analysis
            </button>
            <button
              onClick={() => setActiveTab('web')}
              className={`flex items-center gap-2 px-4 py-3 rounded-md font-mono text-sm transition-all duration-200 ${
                activeTab === 'web'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-foreground/60 hover:text-foreground hover:bg-background/50'
              }`}
            >
              <Code size={16} />
              Web Development
            </button>
            <button
              onClick={() => setActiveTab('software')}
              className={`flex items-center gap-2 px-4 py-3 rounded-md font-mono text-sm transition-all duration-200 ${
                activeTab === 'software'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-foreground/60 hover:text-foreground hover:bg-background/50'
              }`}
            >
              <Monitor size={16} />
              Software
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {(activeTab === 'data' 
            ? dataAnalysisProjects 
            : activeTab === 'web' 
            ? webDevelopmentProjects 
            : softwareProjects).map((project, index) => (
            <Card
              key={index}
              onClick={() => setSelectedProject(project)}
              className="overflow-hidden bg-background/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group flex flex-col cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={index < 3 ? "eager" : "lazy"}
                />
              </div>
              
              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl font-sentient">{project.title}</h3>
                  <div className="flex gap-2 flex-shrink-0">
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/60 hover:text-primary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={18} />
                      </Link>
                    )}
                    {project.demo && (
                      <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/60 hover:text-primary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={18} />
                      </Link>
                    )}
                  </div>
                </div>
                <p className="font-mono text-sm text-foreground/60 mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary border border-primary/20 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-primary/60 font-mono mt-auto">Click for details →</p>
              </div>
            </Card>
          ))}
        </motion.div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-black/90 backdrop-blur-md z-[110]"
              />

              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed inset-x-0 top-24 bottom-4 z-[110] flex items-start justify-center overflow-auto px-4"
                onClick={() => setSelectedProject(null)}
              >
                <motion.div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-background/98 backdrop-blur-sm border border-border/50 rounded-lg max-w-5xl w-full my-auto overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {/* Close Button */}
                  <motion.button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 hover:bg-foreground/10 rounded-lg transition-colors z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={20} className="text-foreground/60 hover:text-foreground" />
                  </motion.button>

                  <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
                    {/* Left: Image and Links */}
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative w-full aspect-video rounded overflow-hidden bg-foreground/5"
                      >
                        <Image
                          src={selectedProject.image || "/placeholder.svg"}
                          alt={selectedProject.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </motion.div>

                      {/* Links under image */}
                      {(selectedProject.github || selectedProject.demo) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="flex items-center gap-4"
                        >
                          {selectedProject.github && (
                            <Link
                              href={selectedProject.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm font-mono text-foreground/60 hover:text-primary transition-colors"
                            >
                              <Github size={16} />
                              <span>View Code</span>
                            </Link>
                          )}
                          {selectedProject.demo && (
                            <Link
                              href={selectedProject.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm font-mono text-foreground/60 hover:text-primary transition-colors"
                            >
                              <ExternalLink size={16} />
                              <span>Live Demo</span>
                            </Link>
                          )}
                        </motion.div>
                      )}
                    </div>

                    {/* Right: Content */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-2xl md:text-3xl font-sentient text-foreground mb-3">
                          {selectedProject.title}
                        </h2>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          {selectedProject.longDescription || selectedProject.description}
                        </p>
                      </div>

                      {selectedProject.features && (
                        <div>
                          <h3 className="text-xs font-mono text-foreground/50 uppercase tracking-wide mb-3">
                            Key Features
                          </h3>
                          <div className="space-y-2">
                            {selectedProject.features.map((feature, idx) => (
                              <div
                                key={feature}
                                className="flex items-start gap-2 text-sm text-foreground/80"
                              >
                                <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h3 className="text-xs font-mono text-foreground/50 uppercase tracking-wide mb-3">
                          Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 text-xs bg-foreground/5 text-foreground/70 rounded border border-foreground/10"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {selectedProject.timeline && (
                        <div className="pt-2 border-t border-foreground/10">
                          <span className="font-mono text-xs text-foreground/40">
                            Timeline: {selectedProject.timeline}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
