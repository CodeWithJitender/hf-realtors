import Hero from "@/components/Hero";
import WhyHFRealtors from "@/components/WhyHFRealtors";
import HowWeWork from "@/components/HowWeWork";
import SequentialRevealCategories from "@/components/SequentialRevealCategories";
import UniqueAdvantage from "@/components/UniqueAdvantage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-slate-900 selection:text-white">
      <Header />

      <Hero />
      <WhyHFRealtors />
      <HowWeWork />
      <SequentialRevealCategories />
      <UniqueAdvantage />

      <Footer />
    </main>
  );
}
