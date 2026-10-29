import Hero from "@/components/Hero";
import PropertyGrid from "@/components/PropertyGrid";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <PropertyGrid />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
