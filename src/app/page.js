import Hero from "@/components/Hero";
import SquareImageExpand from "@/components/SquareImageExpand";
import SplitReveal from "@/components/SplitReveal";
import SequentialRevealCategories from "@/components/SequentialRevealCategories";
import UniqueAdvantage from "@/components/UniqueAdvantage";
import VerticalRailSection from "@/components/VerticalRailSection";
import AgencyOffice from "@/components/AgencyOffice";
import FinalTextSection from "@/components/FinalTextSection";

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-slate-900 selection:text-white">
      <Hero />
      <SquareImageExpand />
      <SplitReveal />
      <SequentialRevealCategories />
      <UniqueAdvantage />
      <VerticalRailSection />
      <AgencyOffice />
      <FinalTextSection />
    </main>
  );
}

