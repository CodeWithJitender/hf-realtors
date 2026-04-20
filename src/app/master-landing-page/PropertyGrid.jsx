"use client";

import React from 'react';
import Image from 'next/image';

export default function PropertyGrid() {
  const developers = [
    { name: "M3M", img: "/images/master-landing-page/logo-m3m.png" },
    { name: "Godrej", img: "/images/master-landing-page/logo-godrej.png" },
    { name: "DLF", img: "/images/master-landing-page/logo-dlf.png" },
    { name: "Emaar", img: "/images/master-landing-page/logo-emaar.png" },
    { name: "Conscient", img: "/images/master-landing-page/logo-conscient.png" },
    { name: "Aipl", img: "/images/master-landing-page/logo-aipl.png" }
  ];

  return (
    <section className="w-full py-20 bg-[#293568] px-6 lg:px-16 text-center">
      <div className="max-w-7xl mx-auto">
        <h2 
          className="font-semibold mb-10 bg-gradient-to-b from-[#E8C96A] to-[#B8913A] text-transparent bg-clip-text inline-block"
          style={{ 
            fontFamily: "'Poppins', sans-serif", 
            fontSize: "clamp(28px, 4vw, 36px)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Trusted Partner Network
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {developers.map((dev, i) => (
            <div key={i} className="bg-white/5 rounded-lg h-24 flex items-center justify-center p-6 border border-[#E8C96A]/5 hover:border-[#E8C96A]/30 transition-colors opacity-70 hover:opacity-100">
              {/* If images are not added yet, display text fallback safely */}
              <div className="relative w-full h-full flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                <span className="text-[#D9D9D9] font-bold text-lg tracking-widest">{dev.name}</span>
                {/* 
                  When actual logos are placed in images/, uncomment image tag:
                  <Image src={dev.img} alt={dev.name} fill className="object-contain" />
                */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
