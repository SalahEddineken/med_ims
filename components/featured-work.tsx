"use client"

import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"
import { ArrowRight, X } from "lucide-react"
import { useEffect, useState } from "react"

const featuredProjects = [
  {
    title: "Sales Analytics Dashboard",
    description: "Interactive dashboard analyzing $2M+ in sales data with predictive insights",
    category: "Data Visualization",
    image: "/sales-analytics-dashboard.png",
    tools: ["Python", "Tableau", "SQL", "Pandas"],
    caseStudy: {
      problem: "Company was losing $500K annually due to inability to track sales patterns and identify underperforming regions in real-time.",
      approach: "Built end-to-end analytics pipeline integrating 3 data sources, created automated ETL process, and designed interactive Tableau dashboards with predictive models.",
      solution: "Deployed real-time sales tracking system with KPI monitoring, regional performance analysis, and ML-powered forecasting for next quarter trends.",
      results: [
        "$2M+ in sales tracked with 100% accuracy",
        "95% forecast accuracy for quarterly predictions",
        "Identified $500K revenue opportunity in underserved markets",
        "Reduced reporting time from 2 days to 15 minutes"
      ]
    }
  },
  {
    title: "Customer Behavior Analysis",
    description: "ML-powered analysis identifying key patterns in 100K+ customer interactions",
    category: "Machine Learning",
    image: "/customer-behavior-analysis.jpg",
    tools: ["Python", "Scikit-learn", "TensorFlow", "PostgreSQL"],
    caseStudy: {
      problem: "E-commerce platform experiencing 25% customer churn with no visibility into behavioral patterns or early warning signals.",
      approach: "Analyzed 100K+ customer interactions using clustering algorithms (K-means, DBSCAN) and built classification model to predict churn risk 30 days in advance.",
      solution: "Implemented automated churn prediction system with customer segmentation and personalized re-engagement recommendations for high-risk users.",
      results: [
        "85% churn prediction accuracy",
        "15% reduction in customer churn (saving $75K/quarter)",
        "Identified 5 key behavioral indicators of churn",
        "Enabled proactive customer retention campaigns"
      ]
    }
  },
  {
    title: "Financial Forecasting Model",
    description: "Time-series forecasting model with 95% accuracy for quarterly predictions",
    category: "Predictive Analytics",
    image: "/financial-forecasting-charts.jpg",
    tools: ["Python", "Prophet", "ARIMA", "Neural Networks"],
    caseStudy: {
      problem: "Finance team relied on manual Excel forecasts with 60% accuracy, leading to poor budget planning and missed growth opportunities.",
      approach: "Developed ensemble forecasting model combining ARIMA for trend analysis, Prophet for seasonality, and LSTM neural networks for complex patterns.",
      solution: "Automated quarterly forecasting system with scenario analysis, confidence intervals, and risk-adjusted predictions for different market conditions.",
      results: [
        "95% forecast accuracy (vs. 60% baseline)",
        "Improved budget accuracy saving $200K in overprovisioning",
        "3-scenario analysis (optimistic, realistic, pessimistic)",
        "Reduced forecasting time from 1 week to 2 hours"
      ]
    }
  },
]

export function FeaturedWork() {
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const [selectedProject, setSelectedProject] = useState<typeof featuredProjects[0] | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setShouldAnimate(!prefersReducedMotion)
  }, [prefersReducedMotion])

  return (
    <section className="py-20 md:py-28 relative z-0 bg-background/15">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">Featured Work</h2>
          <p className="text-foreground/60 font-mono max-w-2xl mx-auto">
            Explore some of my recent data analysis projects and visualizations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ delay: shouldAnimate ? index * 0.1 : 0, duration: shouldAnimate ? 0.3 : 0 }}
              onClick={() => setSelectedProject(project)}
              className="group relative overflow-hidden rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-300 cursor-pointer"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="aspect-video overflow-hidden relative">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
              <div className="p-6">
                <div className="text-xs font-mono text-primary/80 mb-2">{project.category}</div>
                <h3 className="text-xl font-bold font-mono mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-foreground/60 font-mono">{project.description}</p>
                <p className="text-xs text-primary/60 font-mono mt-3">Click for details →</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-black/90 backdrop-blur-md z-[110]"
              />

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
                    {/* Left: Image */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="relative w-full aspect-video rounded overflow-hidden bg-foreground/5 group"
                    >
                      <Image
                        src={selectedProject.image || "/placeholder.svg"}
                        alt={selectedProject.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      
                      {/* Tools Overlay at bottom of image */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent backdrop-blur-sm p-4">
                        <h3 className="text-xs font-mono text-white/70 uppercase tracking-wide mb-2">
                          Tools & Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tools.map((tool) => (
                            <span
                              key={tool}
                              className="px-2 py-1 text-xs bg-white/10 text-white border border-white/20 rounded backdrop-blur-sm"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* Right: Content - Case Study Format */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-6 overflow-y-auto max-h-[70vh] pr-2"
                    >
                      <div>
                        <div className="text-xs font-mono text-primary/80 mb-2 uppercase tracking-wide">
                          {selectedProject.category}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-sentient text-foreground mb-6">
                          {selectedProject.title}
                        </h2>
                      </div>

                      {/* Problem */}
                      <div>
                        <h3 className="text-sm font-mono text-red-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-500" />
                          Problem
                        </h3>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          {selectedProject.caseStudy.problem}
                        </p>
                      </div>

                      {/* Approach */}
                      <div>
                        <h3 className="text-sm font-mono text-blue-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          Approach
                        </h3>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          {selectedProject.caseStudy.approach}
                        </p>
                      </div>

                      {/* Solution */}
                      <div>
                        <h3 className="text-sm font-mono text-purple-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-purple-500" />
                          Solution
                        </h3>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          {selectedProject.caseStudy.solution}
                        </p>
                      </div>

                      {/* Results */}
                      <div>
                        <h3 className="text-sm font-mono text-green-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500" />
                          Results
                        </h3>
                        <div className="space-y-2">
                          {selectedProject.caseStudy.results.map((result, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-sm text-foreground/80"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                              <span>{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="text-center mt-12">
          <Link href="/projects">
            <Button className="group">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
