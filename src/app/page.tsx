import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import HorizontalScroll from "@/components/HorizontalScroll";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <About />

      <HorizontalScroll />
            <Skills />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
