"use client"

import { motion } from "framer-motion"
import type React from "react"

export const SalaheddineLogo = ({ 
  className, 
  style, 
  loop = false 
}: { 
  className?: string; 
  style?: React.CSSProperties;
  loop?: boolean;
}) => {
  const text = "Salaheddine"
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        repeat: loop ? Infinity : 0,
        repeatDelay: loop ? 2.5 : 0,
        ...(loop && { repeatType: "loop" as const }),
      },
    },
  }

  const letter = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.3,
        repeat: loop ? Infinity : 0,
        repeatDelay: loop ? 2.5 : 0,
        ...(loop && { repeatType: "loop" as const }),
      },
    },
  }

  return (
    <motion.svg
      viewBox="0 0 300 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ ...style, color: 'var(--color-foreground)' }}
      initial="hidden"
      animate="visible"
    >
      {/* Handwritten "Salaheddine" text - letter by letter */}
      <motion.text
        x="10"
        y="55"
        fill="currentColor"
        fontSize="48"
        fontFamily="'HelloKetta', 'Brush Script MT', cursive"
        fontStyle="normal"
        fontWeight="400"
        variants={container}
      >
        {text.split("").map((char, index) => (
          <motion.tspan key={index} variants={letter}>
            {char}
          </motion.tspan>
        ))}
      </motion.text>
    </motion.svg>
  )
}

