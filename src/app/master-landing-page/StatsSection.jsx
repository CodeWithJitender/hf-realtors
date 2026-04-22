"use client";

import React from 'react';
import Image from 'next/image';

export default function StatsSection() {
  const stats = [
    { value: "4500+", label: "hours of property\nadvisory" },
    { value: "20+", label: "years of combined\nexpertise" },
    { value: "210+", label: "verified developments\nacross NCR" },
    { value: "25+", label: "active developer\npartnerships" }
  ];

  return (
    <section className="relative w-full pt-24 pb-48 bg-[#161F48] px-6 lg:px-16 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-8 justify-between items-start">
        
        {/* Left Column */}
        <div className="w-full lg:w-1/2 flex items-center pr-0 lg:pr-16">
          <h2 
            className="font-semibold leading-tight bg-gradient-to-b from-[#E8C96A] to-[#B8913A] text-transparent bg-clip-text"
            style={{ 
              fontFamily: "'Poppins', sans-serif", 
              fontSize: "clamp(40px, 5vw, 64px)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Beyond{' '}
            <span className="inline-block relative w-[200px] md:w-[250px] h-[50px] md:h-[65px] align-middle -translate-y-2 mx-1">
              <Image 
                src="/images/master-landing-page/second-section-icon.png" 
                alt="Person reaching star" 
                fill 
                className="object-contain object-left" 
              />
            </span>
            <br />
            brokerage. <br />
            Built on market <br />
            intelligence.
          </h2>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-x-12 gap-y-16 pt-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <h3 className="text-4xl md:text-[44px] font-bold text-white mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {stat.value}
              </h3>
              <div className="w-[85%] h-[2px] bg-[#E8C96A] mb-4"></div>
              <p className="text-[#D9D9D9] text-base md:text-[17px] italic font-light whitespace-pre-line leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom Image (Skyline) */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none opacity-80 flex items-end">
         <img 
           src="/images/master-landing-page/second-sec-bottom-img.png" 
           alt="Skyline Overlay" 
           className="w-full h-auto" 
         />
      </div>
    </section>
  );
}
