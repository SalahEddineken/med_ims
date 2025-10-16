"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import { Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

const blogPosts = [
  {
    title: "5 Data Visualization Mistakes I See Every Day",
    excerpt: "Common pitfalls that make dashboards confusing instead of insightful, and how to avoid them.",
    date: "Oct 10, 2024",
    readTime: "5 min read",
    category: "Data Visualization",
    slug: "data-visualization-mistakes",
    trending: true,
  },
  {
    title: "How I Built a $2M Sales Dashboard in 2 Weeks",
    excerpt: "A step-by-step breakdown of creating a high-impact dashboard that transformed sales operations.",
    date: "Oct 5, 2024",
    readTime: "8 min read",
    category: "Case Study",
    slug: "sales-dashboard-case-study",
    trending: true,
  },
  {
    title: "Python vs R for Data Analysis: My Take",
    excerpt: "After 3 years using both languages, here's what I've learned about when to use each one.",
    date: "Sep 28, 2024",
    readTime: "6 min read",
    category: "Tools & Tech",
    slug: "python-vs-r",
    trending: false,
  },
]

export function BlogPreviewSection() {
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
              Latest <i className="font-light">Insights</i>
            </h2>
            <p className="text-foreground/60 font-mono max-w-2xl mx-auto text-sm">
              Thoughts on data analysis, visualization, and turning insights into action
            </p>
          </motion.div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={shouldAnimate ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: shouldAnimate ? index * 0.1 : 0, duration: shouldAnimate ? 0.5 : 0 }}
              className="group"
            >
              <Link href={`#`} className="block h-full">
                <div className="h-full p-6 rounded-lg border border-border bg-card/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 hover:-translate-y-1">
                  {/* Category & Trending Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-[#bbaf45] uppercase tracking-wide">
                      {post.category}
                    </span>
                    {post.trending && (
                      <span className="flex items-center gap-1 text-xs font-mono text-orange-500 bg-orange-500/10 px-2 py-1 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        Trending
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-sentient text-xl mb-3 group-hover:text-[#bbaf45] transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-mono text-sm text-foreground/60 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs font-mono text-foreground/40 pt-4 border-t border-border/50">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Read More */}
                  <div className="mt-4 flex items-center gap-2 text-sm font-mono text-primary group-hover:gap-3 transition-all">
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: shouldAnimate ? 0.4 : 0, duration: shouldAnimate ? 0.5 : 0 }}
          className="text-center"
        >
          <Link href="#">
            <Button className="group">
              View All Articles
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: shouldAnimate ? 0.5 : 0, duration: shouldAnimate ? 0.5 : 0 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <div className="p-8 rounded-lg border border-[#bbaf45]/20 bg-[#bbaf45]/5">
            <div className="text-center">
              <h3 className="text-2xl font-sentient mb-2">
                Get <i className="font-light">Insights</i> Delivered
              </h3>
              <p className="font-mono text-sm text-foreground/60 mb-6">
                Join 500+ data professionals receiving weekly tips and case studies
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background/50 font-mono text-sm focus:outline-none focus:border-[#bbaf45]/50 focus:ring-2 focus:ring-[#bbaf45]/20"
                />
                <Button type="submit" className="whitespace-nowrap">
                  Subscribe
                </Button>
              </form>
              <p className="font-mono text-xs text-foreground/40 mt-3">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

