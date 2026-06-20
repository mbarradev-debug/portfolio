import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Education from '@/components/Education';

export default function Home() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-16 px-6 pt-12 pb-20">
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Education />
    </main>
  );
}
