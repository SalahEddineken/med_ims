"use client"

import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { BarChart3, Database, LineChart, PieChart, X, Code, Monitor } from "lucide-react"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

const services = [
  {
    icon: BarChart3,
    title: "Data Visualization",
    description: "Transform complex datasets into clear, actionable visual insights using modern BI tools",
    details: "Create stunning dashboards with Tableau, Power BI, and D3.js. Transform raw data into compelling visual stories that drive decision-making. Expertise in interactive charts, real-time data feeds, and custom visualizations.",
    tools: ["Tableau", "Power BI", "D3.js", "Plotly", "Chart.js"]
  },
  {
    icon: Database,
    title: "Data Processing",
    description: "Clean, transform, and prepare large-scale datasets for analysis and reporting",
    details: "Expert in ETL processes, data pipeline development, and database optimization. Handle large-scale data transformations with efficiency and accuracy. Build robust data workflows for consistent reporting.",
    tools: ["SQL", "Python", "Apache Spark", "Pandas", "ETL Tools"]
  },
  {
    icon: LineChart,
    title: "Predictive Analytics",
    description: "Build forecasting models to predict trends and support strategic decision-making",
    details: "Develop machine learning models for forecasting and trend analysis. Use statistical methods and AI to predict future outcomes. Create actionable insights from historical data patterns.",
    tools: ["Python", "R", "Scikit-learn", "TensorFlow", "Statistical Modeling"]
  },
  {
    icon: PieChart,
    title: "Data Analytics",
    description: "Create comprehensive dashboards and reports that drive growth",
    details: "End-to-end analytics solutions from data collection to insight delivery. Build automated reporting systems and KPI dashboards. Provide actionable recommendations based on data analysis.",
    tools: ["Excel", "SQL", "Python", "Google Analytics", "Business Intelligence"]
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Build modern, responsive web applications with cutting-edge technologies",
    details: "Full-stack web development using React, Next.js, and TypeScript. Create fast, scalable applications with modern UI/UX design. Expertise in responsive design, API integration, and performance optimization.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"]
  },
  {
    icon: Monitor,
    title: "Software Development",
    description: "Develop custom software solutions and applications for business needs",
    details: "End-to-end software development from concept to deployment. Build desktop applications, web services, and automation tools. Focus on clean code, scalability, and maintainable architecture.",
    tools: ["Python", "JavaScript", "C#", "Git", "Docker"]
  },
]

export function ServicesSection() {
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setShouldAnimate(!prefersReducedMotion)
    setMounted(true)
  }, [prefersReducedMotion])

  return (
    <section className="py-20 md:py-28 relative z-0">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-transparent" />
      
      <div className="container max-w-7xl mx-auto px-4 md:px-8 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-sentient mb-4">
              What I <i className="font-light">Do</i>
            </h2>
            <p className="text-foreground/60 font-mono max-w-2xl mx-auto text-sm leading-relaxed">
              Data analysis and software development services to help you make data-driven decisions and build modern applications
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={shouldAnimate ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ delay: shouldAnimate ? index * 0.1 : 0, duration: shouldAnimate ? 0.5 : 0 }}
              onClick={() => setSelectedService(service)}
              className="group p-6 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 hover:bg-background/80 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 text-primary group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-sentient mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-sm text-foreground/60 font-mono leading-relaxed">{service.description}</p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs text-primary/60 font-mono">Click for details →</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Service Detail Modal */}
        <AnimatePresence>
          {mounted && selectedService && createPortal(
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="fixed inset-0 bg-black/90 backdrop-blur-md z-[110]"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 100 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                className="fixed inset-0 z-[110] flex items-center justify-center p-4"
                onClick={() => setSelectedService(null)}
              >
                <motion.div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-background/95 backdrop-blur-xl border-2 border-blue-500/30 rounded-xl max-w-2xl w-full overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.3)]"
                >
                  <motion.button
                    onClick={() => setSelectedService(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-background/80 hover:bg-blue-500/20 border border-blue-500/30 hover:border-blue-500/50 transition-colors z-10"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.2 }}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={18} className="text-foreground" />
                  </motion.button>

                  <div className="p-8 space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-4"
                    >
                      <div className="p-4 rounded-lg bg-blue-500/10 text-blue-500">
                        <selectedService.icon className="w-8 h-8" />
                      </div>
                      <h2 className="text-3xl font-sentient">{selectedService.title}</h2>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="font-mono text-sm text-foreground/70 leading-relaxed"
                    >
                      {selectedService.details}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-sm font-mono text-foreground/60 mb-3">Tools & Technologies:</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedService.tools.map((tool, idx) => (
                          <motion.span
                            key={tool}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + idx * 0.05, type: "spring" }}
                            className="px-3 py-1 text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full"
                          >
                            {tool}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </>,
            document.body
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
