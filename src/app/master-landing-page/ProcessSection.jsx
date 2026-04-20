"use client";

import React from 'react';

export default function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Discovery & Strategy",
      desc: "We start by deeply understanding your portfolio goals, budget, and lifestyle requirements to curate the perfect real estate strategy."
    },
    {
      num: "02",
      title: "Market Mapping",
      desc: "Our research team maps out the finest properties and projects that align with your vision, ensuring no opportunity is missed."
    },
    {
      num: "03",
      title: "Evaluation & Structuring",
      desc: "We conduct rigorous due diligence, offering financial modeling, ROI evaluation, and strategic deal negotiation."
    },
    {
      num: "04",
      title: "Seamless Execution",
      desc: "From paperwork to possession, our concierge team handles all formalities to ensure a frictionless transaction."
    }
  ];

  return (
    <section className="w-full py-24 bg-[#293568] px-6 lg:px-16 border-t border-[#E8C96A]/10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left Text Box */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          <h2 
            className="font-semibold leading-tight bg-gradient-to-b from-[#E8C96A] to-[#B8913A] text-transparent bg-clip-text"
            style={{ 
              fontFamily: "'Poppins', sans-serif", 
              fontSize: "clamp(28px, 4vw, 36px)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Our Concierge <br />Approach
          </h2>
          <p className="text-[#D9D9D9] text-lg font-light leading-relaxed">
            We don't just sell real estate; we manage your wealth through strategic investments. Our process is transparent, rigorous, and entirely client-centric.
          </p>
        </div>

        {/* Right Process Map */}
        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8 relative">
          {/* subtle connecting line in bg for desktop */}
          <div className="hidden sm:block absolute top-[50%] left-0 w-full h-[1px] bg-[#E8C96A]/10 -translate-y-1/2 z-0"></div>
          <div className="hidden sm:block absolute top-0 left-[50%] w-[1px] h-full bg-[#E8C96A]/10 -translate-x-1/2 z-0"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 bg-white/5 p-8 rounded-xl border border-[#E8C96A]/10 hover:border-[#E8C96A]/40 transition-colors shadow-lg">
              <span className="text-4xl font-bold text-[#E8C96A]/20 absolute top-6 right-6 select-none">{step.num}</span>
              <h4 className="text-xl font-bold text-white mb-3 mt-4">{step.title}</h4>
              <p className="text-[#D9D9D9] text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
