import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Tools from "@/components/sections/Tools";
import Publications from "@/components/sections/Publications";
import Contact from "@/components/sections/Contact";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Tools />
        <Publications />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
