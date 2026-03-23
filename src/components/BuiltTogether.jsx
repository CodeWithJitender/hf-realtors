"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BuiltTogether() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const paragraphRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    // 1. Headline Parallax
    // Subtle movement independent of the scroll speed to give it weight
    gsap.to(headlineRef.current, {
      yPercent: 15, // Moves down slightly as user scrolls past
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // 2. Paragraph Reveal
    // Smooth, high-end float up and fade in
    gsap.from(paragraphRef.current, {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: paragraphRef.current,
        start: "top 85%", // Triggers when the top of the p hits 85% down the viewport
        once: true
      }
    });

    // 3. Image Container Expansion & Parallax
    const imgTl = gsap.timeline({
      scrollTrigger: {
        trigger: imageWrapperRef.current,
        start: "top 90%", // Trigger slightly before it comes fully into view
        end: "bottom 20%",
        scrub: true, 
      }
    });

    // The container physically scales up
    imgTl.fromTo(imageWrapperRef.current,
      { scale: 0.9, borderRadius: "2rem" },
      { scale: 1, borderRadius: "0rem", ease: "power1.inOut" }
    );
    
    // The image inside subtly pulls down for internal parallax
    gsap.to(imageRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: imageWrapperRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-[#F5F5F0] pt-24 pb-0 md:pt-32 lg:pt-40 flex flex-col items-center justify-center relative z-10 overflow-hidden">
      
      {/* Container for Text Section to maintain exact max widths */}
      <div className="max-w-[100rem] mx-auto w-full flex flex-col items-center text-center px-4">
        
        {/* Massive Headline with internal wrapper for clean parallax boundaries */}
        <div className="w-full pb-6 mb-8 md:mb-12 flex justify-center perspective-[1000px]">
            <h2 
              ref={headlineRef}
              className="text-[#1A1A1A] text-[13vw] leading-[0.85] w-full text-center uppercase tracking-tighter whitespace-nowrap will-change-transform"
              style={{ fontFamily: "\"Helvetica Neue\", Helvetica, Arial, sans-serif", fontWeight: '800' }}
            >
              Built Together
            </h2>
        </div>
        
        {/* The elegant serif paragraph */}
        <div className="px-4 mb-24 md:mb-32">
            <p 
              ref={paragraphRef}
              className="text-[#1A1A1A]/90 max-w-4xl leading-[1.4] font-serif tracking-normal will-change-transform" style={{ fontSize: "var(--text-fluid-h4)" }}
            >
              At HF Realtors, we build lasting partnerships based <br className="hidden md:block"/>
              on shared vision and sustainable growth. We're <br className="hidden md:block" />
              experts at luxury real estate, development and <br className="hidden md:block" />
              property management, with a track record of <br className="hidden md:block"/>
              delivering successful architectural masterpieces.
            </p>
        </div>
      </div>

      {/* 
        The Expanding Image Container 
        Starts smaller and scale: 1 as scrolled into view
      */}
      <div className="w-full px-4 md:px-8 mb-24 max-w-7xl mx-auto">
         <div 
            ref={imageWrapperRef}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden transform-gpu will-change-transform"
            style={{ borderRadius: '2rem' }} // Initial border radius, animated to 0
         >
           {/* Internal image that gets a separate parallax scrub to give depth */}
           <div 
             ref={imageRef}
             className="absolute -top-[20%] -bottom-[20%] -left-[5%] -right-[5%] w-[110%] h-[140%] will-change-transform"
           >
              <Image 
                // Replicating a high-end city architecture/interior shot
                src="https://images.unsplash.com/photo-1600607687931-cebf10cb4cb0?auto=format&fit=crop&q=80&w=1920"
                alt="Architectural Masterpiece"
                fill
                className="object-cover"
                priority={false}
              />
           </div>
         </div>
      </div>
      
    </section>
  );
}
