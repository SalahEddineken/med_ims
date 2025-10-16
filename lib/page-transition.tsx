"use client"

import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { useEffect, useState } from "react"

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setShouldAnimate(!prefersReducedMotion)
  }, [prefersReducedMotion])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: shouldAnimate ? 0 : 1, y: shouldAnimate ? 10 : 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: shouldAnimate ? 0 : 1, y: shouldAnimate ? -10 : 0 }}
        transition={{
          duration: shouldAnimate ? 0.3 : 0,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
