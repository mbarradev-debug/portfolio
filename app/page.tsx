import { HeroSection } from '@/components/sections/hero'
import { AboutSection } from '@/components/sections/about'
import { ProjectsSection } from '@/components/sections/projects'
import { PageWrapper } from '@/components/page-wrapper'

export default function Home() {
  return (
    <>
      <HeroSection />
      <PageWrapper>
        <AboutSection />
        <ProjectsSection />
        <section id="experience" />
        <section id="skills" />
        <section id="contact" />
      </PageWrapper>
    </>
  )
}
