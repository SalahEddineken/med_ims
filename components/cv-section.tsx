"use client"

import { Card } from "./ui/card"
import { Download, ExternalLink, X, GraduationCap, Award } from "lucide-react"
import { Button } from "./ui/button"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import Image from "next/image"

const experience = [
  {
    title: "Data Management Intern",
    company: "INSFP - Martyr Larbi Ben M'hidi | Mila",
    type: "Internship",
    period: "2025",
    description: "Architected the back-end on Microsoft SQL Server for persistent data storage, capable of handling over 1,000 student records with efficient query performance",
    description2: "Designed the user interface with the VCL framework and Figma to provide an intuitive and efficient user experience",
    description3: "Implemented a comprehensive student management system, including features for student registration, course enrollment, and academic performance tracking",
  },
  {
    title: "Stock Manager",
    company: "EURL Montiko",
    type: "On Site - Full Time",
    period: "2024 ",
    description: "Managed the stock of the company and the inventory of the products",
    description2: "Provided recommendations for improving sales performance",
  },
  {
    title: "Data Management Intern",
    company: "Bloomsbury Publishing Plc",
    type: "Remote - Full Time",
    period: "2024",
    description: "Developed features and maintained codebases for multiple projects",
    description2: "Developed a robust database schema to support the application, ensuring data integrity and security",
  },
]

const education = [
  {
    degree: "Advanced Technician Certificate in Computer science /Option: Databases",
    institution: "INSFP - Martyr Larbi Ben M'hidi | Mila",
  },
  {
    degree: "Bachelor of science and Technology",
    institution: "University of Constantine 1",
  },
]

const certificates = [
  {
    title: "Data Analytics Professional Certificate",
    issuer: "Google",
    date: "2024",
    link: "https://www.coursera.org/account/accomplishments/professional-cert/F946RN7MVI5E",
    image: "/certificates/google-data-analytics.png",
  },
  {
    title: "Data Analytics Professional Certificate",
    issuer: "Meta",
    date: "2025",
    link: "https://www.coursera.org/account/accomplishments/professional-cert/RV7CJF3KHA2R",
    image: "/certificates/meta-data-analytics.png",
  },
]

const hardSkills = [
  // Data Analysis
  "Python",
  "SQL & Databases",
  "Microsoft Excel",
  "Tableau",
  "Power BI",
  "Pandas & NumPy",
  "Data Visualization",
  "Statistical Analysis",
  // Web Development
  "JavaScript/TypeScript",
  "React & Next.js",
  "HTML & CSS",
  "Git & GitHub",
  "Responsive Design",
  "RESTful APIs",
  "Node.js Basics",
]

const softSkills = [
  "Problem Solving",
  "Critical Thinking",
  "Communication",
  "Attention to Detail",
  "Time Management",
  "Teamwork",
  "Adaptability",
  "Analytical Thinking",
  "Creativity",
]

const languages = [
  { name: "Arabic", level: "Native", proficiency: 100 },
  { name: "English", level: "Professional", proficiency: 80 },
  { name: "French", level: "Communication ", proficiency: 30 },
]

const currentLearning = [
  {
    title: "Advanced Machine Learning Specialization",
    platform: "Coursera",
    progress: 65,
    icon: GraduationCap,
  },
  {
    title: "Tableau Desktop Specialist",
    platform: "Tableau",
    progress: 40,
    icon: Award,
  },
]

const hobbies = [
  { name: "Music Production", icon: "🎵", description: "Creating electronic music and beats" },
  { name: "Data Visualization", icon: "📊", description: "Exploring creative ways to present data" },
  { name: "Continuous Learning", icon: "📚", description: "Online courses and certifications" },
  { name: "Photography", icon: "📷", description: "Capturing moments and visual storytelling" },
]

