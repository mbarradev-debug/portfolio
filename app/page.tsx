import { HeroSection } from '@/components/sections/hero'
import { AboutSection } from '@/components/sections/about'
import { ProjectsSection } from '@/components/sections/projects'
import { ExperienceSection } from '@/components/sections/experience'
import { SkillsSection } from '@/components/sections/skills'
import { PageWrapper } from '@/components/page-wrapper'

export default function Home() {
  return (
    <>
      <HeroSection />
      <PageWrapper>
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <section id="contact" />
      </PageWrapper>
    </>
  )
}
