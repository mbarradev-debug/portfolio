import { HeroSection } from '@/components/sections/hero'
import { AboutSection } from '@/components/sections/about'
import { ProjectsSection } from '@/components/sections/projects'
import { ExperienceSection } from '@/components/sections/experience'
import { PageWrapper } from '@/components/page-wrapper'

export default function Home() {
  return (
    <>
      <HeroSection />
      <PageWrapper>
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <section id="skills" />
        <section id="contact" />
      </PageWrapper>
    </>
  )
}
