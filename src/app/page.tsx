import { AboutSection } from "@/sections/about";
import { ClientsSection } from "@/sections/clients";
import { ContactSection } from "@/sections/contact";
import { EducationSection } from "@/sections/education";
import { FeaturedWorkSection } from "@/sections/featured-work";
import { HeroSection } from "@/sections/hero";
import { InvestmentSection } from "@/sections/investment";
import { ProcessSection } from "@/sections/process";
import { ServicesSection } from "@/sections/services";
import { TestimonialsSection } from "@/sections/testimonials";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedWorkSection />
      <AboutSection />
      <EducationSection />
      <ServicesSection />
      <InvestmentSection />
      <ProcessSection />
      <ClientsSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
