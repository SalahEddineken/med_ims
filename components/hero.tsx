"use client"

import { Pill } from "./pill"
import { SalaheddineLogo } from "./salaheddine-logo"

export function Hero() {

  return (
    <div className="flex flex-col h-svh justify-center items-center px-4 sm:px-6 relative overflow-hidden">
      {/* Simple Background */}
      <div className="absolute inset-0 -z-10 bg-background" />

      <div className="text-center relative w-full max-w-4xl z-10">
        {/* Logo */}
        <div className="mb-8 sm:mb-12">
          <SalaheddineLogo className="w-64 h-20 xs:w-80 xs:h-24 sm:w-96 sm:h-32 md:w-[500px] md:h-40 lg:w-[600px] lg:h-48 mx-auto drop-shadow-2xl" loop />
        </div>

        {/* Pill */}
        <div className="mb-6">
          <Pill>AVAILABLE FOR WORK</Pill>
        </div>

        {/* Title */}
        <h1 className="text-4xl xs:text-5xl sm:text-6xl font-sentient font-mono md:text-7xl text-center leading-tight">
          <span className="inline-block bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Data Analyst
          </span>
          <br />
          <span className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl inline-block">
            & <i className="font-light"> Web Developer</i>
          </span>
        </h1>

        {/* Description */}
        <p className="font-mono text-xs xs:text-sm sm:text-base text-foreground/60 text-balance mt-6 sm:mt-8 max-w-[520px] mx-auto px-2">
          Transforming data into actionable insights and building modern web applications with React & Next.js
        </p>

      </div>
    </div>
  )
}
