'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function ThemeSwitcherAdvanced() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="relative w-12 h-12 rounded-full flex items-center justify-center"
        aria-label="Toggle theme"
      >
        <div className="w-6 h-6" />
      </button>
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-12 h-12 rounded-full hover:bg-foreground/5 transition-all overflow-hidden group"
      aria-label="Toggle theme"
    >
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: isDark 
            ? 'linear-gradient(to bottom, #1a1a2e 0%, #0f0f1e 100%)'
            : 'linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 100%)'
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Stars (visible in dark mode) */}
      {isDark && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full"
            style={{
              boxShadow: '0 0 2px 1px rgba(255,255,255,0.5)'
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-3 right-3 w-0.5 h-0.5 bg-white rounded-full"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="absolute bottom-4 left-4 w-0.5 h-0.5 bg-white rounded-full"
          />
        </>
      )}

      {/* Clouds (visible in light mode) */}
      {!isDark && (
        <>
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 0.6 }}
            className="absolute top-2 right-1 w-3 h-1.5 bg-white rounded-full"
            style={{ filter: 'blur(1px)' }}
          />
          <motion.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 0.5 }}
            className="absolute bottom-3 left-1 w-4 h-2 bg-white rounded-full"
            style={{ filter: 'blur(1.5px)' }}
          />
        </>
      )}

      {/* Sun/Moon */}
      <motion.div
        className="absolute"
        animate={{
          top: isDark ? '50%' : '30%',
          left: isDark ? '30%' : '50%',
          transform: 'translate(-50%, -50%)',
        }}
        transition={{ 
          type: 'spring',
          stiffness: 200,
          damping: 20
        }}
      >
        <motion.div
          animate={{
            scale: isDark ? 1 : 1.2,
            rotate: isDark ? 0 : 360,
          }}
          transition={{ 
            scale: { duration: 0.3 },
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' }
          }}
          className="relative"
        >
          {/* Sun */}
          {!isDark && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-5 h-5 rounded-full bg-yellow-400"
              style={{
                boxShadow: '0 0 20px 5px rgba(251, 191, 36, 0.6)'
              }}
            />
          )}
          
          {/* Moon */}
          {isDark && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="relative w-5 h-5"
            >
              <div className="w-5 h-5 rounded-full bg-gray-200" />
              <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-gray-300/40" />
              <div className="absolute bottom-1 left-0.5 w-2 h-2 rounded-full bg-gray-300/30" />
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Pulsing border on hover */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary opacity-0 group-hover:opacity-40"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

