import { HeroSection } from "@/sections/hero";
import {
  AboutSection,
  ContactSection,
  FaqSection,
  ProjectsSection,
  ProcessSection,
  SolutionsSection,
} from "@/sections/commercial-home";

export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
      <ProjectsSection />
      <SolutionsSection />
      <ProcessSection />
      <AboutSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
