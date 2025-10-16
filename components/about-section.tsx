"use client"

import React from "react"
import { Card } from "./ui/card"
import { BarChart3, Database, LineChart, TrendingUp, Code, Brain, Laptop, Palette } from "lucide-react"

const skills = [
  { icon: BarChart3, name: "Data Visualization", description: "Creating compelling visual stories with Tableau, Power BI, and Python libraries" },
  { icon: Database, name: "SQL & Databases", description: "Expert in complex queries, optimization, and database design" },
  { icon: LineChart, name: "Statistical Analysis", description: "Advanced statistical modeling and hypothesis testing" },
  { icon: TrendingUp, name: "Predictive Analytics", description: "Building ML models for forecasting and pattern recognition" },
  { icon: Code, name: "Programming", description: "Python, R, JavaScript for data manipulation and analysis" },
  { icon: Brain, name: "Business Intelligence", description: "Translating data insights into actionable business strategies" },
  { icon: Laptop, name: "Web Development", description: "Building responsive web applications with React, Next.js, and TypeScript" },
  { icon: Palette, name: "UI/UX Design", description: "Creating intuitive and visually appealing user interfaces" },
]

const expertise = [
  "Data cleaning and preprocessing",
  "ETL pipeline development",
  "A/B testing and experimentation",
  "Dashboard development",
  "Machine learning algorithms",
  "Data storytelling",
  "React & Next.js development",
  "Responsive web design",
  "RESTful API integration",
  "Database management",
]

export function AboutSection() {
  return (
    <section className="py-20 md:py-28 relative z-0">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient mb-6">
              About <i className="font-light">Me</i>
            </h1>
            <p className="font-mono text-lg text-foreground/80 leading-relaxed">
              I'm Salaheddine Kennouda,<br />
              a passionate <span className="text-primary font-semibold">Data Analyst</span> and <span className="text-primary font-semibold">Junior Web Developer</span> who transforms complex datasets into 
              actionable insights and builds modern web applications. <br /> 
              <br />
              With a keen eye for patterns and a love for storytelling through data, 
              I help organizations make informed decisions that drive growth. I also create elegant, 
              user-friendly web experiences using modern technologies like React, Next.js, and TypeScript.<br />
              <br />
              Beyond coding and data, I love to create music and art.
            </p>
          </div>

          {/* What I Do */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-sentient mb-8">
              What I <i className="font-light">Do</i>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon
                return (
                  <Card key={index} className="p-6 bg-background/50 border-border hover:border-primary/30 transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-sentient text-xl mb-2">{skill.name}</h3>
                        <p className="font-mono text-sm text-foreground/60">{skill.description}</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Expertise */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-sentient mb-8">
              Areas of <i className="font-light">Expertise</i>
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {expertise.map((item, index) => (
                <div
                  key={index}
                  className="px-6 py-4 font-mono text-sm bg-background/50 border border-border hover:border-primary/30 rounded-lg transition-all duration-300 hover:translate-y-[-2px]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Philosophy */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-sentient mb-8">
              My <i className="font-light">Philosophy</i>
            </h2>
            <Card className="p-8 bg-background/50 border-border">
              <blockquote className="font-mono text-foreground/80 leading-relaxed space-y-4">
                <p>
                  "Data is more than just numbers—it's the story , market trends, and 
                  opportunities waiting to be discovered. My approach combines rigorous analytical methods 
                  with creative problem-solving to uncover insights that others might miss."
                </p>
                <p>
                  I believe in making data accessible to everyone. Whether you're a C-suite executive or 
                  a team member, my visualizations and reports are designed to communicate complex 
                  information clearly and compellingly.
                </p>
              </blockquote>
            </Card>
          </div>

          {/* Tools & Technologies - Simple Black & White */}
          <div>
            <h2 className="text-3xl md:text-4xl font-sentient mb-8">
              Tools & <i className="font-light">Proficiency</i>
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { name: "SQL", level: 90, years: "3 years" },
                { name: "Tableau", level: 90, years: "2 years" },
                { name: "Power BI", level: 85, years: "2 years" },
                { name: "Excel", level: 95, years: "4 years" },
              ].map((tech, index) => (
                <Card key={index} className="p-6 bg-background/50 border border-foreground/10 hover:border-foreground/20 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-mono text-lg font-medium text-foreground">{tech.name}</h3>
                      <span className="font-mono text-sm text-foreground/60">{tech.years}</span>
                    </div>
                    
                    {/* Simple black and white progress bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xs text-foreground/50">Proficiency</span>
                        <span className="font-mono text-sm font-bold text-foreground">{tech.level}%</span>
                      </div>
                      <div className="h-1 bg-foreground/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-foreground rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${tech.level}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Simple dots indicator */}
                    <div className="flex gap-1">
                      {[...Array(10)].map((_, dotIndex) => (
                        <div
                          key={dotIndex}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            dotIndex < Math.floor(tech.level / 10) 
                              ? 'bg-foreground' 
                              : 'bg-foreground/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

