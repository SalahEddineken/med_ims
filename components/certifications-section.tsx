"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import { Award, ExternalLink, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const certifications = [
  {
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    date: "2024",
    image: "/certificates/google-data-analytics.png",
    verified: true,
    skills: ["Data Analysis", "SQL", "Data Visualization", "Spreadsheets"],
    credentialUrl: "#",
  },
  {
    title: "Meta Data Analyst Professional Certificate",
    issuer: "Meta",
    date: "2024",
    image: "/certificates/meta-data-analytics.png",
    verified: true,
    skills: ["Python", "Statistics", "A/B Testing", "Data Storytelling"],
    credentialUrl: "#",
  },
]


export function CertificationsSection() {
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setShouldAnimate(!prefersReducedMotion)
  }, [prefersReducedMotion])

  return (
    <section className="py-20 md:py-28 relative z-0 bg-background/10">
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
              Certifications & <i className="font-light">Learning</i>
            </h2>
            <p className="text-foreground/60 font-mono max-w-2xl mx-auto text-sm">
              Committed to continuous learning and professional development
            </p>
          </motion.div>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={shouldAnimate ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: shouldAnimate ? index * 0.1 : 0, duration: shouldAnimate ? 0.5 : 0 }}
              className="group"
            >
              <div className="h-full p-6 rounded-lg border border-border bg-card/50 hover:border-[#bbaf45]/30 hover:bg-card/80 transition-all duration-300">
                {/* Certificate Image */}
                <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden mb-4 bg-foreground/5">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {cert.verified && (
                    <div className="absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-mono flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-sentient text-lg mb-2 group-hover:text-[#bbaf45] transition-colors">
                      {cert.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-foreground/60 font-mono">
                      <span>{cert.issuer}</span>
                      <span>•</span>
                      <span>{cert.date}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs font-mono bg-foreground/5 text-foreground/70 rounded-full border border-foreground/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* View Credential Link */}
                  <Link
                    href={cert.credentialUrl}
                    className="inline-flex items-center gap-2 text-sm font-mono text-[#bbaf45] hover:text-[#bbaf45]/80 transition-colors"
                  >
                    View Credential
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>


        {/* Stats */}
        <motion.div
          initial={shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: shouldAnimate ? 0.6 : 0, duration: shouldAnimate ? 0.5 : 0 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10">
            <div className="text-3xl font-bold font-mono text-foreground mb-1">2+</div>
            <div className="text-xs font-mono text-foreground/50 uppercase tracking-wide">Certifications</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10">
            <div className="text-3xl font-bold font-mono text-foreground mb-1">100+</div>
            <div className="text-xs font-mono text-foreground/50 uppercase tracking-wide">Learning Hours</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10">
            <div className="text-3xl font-bold font-mono text-foreground mb-1">2024</div>
            <div className="text-xs font-mono text-foreground/50 uppercase tracking-wide">Latest</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

