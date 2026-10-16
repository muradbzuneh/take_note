import { HeroHeader } from "@/components/hero-section-6-header";
import HeroSection from "@/components/hero-section-8";
import { Features } from "@/components/feature";
import  CallToAction from "@/components/call-to-action-1"
import Footer from "@/components/footer"
export default function Home() {
  return (
    <div>
      <main>
        <HeroHeader />
        <HeroSection />
        <Features />
        <CallToAction />
        <Footer />
      </main>
    </div>
  );
}
