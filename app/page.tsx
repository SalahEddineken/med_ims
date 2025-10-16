import { Hero } from "@/components/hero"
import { StatsSection } from "@/components/stats-section"
import { FeaturedWork } from "@/components/featured-work"
import { SkillsHighlight } from "@/components/skills-highlight"
import { ServicesSection } from "@/components/services-section"
import { ProcessSection } from "@/components/process-section"

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Simple Background */}
      <div className="fixed inset-0 -z-10 bg-background" />

      {/* Main Content */}
      <div className="relative z-10">
        <Hero />
        <StatsSection />
        <ServicesSection />
        <FeaturedWork />
        <ProcessSection />
        <SkillsHighlight />
      </div>
    </div>
  )
}
