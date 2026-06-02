import { AudienceTabsSection } from "@/sections/audience-tabs";
import { FinalCtaSection } from "@/sections/final-cta";
import { HeroSection } from "@/sections/hero";
import { InvestmentSection } from "@/sections/investment";
import { ProcessSection } from "@/sections/process";
import { ResumeSection } from "@/sections/resume";
import { TechnicalBackstageSection } from "@/sections/technical-backstage";
import { WhyWorkSection } from "@/sections/why-work";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AudienceTabsSection />
      <ResumeSection />
      <WhyWorkSection />
      <TechnicalBackstageSection />
      <ProcessSection />
      <InvestmentSection />
      <FinalCtaSection />
    </main>
  );
}
