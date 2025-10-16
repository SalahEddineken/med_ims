"use client"

import { Linkedin, Github, Twitter } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-0 border-t border-border/30 bg-background/30 backdrop-blur-sm">
      <div className="container max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left: Copyright */}
          <p className="font-mono text-sm text-foreground/40 text-center md:text-left">
            © {currentYear} all rights reserved
          </p>

          {/* Center: Social Links */}
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/salaheddine-kennouda/"
              className="w-9 h-9 rounded-full border border-border/50 hover:border-primary/40 flex items-center justify-center transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} className="text-foreground/60 hover:text-primary transition-colors" />
            </a>
            <a
              href="https://github.com/SalahEddineken"
              className="w-9 h-9 rounded-full border border-border/50 hover:border-primary/40 flex items-center justify-center transition-all duration-300"
              aria-label="GitHub"
            >
              <Github size={16} className="text-foreground/60 hover:text-primary transition-colors" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full border border-border/50 hover:border-primary/40 flex items-center justify-center transition-all duration-300"
              aria-label="Twitter"
            >
              <Twitter size={16} className="text-foreground/60 hover:text-primary transition-colors" />
            </a>
          </div>

          {/* Right: Built with */}
          <p className="font-mono text-xs text-foreground/30">
            Built with <span className="text-primary">❤</span> by Salaheddine Kennouda
          </p>
        </div>
      </div>
    </footer>
  )
}

