import { HeroSection } from '@/components/sections/hero'
import { AboutSection } from '@/components/sections/about'
import { PageWrapper } from '@/components/page-wrapper'

export default function Home() {
  return (
    <>
      <HeroSection />
      <PageWrapper>
        <AboutSection />
        <section id="projects" />
        <section id="experience" />
        <section id="skills" />
        <section id="contact" />
      </PageWrapper>
    </>
  )
}
