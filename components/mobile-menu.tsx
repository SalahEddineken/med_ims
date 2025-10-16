"use client"

import { cn } from "@/lib/utils"
import * as Dialog from "@radix-ui/react-dialog"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ThemeSwitcher } from "./theme-switcher"

interface MobileMenuProps {
  className?: string
}

export const MobileMenu = ({ className }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Showcase", href: "/showcase" },
    { name: "CV", href: "/cv" },
    { name: "Contact", href: "/contact" },
  ]

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <Dialog.Root modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex lg:hidden items-center gap-2">
        <ThemeSwitcher />
        <Dialog.Trigger asChild>
          <button
            className={cn("group p-2 text-foreground transition-all duration-300 hover:scale-110", className)}
            aria-label="Open menu"
          >
            <Menu className="group-[[data-state=open]]:hidden transition-transform duration-300" size={24} />
            <X
              className="hidden group-[[data-state=open]]:block group-[[data-state=open]]:rotate-90 transition-transform duration-300"
              size={24}
            />
          </button>
        </Dialog.Trigger>
      </div>

      <Dialog.Portal>
        <div
          data-overlay="true"
          className="fixed z-30 inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        />

        <Dialog.Content
          onInteractOutside={(e) => {
            if (e.target instanceof HTMLElement && e.target.dataset.overlay !== "true") {
              e.preventDefault()
            }
          }}
          className="fixed top-0 left-0 w-full z-40 py-28 md:py-40 animate-in slide-in-from-top duration-300"
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>

          <nav className="flex flex-col space-y-6 container mx-auto">
            {menuItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className="text-xl font-mono uppercase text-foreground/60 transition-all ease-out duration-300 hover:text-foreground/100 hover:translate-x-2 py-2 animate-in slide-in-from-left"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
