import { McLarenHero } from "@/components/McLarenHero";
import { ModelsSection } from "@/components/ModelsSection";
import { SpecsSection } from "@/components/SpecsSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black min-h-screen overflow-x-hidden" suppressHydrationWarning>
      <McLarenHero />
      <ModelsSection />
      <SpecsSection />
      <Footer />
    </main>
  );
}