export function CVSection() {
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificates[0] | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="py-20 md:py-28 relative z-0">
      <div className="container max-w-7xl mx-auto px-4 md:px-8 my-7">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 md:mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-sentient mb-4">
                Curriculum <i className="font-light">Vitae</i>
              </h2>
              <p className="font-mono text-foreground/60">Experience, education, and skills</p>
            </div>
            <Button 
              asChild 
              className="gap-2 bg-transparent w-fit"
            >
              <a 
                href="" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Download size={16} />
                Download CV
              </a>
            </Button>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-sentient mb-6">Experience</h3>
              <div className="space-y-6">
                {experience.map((job, index) => (
                  <Card key={index} className="p-6 bg-background border-border">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                      <div>
                        <h4 className="text-xl font-sentient">{job.title}</h4>
                        <p className="font-mono text-sm text-primary">{job.company}</p>
                      </div>
                      <span className="font-mono text-sm text-foreground/60">{job.period}</span>
                    </div>
                    <p className="font-mono text-xs text-foreground/50 mb-3">{job.type}</p>
                    <div className="space-y-2">
                      {job.description && <p className="font-mono text-sm text-foreground/60">{job.description}</p>}
                      {job.description2 && <p className="font-mono text-sm text-foreground/60">{job.description2}</p>}
                      {job.description3 && <p className="font-mono text-sm text-foreground/60">{job.description3}</p> }
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-sentient mb-6">Education</h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <Card key={index} className="p-6 bg-background border-border">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                      <h4 className="text-xl font-sentient">{edu.degree}</h4>
                    </div>
                    <p className="font-mono text-sm text-primary">{edu.institution}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-sentient mb-6">Online Certificates</h3>
              <div className="space-y-6">
                {certificates.map((cert, index) => (
                  <Card 
                    key={index} 
                    className="p-6 bg-background border-border hover:border-primary/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedCertificate(cert)}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                      <div className="flex-1">
                        <h4 className="text-xl font-sentient mb-1">{cert.title}</h4>
                        <p className="font-mono text-sm text-primary">{cert.issuer}</p>
                      </div>
                      <span className="font-mono text-sm text-foreground/60">{cert.date}</span>
                    </div>
                    <p className="text-xs text-primary/60 font-mono mt-2">Click to view certificate →</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Currently Learning */}
            <div>
              <h3 className="text-2xl font-sentient mb-6 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-[#bbaf45]" />
                Currently <i className="font-light">Learning</i>
              </h3>
              <p className="font-mono text-sm text-foreground/60 mb-6">
                Always expanding my skill set and staying current with industry trends
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {currentLearning.map((course, index) => {
                  const Icon = course.icon
                  return (
                    <Card key={index} className="p-6 bg-background border-border hover:border-[#bbaf45]/30 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-[#bbaf45]/10 rounded-lg">
                          <Icon className="w-6 h-6 text-[#bbaf45]" />
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <div>
                            <h4 className="font-sentient text-lg mb-1">{course.title}</h4>
                            <p className="font-mono text-sm text-primary">{course.platform}</p>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs text-foreground/60">Progress</span>
                              <span className="font-mono text-xs text-foreground/60">{course.progress}%</span>
                            </div>
                            <div className="h-2 bg-foreground/5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#bbaf45] rounded-full transition-all duration-1000"
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Hard Skills */}
            <div>
              <h3 className="text-2xl font-sentient mb-6">
                Hard <i className="font-light">Skills</i>
              </h3>
              <div className="flex flex-wrap gap-3">
                {hardSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 font-mono text-sm bg-primary/10 text-primary border border-primary/20 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div>
              <h3 className="text-2xl font-sentient mb-6">
                Soft <i className="font-light">Skills</i>
              </h3>
              <div className="flex flex-wrap gap-3">
                {softSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 font-mono text-sm bg-primary/10 text-primary border border-primary/20 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-2xl font-sentient mb-6">
                Languages
              </h3>
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-sentient text-lg">{lang.name}</span>
                      <span className="font-mono text-sm text-foreground/60">{lang.level}</span>
                    </div>
                    <div className="h-2 bg-foreground/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-1000"
                        style={{ width: `${lang.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hobbies & Interests */}
            <div>
              <h3 className="text-2xl font-sentient mb-6">
                Hobbies & <i className="font-light">Interests</i>
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {hobbies.map((hobby, index) => (
                  <Card key={index} className="p-4 bg-background border-border hover:border-primary/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{hobby.icon}</span>
                      <div>
                        <h4 className="font-sentient text-base mb-1">{hobby.name}</h4>
                        <p className="font-mono text-xs text-foreground/60">{hobby.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Modal */}
        {selectedCertificate && (
          <>
            <div
              onClick={() => setSelectedCertificate(null)}
              className="fixed inset-0 bg-black/95 backdrop-blur-md z-[110]"
            />

            <div
              className="fixed inset-0 z-[110] flex items-center justify-center p-2 xs:p-4 pt-16 xs:pt-20 sm:pt-24"
              onClick={() => setSelectedCertificate(null)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="absolute -top-12 right-0 p-2 hover:bg-foreground/10 rounded-lg transition-colors z-10"
                >
                  <X size={24} className="text-white" />
                </button>

                <div className="relative bg-gradient-to-b from-foreground/5 to-background/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 xs:p-4 md:p-6 shadow-2xl border border-foreground/10">
                  {/* Certificate Image */}
                  <div className="relative aspect-[4/3] sm:aspect-[3/2] rounded-lg sm:rounded-xl overflow-hidden bg-foreground/5 mb-3 xs:mb-4">
                    <Image
                      src={selectedCertificate.image || "/placeholder.svg"}
                      alt={selectedCertificate.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 80vw"
                      priority
                    />
                  </div>

                  {/* Certificate Info */}
                  <div className="text-center space-y-2 xs:space-y-3">
                    <div>
                      <h2 className="text-lg xs:text-xl md:text-2xl font-sentient text-foreground mb-1 px-2">
                        {selectedCertificate.title}
                      </h2>
                      <p className="text-[10px] xs:text-xs text-foreground/60 font-mono">
                        {selectedCertificate.issuer} • {selectedCertificate.date}
                      </p>
                    </div>

                    {/* View Certificate Link */}
                    <Button
                      asChild
                      size="sm"
                      className="gap-1 xs:gap-2 text-xs xs:text-sm"
                    >
                      <a
                        href={selectedCertificate.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={12} className="xs:w-3.5 xs:h-3.5" />
                        View Certificate
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
