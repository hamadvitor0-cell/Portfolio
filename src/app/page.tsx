import { HeroSection } from "@/sections/hero";
import { ScrollProgress } from "@/components/studio-motion";
import {
  AboutSection,
  ContactSection,
  FaqSection,
  ProcessSection,
  SolutionsSection,
  RealProjectSection,
  TextMarquee,
} from "@/sections/commercial-home";

export default function Home() {
  return (
    <main id="main-content" className="studio-home">
      <ScrollProgress />
      <HeroSection />
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
