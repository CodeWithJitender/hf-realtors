import AboutUsHero from "@/components/AboutUsHero";
import GsapScrollSequence from "@/components/GsapScrollSequence";
import VisionMission from "@/components/VisionMission";
import ScrollNarrative from "@/components/ScrollNarrative";
import WhatMakesUsDifferent from "@/components/WhatMakesUsDifferent";
import Button from "@/components/Button";

export const metadata = {
  title: 'About Us | HF Realtors',
  description: 'Transform A Space for Work, Into A Space for Life. Discover the foundation and team behind HF Realtors.',
};

export default function AboutUsPage() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0A1628] text-[#EDEDED] 'Helvetica Neue', Helvetica, Arial, sans-serif selection:bg-[#E8C96A] selection:text-[#0A1628]">

      {/* 
        HERO + GSAP Overlay Wrapper 
        This keeps the Hero sticky so it acts as a static background 
        while the GSAP sequence pins and does its overlap animation.
      */}
      <div className="relative w-full">
        {/* The Hero stays sticky at the top while we scroll through the GSAP sequence */}
        <div className="sticky top-0 w-full h-screen z-0 overflow-hidden">
          <AboutUsHero />
        </div>

        {/* 
          Section 1.5: GSAP Pinned Scroll Sequence (Nested Zoom Gallery -> Text Overlay).
          It has -mt-[100vh] internally so it sits perfectly over the sticky Hero.
        */}
        <GsapScrollSequence />
      </div>

      {/* Scroll Narrative: 100vh pinned scrub section with sequential text reveal */}
      {/* <ScrollNarrative /> */}

      {/* What Makes Us Different: pinned 3D heading + horizontal cards */}
      <WhatMakesUsDifferent />

      {/* Vision & Mission Cards */}
      <VisionMission />


    </main>
  );
}
