"use client";

import React from 'react';
import Image from 'next/image';

export default function ServicesSection() {
  const services = [
    {
      title: "Residential Real Estate",
      desc: "From uber-luxury apartments to sprawling villas, find your dream home with our personalized end-to-end guidance.",
      img: "/images/master-landing-page/third-sec-slider-1.jpg",
    },
    {
      title: "Commercial & Retail",
      desc: "Strategic investments yielding high ROI. We map the best commercial zones and high-visibility retail outlets.",
      img: "/images/master-landing-page/third-sec-slider-2.jpg",
    }
  ];

  return (
    <section className="w-full py-24 bg-[#293568] px-6 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="text-center">
          <h2 
            className="font-semibold mb-4 bg-gradient-to-b from-[#E8C96A] to-[#B8913A] text-transparent bg-clip-text inline-block"
            style={{ 
              fontFamily: "'Poppins', sans-serif", 
              fontSize: "clamp(28px, 4vw, 36px)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Our Core Expertise
          </h2>
          <p className="text-[#D9D9D9] max-w-2xl mx-auto text-lg">
            We specialize in bespoke advisory across different verticals of premium real estate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((svc, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden shadow-2xl border border-transparent hover:border-[#E8C96A]/30 transition-all duration-500">
              <div className="w-full h-80 relative">
                <Image 
                  src={svc.img} 
                  alt={svc.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#293568] via-[#293568]/60 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-2xl font-bold text-[#E8C96A] mb-3">{svc.title}</h3>
                <p className="text-[#D9D9D9] leading-relaxed font-light">{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
