"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"

interface Stat {
  value: string
  label: string
  suffix?: string
}

const stats: Stat[] = [
  { value: "10", label: "Projects Completed", suffix: "+" },
  { value: "10", label: "Data Visualizations", suffix: "+" },
  { value: "30", label: "Datasets Analyzed", suffix: "+" },
  { value: "2", label: "Years Experience", suffix: "+" },
]

function AnimatedNumber({ value, suffix = "", shouldStart }: { value: string; suffix?: string; shouldStart: boolean }) {
  const [count, setCount] = useState(0)
  const target = Number.parseInt(value)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current || !shouldStart) {
      return
    }

    hasAnimated.current = true
    let start = 0
    const duration = 1500
    const increment = target / (duration / 32)

    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 32)

    return () => clearInterval(timer)
  }, [target, shouldStart])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

function StatCard({ stat, index, shouldAnimate }: { stat: typeof stats[0]; index: number; shouldAnimate: boolean }) {
  const [startCounter, setStartCounter] = useState(false)

  return (
    <motion.div
      initial={shouldAnimate ? { opacity: 0, y: 30, scale: 0.9 } : { opacity: 1, y: 0, scale: 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      onViewportEnter={() => setStartCounter(true)}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ 
        delay: shouldAnimate ? index * 0.1 : 0, 
        duration: shouldAnimate ? 0.5 : 0,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="text-center border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,0,0.15)] bg-background/40 backdrop-blur-sm"
    >
      <motion.div 
        className="text-4xl md:text-5xl font-bold font-mono text-foreground mb-2"
        initial={shouldAnimate ? { scale: 0 } : { scale: 1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ 
          delay: shouldAnimate ? index * 0.1 + 0.2 : 0,
          type: "spring",
          stiffness: 200,
          damping: 10
        }}
      >
        <AnimatedNumber value={stat.value} suffix={stat.suffix} shouldStart={startCounter} />
      </motion.div>
      <div className="text-sm md:text-base text-foreground/60 font-mono">{stat.label}</div>
    </motion.div>
  )
}

export function StatsSection() {
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setShouldAnimate(!prefersReducedMotion)
  }, [prefersReducedMotion])

  return (
    <section className="py-16 md:py-20 relative z-0">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/5 to-transparent" />
      
      <div className="container max-w-7xl mx-auto px-4 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-sentient mb-2">
            By the <i className="font-light">Numbers</i>
          </h2>
          <p className="text-foreground/60 font-mono text-sm">
            Quantifying my impact and experience
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} shouldAnimate={shouldAnimate} />
          ))}
        </div>
      </div>
    </section>
  )
}
