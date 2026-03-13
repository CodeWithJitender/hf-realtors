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
    <main className="flex flex-col min-h-screen bg-[#163548] text-[#EDEDED] font-sans selection:bg-[#CCA14D] selection:text-[#163548]">

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

      {/* 
        Section 3: The 'Gooey' Call to Action
        A cinematic conclusion prompting user interaction
      */}
      <section className="relative w-full min-h-[50vh] flex flex-col items-center justify-center py-24 px-8 md:px-12 lg:px-24 bg-[#163548] overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#CCA14D] opacity-5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          <h2
            className="text-[2.5rem] sm:text-[4rem] lg:text-[5rem] tracking-tighter leading-[1] text-[#CCA14D] mb-8 uppercase"
            style={{ fontFamily: 'var(--font-futura), Futura, sans-serif', fontWeight: 'bold' }}
          >
            Ready To Transform <br /> Your Space?
          </h2>
          <p className="font-sans text-[#EDEDED] text-base lg:text-lg max-w-2xl leading-relaxed mb-12 font-light tracking-wide opacity-90">
            Connect with our master designers and advisory team to begin shaping your generational legacy.
          </p>

          <Button href="/contact-us" className="px-12 py-4">
            Let's Connect
          </Button>
        </div>
      </section>

    </main>
  );
}
