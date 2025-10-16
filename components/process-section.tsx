"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import { Search, Database, Lightbulb, BarChart3, FileText, CheckCircle2 } from "lucide-react"

const processSteps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery",
    description: "Understand your business goals, challenges, and key metrics. Define success criteria and project scope.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    number: "02",
    icon: Database,
    title: "Data Collection",
    description: "Gather and integrate data from multiple sources. Clean, validate, and prepare datasets for analysis.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "Analysis",
    description: "Deep dive into data using statistical methods and machine learning. Identify patterns, trends, and anomalies.",
    color: "text-[#bbaf45]",
    bgColor: "bg-[#bbaf45]/10",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Visualization",
    description: "Create intuitive dashboards and reports. Transform complex data into clear, actionable visual insights.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    number: "05",
    icon: FileText,
    title: "Insights",
    description: "Present findings with clear recommendations. Explain technical results in business-friendly language.",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    number: "06",
    icon: CheckCircle2,
    title: "Implementation",
    description: "Support implementation of recommendations. Provide documentation, training, and ongoing optimization.",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
]

export function ProcessSection() {
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setShouldAnimate(!prefersReducedMotion)
  }, [prefersReducedMotion])

  return (
    <section className="py-20 md:py-28 relative z-0">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldAnimate ? 0.5 : 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-sentient mb-4">
              My <i className="font-light">Process</i>
            </h2>
            <p className="text-foreground/60 font-mono max-w-2xl mx-auto text-sm">
              A proven 6-step methodology that transforms raw data into strategic business value
            </p>
          </motion.div>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={shouldAnimate ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: shouldAnimate ? index * 0.1 : 0, duration: shouldAnimate ? 0.5 : 0 }}
                className="relative group"
              >
                <div className="h-full p-6 rounded-lg border border-border bg-card/50 hover:border-primary/20 hover:bg-card/80 transition-all duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4">
                    <div className="w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center font-mono font-bold text-foreground/40 group-hover:border-primary/30 group-hover:text-primary transition-all">
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-lg ${step.bgColor} mb-4 mt-6`}>
                    <Icon className={`w-6 h-6 ${step.color}`} />
                  </div>

                  {/* Content */}
                  <h3 className="font-sentient text-xl mb-3">{step.title}</h3>
                  <p className="font-mono text-sm text-foreground/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line (desktop only) */}
                {index < processSteps.length - 1 && (index + 1) % 3 !== 0 && (
                  <div className="hidden lg:block absolute top-16 -right-4 w-8 h-0.5 bg-gradient-to-r from-border to-transparent" />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: shouldAnimate ? 0.6 : 0, duration: shouldAnimate ? 0.5 : 0 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-6 rounded-lg bg-primary/5 border border-primary/20">
            <p className="font-mono text-sm text-foreground/70">
              <span className="font-bold text-foreground">Result:</span> Clear, actionable insights that drive real business outcomes
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

