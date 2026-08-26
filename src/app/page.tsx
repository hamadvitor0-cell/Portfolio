import { HeroSection } from "@/sections/hero";
import {
  AboutSection,
  ContactSection,
  FaqSection,
  InvestmentSection,
  MainCaseSection,
  OtherProjectSection,
  ProblemsSection,
  ProcessSection,
  SolutionsSection,
  TrustStrip,
} from "@/sections/commercial-home";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustStrip />
      <ProblemsSection />
      <MainCaseSection />
      <SolutionsSection />
      <OtherProjectSection />
      <ProcessSection />
      <AboutSection />
      <InvestmentSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
