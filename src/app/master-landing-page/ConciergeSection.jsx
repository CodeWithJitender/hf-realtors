"use client";

import React from "react";
import Image from "next/image";

export default function ConciergeSection() {
  return (
    <section className="relative w-full py-16 lg:py-32 bg-[#161F48] overflow-hidden">
      {/* Background for Desktop */}
      <div 
        className="hidden lg:block absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/master-landing-page/fourth-sec-bg-with-right.png')",
          backgroundSize: "cover",
          backgroundPosition: "top right",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Background for Mobile/Tablet */}
      <div 
        className="block lg:hidden absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/master-landing-page/fourth-sec-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12">
        
        {/* First Column: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left">
          <h2 
            className="text-[32px] sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.15] bg-gradient-to-b from-[#E8C96A] to-[#B8913A] text-transparent bg-clip-text"
            style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            A concierge<br />
            approach to<br />
            real estate
          </h2>
          
          <p className="text-sm md:text-base lg:text-lg text-white font-light italic mt-8 leading-relaxed">
            Every recommendation starts with your<br className="hidden md:block" /> requirement, not inventory.
          </p>

          <div className="mt-8 flex flex-col items-center lg:items-start">
            <p className="text-white mb-4 text-sm md:text-base">You get:</p>
            <ul className="space-y-3 text-left inline-block">
              {[
                "Clear understanding of your intent",
                "Options filtered across locations",
                "Insights on pricing, future supply, and risks",
                "Support through negotiation and closure"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start text-white text-sm md:text-base font-light">
                  <span className="text-[#E8C96A] mr-3 mt-1 flex-shrink-0 text-xl leading-none">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Second Column: Image (Visible on mobile/tablet, hidden on desktop since it's in the BG) */}
        <div className="flex lg:hidden w-full justify-center mt-12 md:mt-16">
          <div className="relative w-full max-w-[400px] md:max-w-[500px] aspect-[4/5]">
            <Image 
              src="/images/master-landing-page/fourth-sec-right.png" 
              alt="Concierge Approach to Real Estate" 
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
