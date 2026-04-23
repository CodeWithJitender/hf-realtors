"use client";

import React from 'react';
import Image from 'next/image';

export default function PropertyGrid() {
  const properties = [
    { title: "M3M BUILDER", hoverText: "JACOB & CO. RESIDENCES", img: "/images/master-landing-page/sixth-sec-item-1.jpg" },
    { title: "M3M BUILDER", hoverText: "JEWEL CREST", img: "/images/master-landing-page/sixth-sec-item-2.jpg" },
    { title: "ATS BUILDER", hoverText: "KNIGHTSBRIDGE", img: "/images/master-landing-page/sixth-sec-item-3.jpg" },
    { title: "SOBHA BUILDER", hoverText: "RIVANA", img: "/images/master-landing-page/sixth-sec-item-4.jpg" },
    { title: "GAURSON", hoverText: "GAUR CHRYSALIS 2.0", img: "/images/master-landing-page/sixth-sec-item-5.jpg" },
    { title: "GAURSON", hoverText: "GAUR BENTO SUITES", img: "/images/master-landing-page/sixth-sec-item-6.jpg" },
    { title: "ELDECO GROUP", hoverText: "ELDECO 7 PEAKS", img: "/images/master-landing-page/sixth-sec-item-7.jpg" },
    { title: "TRIBECA", hoverText: "ICONIC TOWER", img: "/images/master-landing-page/sixth-sec-item-8.jpg" }
  ];

  return (
    <section className="w-full py-16 lg:py-28 bg-[#161F48] px-4 lg:px-16 text-center border-t border-[#E8C96A]/10">
      <div className="max-w-6xl mx-auto">
        
        <h2 
          className="font-semibold mb-12 md:mb-16 bg-gradient-to-b from-[#E8C96A] to-[#B8913A] text-transparent bg-clip-text inline-block"
          style={{ 
            fontFamily: "'Poppins', sans-serif", 
            fontSize: "clamp(28px, 6vw, 48px)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: "1.2"
          }}
        >
          Access to premium<br className="hidden md:block" />
          developments across NCR
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-8 lg:gap-10">
          {properties.map((prop, i) => (
            <div 
              key={i} 
              className="relative rounded-2xl overflow-hidden group aspect-[4/5] shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-transparent hover:border-[#E8C96A]/30 transition-all duration-300"
            >
              {/* Background Image */}
              <Image 
                src={prop.img} 
                alt={prop.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
              />
              
              {/* Text Container */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 flex flex-col items-center justify-end text-center h-[60px] md:h-[80px]">
                
                {/* Default Title - smoothly fades out and scaled to prevent harsh jumps */}
                <h3 className="absolute bottom-4 md:bottom-6 w-full text-white font-bold text-[12px] sm:text-[14px] md:text-lg tracking-wide uppercase px-2 md:px-4 transition-all duration-300 ease-out transform group-hover:opacity-0 group-hover:scale-95 group-hover:-translate-y-1 drop-shadow-md">
                  {prop.title}
                </h3>

                {/* Hover Content - scales up and fades in cleanly */}
                <div className="absolute bottom-4 md:bottom-6 w-full opacity-0 translate-y-2 scale-95 transition-all duration-300 ease-out transform group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 px-2 md:px-4">
                  <h4 className="text-white font-bold text-[11px] sm:text-[13px] md:text-base tracking-wider leading-snug drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                    {prop.hoverText}
                  </h4>
                </div>

              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
