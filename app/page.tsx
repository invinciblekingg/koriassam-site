import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Marquee } from "@/components/marquee";
import { MenuSection } from "@/components/menu-section";
import { Experience } from "@/components/experience";
import { Reservations } from "@/components/reservations";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <main className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <About />
        <Marquee />
        <MenuSection />
        <Experience />
        <Reservations />
        <Footer />
      </main>
    </>
  );
}
