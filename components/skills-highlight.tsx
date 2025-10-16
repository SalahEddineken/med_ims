"use client"

import { motion } from "framer-motion"
import { BarChart3, Database, TrendingUp, Code, PieChart, Brain } from "lucide-react"

const skills = [
  {
    icon: BarChart3,
    title: "Data Visualization",
    description: "Creating compelling visual stories with Tableau, Power BI, and D3.js",
  },
  {
    icon: Database,
    title: "SQL & Databases",
    description: "Expert in complex queries, optimization, and database design",
  },
  {
    icon: TrendingUp,
    title: "Statistical Analysis",
    description: "Advanced statistical modeling and hypothesis testing",
  },
  {
    icon: Code,
    title: "Python & R",
    description: "Data manipulation with Pandas, NumPy, and tidyverse",
  },
  {
    icon: PieChart,
    title: "Data Analytics",
    description: "Translating data insights into actionable strategies",
  },
  {
    icon: Brain,
    title: "Predictive Analytics",
    description: "Predictive modeling and pattern recognition",
  },
]

export function SkillsHighlight() {
  return (
    <section className="py-20 md:py-28 relative z-0 bg-background/25">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">Core Competencies</h2>
          <p className="text-foreground/60 font-mono max-w-2xl mx-auto">
            Specialized skills in data analysis, visualization, and business intelligence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-6 rounded-lg border border-border bg-card hover:border-foreground/20 transition-all duration-300 hover:shadow-lg"
              >
                <Icon className="w-10 h-10 mb-4 text-foreground/80" />
                <h3 className="text-lg font-bold font-mono mb-2">{skill.title}</h3>
                <p className="text-sm text-foreground/60 font-mono">{skill.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
