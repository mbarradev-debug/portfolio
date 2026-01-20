import {
  Hero,
  Philosophy,
  Experience,
  FeaturedProjects,
  TechnicalInventory,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Experience />
      <FeaturedProjects />
      <TechnicalInventory />
    </>
  );
}
