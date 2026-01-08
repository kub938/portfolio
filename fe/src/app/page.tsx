import AboutSection from "@/components/AboutSection/AboutSection";
import HeroSection from "@/components/HeroSection/HeroSection";
import Intro from "@/components/Intro/Intro";
import LeftNavigation from "@/components/LeftNavigation/LeftNavigation";
import ProjectSection from "@/components/ProjectsSection/ProjectsSection";
import ThemeToggleBtn from "@/components/ThemeToggleBtn/ThemeToggleBtn";

export default function Home() {
  return (
    <main className="main" style={{ position: "relative" }}>
      <Intro></Intro>
      <LeftNavigation />
      <HeroSection />
      <AboutSection />
      <ProjectSection />
    </main>
  );
}
