import { HeroSection } from "@/sections/hero";
import { ScrollProgress } from "@/components/studio-motion";
import {
  AboutSection,
  ContactSection,
  FaqSection,
  ProcessSection,
  SolutionsSection,
  RealProjectSection,
  VertexProjectSection,
  TextMarquee,
} from "@/sections/commercial-home";

export default function Home() {
  return (
    <main id="main-content" className="studio-home">
      <ScrollProgress />
      <HeroSection />
      <VertexProjectSection />
      <RealProjectSection />
      <TextMarquee />
      <SolutionsSection />
      <AboutSection />
      <ProcessSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
