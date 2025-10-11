import HeroSection from "@/components/HeroSection/HeroSection";
import Intro from "@/components/Intro/Intro";
import ProjectSection from "@/components/ProjectsSection/ProjectsSection";

export default function Home() {
  return (
    <main className="main" style={{ position: "relative" }}>
      <Intro></Intro>
      <HeroSection></HeroSection>
      <ProjectSection></ProjectSection>
    </main>
  );
}
