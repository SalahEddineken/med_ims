"use client"

/**
 * Projects Section - Supabase Version
 * This is an example of how to fetch projects from Supabase
 * Replace your current projects-section.tsx with this after setting up the database
 */

import { Card } from "./ui/card"
import { ExternalLink, Github, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase"

interface Project {
  id: string
  title: string
  description: string
  long_description: string | null
  tags: string[]
  demo_url: string | null
  github_url: string | null
  image_url: string | null
  features: string[]
  timeline: string | null
  display_order: number
  is_featured: boolean
}

export function ProjectsSectionSupabase() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_featured', true)
        .order('display_order', { ascending: true })

      if (error) throw error

      setProjects(data || [])
    } catch (error: any) {
      console.error('Error fetching projects:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 md:py-28 relative z-0">
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center">
            <p className="font-mono text-foreground/60">Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 md:py-28 relative z-0">
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center">
            <p className="font-mono text-red-500">Error loading projects: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 md:py-28 relative z-0">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sentient mb-4">
            Featured <i className="font-light">Projects</i>
          </h2>
          <p className="font-mono text-foreground/60">A selection of my recent work i did in my free time and during my studies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="overflow-hidden bg-background/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group flex flex-col cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image_url || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={index < 3 ? "eager" : "lazy"}
                />
              </div>
              
              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl font-sentient">{project.title}</h3>
                  <div className="flex gap-2 flex-shrink-0">
                    {project.github_url && (
                      <Link
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/60 hover:text-primary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={18} />
                      </Link>
                    )}
                    {project.demo_url && (
                      <Link
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/60 hover:text-primary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={18} />
                      </Link>
                    )}
                  </div>
                </div>
                <p className="font-mono text-sm text-foreground/60 mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary border border-primary/20 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-primary/60 font-mono mt-auto">Click for details →</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-black/90 backdrop-blur-md z-[110]"
              />

              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed inset-x-0 top-24 bottom-4 z-[110] flex items-start justify-center overflow-auto px-4"
                onClick={() => setSelectedProject(null)}
              >
                <motion.div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-background/98 backdrop-blur-sm border border-border/50 rounded-lg max-w-5xl w-full my-auto overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {/* Close Button */}
                  <motion.button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 hover:bg-foreground/10 rounded-lg transition-colors z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={20} className="text-foreground/60 hover:text-foreground" />
                  </motion.button>

                  <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
                    {/* Left: Image and Links */}
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative w-full aspect-video rounded overflow-hidden bg-foreground/5"
                      >
                        <Image
                          src={selectedProject.image_url || "/placeholder.svg"}
                          alt={selectedProject.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </motion.div>

                      {/* Links under image */}
                      {(selectedProject.github_url || selectedProject.demo_url) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="flex items-center gap-4"
                        >
                          {selectedProject.github_url && (
                            <Link
                              href={selectedProject.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm font-mono text-foreground/60 hover:text-primary transition-colors"
                            >
                              <Github size={16} />
                              <span>View Code</span>
                            </Link>
                          )}
                          {selectedProject.demo_url && (
                            <Link
                              href={selectedProject.demo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm font-mono text-foreground/60 hover:text-primary transition-colors"
                            >
                              <ExternalLink size={16} />
                              <span>Live Demo</span>
                            </Link>
                          )}
                        </motion.div>
                      )}
                    </div>

                    {/* Right: Content */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-2xl md:text-3xl font-sentient text-foreground mb-3">
                          {selectedProject.title}
                        </h2>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          {selectedProject.long_description || selectedProject.description}
                        </p>
                      </div>

                      {selectedProject.features && selectedProject.features.length > 0 && (
                        <div>
                          <h3 className="text-xs font-mono text-foreground/50 uppercase tracking-wide mb-3">
                            Key Features
                          </h3>
                          <div className="space-y-2">
                            {selectedProject.features.map((feature, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 text-sm text-foreground/80"
                              >
                                <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h3 className="text-xs font-mono text-foreground/50 uppercase tracking-wide mb-3">
                          Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 text-xs bg-foreground/5 text-foreground/70 rounded border border-foreground/10"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {selectedProject.timeline && (
                        <div className="pt-2 border-t border-foreground/10">
                          <span className="font-mono text-xs text-foreground/40">
                            Timeline: {selectedProject.timeline}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

