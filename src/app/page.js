import Hero from "@/components/Hero";
import AboutUsSticky from "@/components/AboutUsSticky";
import SplitReveal from "@/components/SplitReveal";
import SequentialRevealCategories from "@/components/SequentialRevealCategories";
import UniqueAdvantage from "@/components/UniqueAdvantage";
import VerticalRailSection from "@/components/VerticalRailSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-slate-900 selection:text-white">
      <Header />

      <Hero />
      <SplitReveal />
      <AboutUsSticky />
      <SequentialRevealCategories />
      <UniqueAdvantage />
      <VerticalRailSection />

      <Footer />
    </main>
  );
}
