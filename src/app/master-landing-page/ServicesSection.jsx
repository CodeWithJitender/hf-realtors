"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

export default function ServicesSection() {
  const scrollContainerRef = useRef(null);

  const services = [
    {
      title: "Luxury & Premium Residences",
      desc: "High-quality homes in established and upcoming sectors.",
      img: "/images/master-landing-page/third-sec-slider-1.jpg",
    },
    {
      title: "Investment & Returns Opportunities",
      desc: "Lucrative returns in high-growth commercial & residential ventures.",
      img: "/images/master-landing-page/third-sec-slider-2.jpg",
    },
    {
      title: "Commercial Spaces",
      desc: "World-class retail and office spaces setting new business benchmarks.",
      img: "/images/master-landing-page/third-sec-slider-3.jpg",
    },
    {
      title: "Exclusive Landscapes",
      desc: "Premium plots and land parcels for bespoke development.",
      img: "/images/master-landing-page/third-sec-slider-4.jpg",
    }
  ];

  // Duplicate services to create an infinite scroll illusion
  const extendedServices = [...services, ...services];

  // Auto-slide effect every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const firstChild = container.children[0];
        if (!firstChild) return;

        const itemWidth = firstChild.clientWidth + 24; // width + gap-6 (24px)
        
        // If we have scrolled to or past the cloned set
        if (container.scrollLeft >= itemWidth * services.length - 10) {
          // Instantly jump back to the exact same visual position at the start
          container.scrollTo({ left: 0, behavior: 'auto' });
          
          // Wait a tiny bit for the browser to render the jump, then scroll smoothly to the next
          setTimeout(() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
            }
          }, 50);
        } else {
          // Slide smoothly to the next item
          container.scrollBy({ left: itemWidth, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <section className="w-full py-16 md:py-24 bg-[#161F48] px-6 lg:pl-16 lg:pr-10 overflow-hidden relative">
      <div className="flex flex-col lg:flex-row items-center gap-12 max-w-[1920px] mx-auto w-full">
        
        {/* Left Typography Block */}
        <div className="w-full lg:w-[35%] relative pl-2 lg:pl-10">
           <div className="border-[1.5px] border-[#E8C96A]/30 border-r-0 rounded-l-[2rem] p-6 lg:p-16 relative">
              <h2 
                className="font-semibold leading-[1.3] relative z-10 bg-gradient-to-b from-[#E8C96A] to-[#B8913A] text-transparent bg-clip-text inline-block" 
                style={{ 
                  fontFamily: "'Poppins', sans-serif", 
                  fontSize: "clamp(28px, 6vw, 60px)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Homes. <br />
                Offices. <br />
                Investments. <br />
                All in One.
              </h2>
           </div>
        </div>

        {/* Right Slider Block */}
        <div 
          ref={scrollContainerRef}
          className="w-full lg:w-[65%] flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
           {/* Webkit scrollbar hiding hack */}
           <style jsx>{`
             div::-webkit-scrollbar {
               display: none;
             }
           `}</style>
           
           {extendedServices.map((svc, idx) => (
             <div 
               key={idx} 
               className="snap-center shrink-0 w-full h-[380px] md:h-[450px] lg:h-[600px] relative overflow-hidden group"
             >
                <Image 
                  src={svc.img} 
                  alt={svc.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#161F48]/95 via-[#161F48]/30 to-transparent"></div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 p-6 lg:p-12 w-full">
                  <h3 className="text-[22px] md:text-3xl font-bold text-white mb-3 tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {svc.title}
                  </h3>
                  <div className="w-12 h-[2px] bg-[#E8C96A] mb-4"></div>
                  <p className="text-[#D9D9D9] text-[13px] md:text-lg leading-relaxed font-light">
                    {svc.desc}
                  </p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
