import { HeroSection } from '@/components/sections/hero'
import { PageWrapper } from '@/components/page-wrapper'

export default function Home() {
  return (
    <>
      <HeroSection />
      <PageWrapper>
        <section id="about" />
        <section id="projects" />
        <section id="experience" />
        <section id="skills" />
        <section id="contact" />
      </PageWrapper>
    </>
  )
}
