import { AboutSection } from "@/sections/about";
import { ClientsSection } from "@/sections/clients";
import { ContactSection } from "@/sections/contact";
import { FeaturedWorkSection } from "@/sections/featured-work";
import { HeroSection } from "@/sections/hero";
import { PlaygroundSection } from "@/sections/playground";
import { ProcessSection } from "@/sections/process";
import { ServicesSection } from "@/sections/services";
import { TestimonialsSection } from "@/sections/testimonials";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedWorkSection />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <ClientsSection />
      <TestimonialsSection />
      <PlaygroundSection />
      <ContactSection />
    </main>
  );
}
