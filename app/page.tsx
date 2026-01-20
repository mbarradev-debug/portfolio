import {
  Hero,
  Philosophy,
  Experience,
  FeaturedProjects,
  TechnicalInventory,
  Education,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Experience />
      <FeaturedProjects />
      <TechnicalInventory />
      <Education />
    </>
  );
}
