"use client"

import Link from "next/link"
import { SalaheddineLogo } from "./salaheddine-logo"
import { MobileMenu } from "./mobile-menu"
import { ThemeSwitcher } from "./theme-switcher"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

export const Header = () => {
  const pathname = usePathname()

  return (
    <div className="fixed z-[100] top-0 left-0 w-full px-4 md:px-8 pt-6">
      <header className="flex items-center justify-between max-w-7xl mx-auto backdrop-blur-2xl px-6 md:px-8 py-3 rounded-full shadow-xl bg-background/40 border border-foreground/10">
        <Link href="/" className="group flex-shrink-0 flex items-center">
          <SalaheddineLogo className="w-32 h-10 md:w-40 md:h-12" loop />
        </Link>

        <nav className="flex max-lg:hidden gap-x-8 xl:gap-x-10 items-center">
          {[
            { name: "About", href: "/about" },
            { name: "Projects", href: "/projects" },
            { name: "Showcase", href: "/showcase" },
            { name: "CV", href: "/cv" },
            { name: "Contact", href: "/contact" },
          ].map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

            return (
              <Link
                className="relative uppercase inline-block font-mono text-sm text-foreground/60 hover:text-foreground/100 duration-300 transition-all ease-out group hover:-translate-y-0.5"
                href={item.href}
                key={item.name}
              >
                <span className={`relative ${isActive ? "text-foreground" : ""}`}>
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-foreground transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </span>
              </Link>
            )
          })}
          <ThemeSwitcher />
        </nav>

        <MobileMenu />
      </header>
    </div>
  )
}
