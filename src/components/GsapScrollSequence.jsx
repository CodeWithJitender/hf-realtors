"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GsapScrollSequence() {
  const triggerRef = useRef(null);
  const containerRef = useRef(null);

  // Elements to animate
  const imagesRef = useRef([]);
  const finalContainerRef = useRef(null);
  const textRef = useRef(null);

  // Use same high-res images, but now they all sit in the exact center and expand to full container size
  const images = [
    { src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800", classes: "inset-0 w-full h-full" },
    { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800", classes: "inset-0 w-full h-full" },
    { src: "https://images.unsplash.com/photo-1600607687931-cebf10cb4cb0?auto=format&fit=crop&q=80&w=800", classes: "inset-0 w-full h-full" },
    { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800", classes: "inset-0 w-full h-full" },
    { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800", classes: "inset-0 w-full h-full" }
  ];

  useGSAP(() => {
    if (typeof window === "undefined") return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current, // Use the outer wrapper as the trigger
        start: "top top",
        end: "+=3000", // Shortened scroll distance due to faster timings
        scrub: 1, // Smooth scrolling
        pin: containerRef.current, // Pin the inner container
        anticipatePin: 1,
        pinSpacing: true // Ensure whitespace is added to allow scrolling
      }
    });

    // Reset initial states
    gsap.set(imagesRef.current, { scale: 0, opacity: 1 });
    gsap.set(finalContainerRef.current, { scale: 0, backgroundColor: "#0A1628" });
    gsap.set(textRef.current, { opacity: 0, y: 30 });

    // --- PHASE 1: The Gallery (Overlapping Fast Zoom) ---
    // Images zoom sequentially out of each other using scale for true physical nested scaling
    // Timings are minimized to create a rapid "sync" effect as requested.
    tl.addLabel("gallery")
      .to(imagesRef.current[0], { scale: 1, ease: "power2.inOut", duration: 1.2 }, "gallery")
      .to(imagesRef.current[1], { scale: 1, ease: "power2.inOut", duration: 1.2 }, "gallery+=0.2")
      .to(imagesRef.current[2], { scale: 1, ease: "power2.inOut", duration: 1.2 }, "gallery+=0.4")
      .to(imagesRef.current[3], { scale: 1, ease: "power2.inOut", duration: 1.2 }, "gallery+=0.6")
      .to(imagesRef.current[4], { scale: 1, ease: "power2.inOut", duration: 1.2 }, "gallery+=0.6")

      // Pause to let user observe the final image
      .to({}, { duration: 0.5 })

      // --- PHASE 2: The Text Reveal ---
      // The final container zooms up as a solid block right on the heels of the images
      .addLabel("textZoom", "-=0.2")
      .to(finalContainerRef.current, { scale: 1, ease: "power3.inOut", duration: 1.2 }, "textZoom")
      // Fade in text quickly
      .to(textRef.current, { opacity: 1, y: 0, ease: "power2.out", duration: 0.8 }, "textZoom+=0.6")

      // Keep it pinned for a moment to let the user read before unpinning
      .to({}, { duration: 1.5 });

  }, { scope: triggerRef });

  return (
    // -mt-[100vh] combined with relative z-50 forces this container to physically overlay the previous 100vh section (the Hero section).
    <div ref={triggerRef} className="w-full relative -mt-[100vh] z-50 pointer-events-none">
      <section ref={containerRef} className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center pointer-events-none" style={{ willChange: "transform" }}>

        {/* Gallery Images Container (Overlaying the Hero section transparently until scaled) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {images.map((img, i) => (
            <div
              key={i}
              ref={(el) => { if (el) imagesRef.current[i] = el; }}
              // absolute inset-0 sets width and height to 100% naturally. Scale will visually shrink it.
              className={`absolute inset-0 shadow-2xl overflow-hidden origin-center grayscale-[20%] contrast-110`}
            >
              <Image
                src={img.src}
                alt={`Gallery image ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* 
        Phase 3 Text Overlay Container.
        Instead of splitting, this just sits on top and fades in a dark tint to ensure text readability.
      */}
        <div
          ref={finalContainerRef}
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
        >
          <div
            ref={textRef}
            className="flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto z-40"
          >
            <h2
              className="text-[#E8C96A] leading-[1.1] font-bold uppercase tracking-tighter mb-8"
              style={{ fontSize: "var(--text-fluid-h2)", fontFamily: 'var(--font-display)' }}
            >
              Building and Managing Real Estate Value
            </h2>
            <p className="'Helvetica Neue', Helvetica, Arial, sans-serif text-sm md:text-base lg:text-lg max-w-2xl leading-relaxed font-medium mb-4" style={{ color: "#7A8FAB", fontFamily: "var(--font-body)" }}>
              HF Realtors is an independent real estate advisory firm focused on helping clients build, manage, and optimize property investments with clarity and confidence.
            </p>
            <p className="'Helvetica Neue', Helvetica, Arial, sans-serif text-sm md:text-base lg:text-lg max-w-2xl leading-relaxed font-medium mb-4" style={{ color: "#7A8FAB", fontFamily: "var(--font-body)" }}>
              We work closely with individuals and investors to identify opportunities in residential and commercial real estate, ensuring every decision is guided by market insight, transparency, and long-term value creation.
            </p>
            <p className="'Helvetica Neue', Helvetica, Arial, sans-serif text-sm md:text-base lg:text-lg max-w-2xl leading-relaxed font-medium" style={{ color: "#7A8FAB", fontFamily: "var(--font-body)" }}>
              As the market evolves, we continue to refine our approach, delivering thoughtful advisory and sustainable outcomes for every client we serve.
            </p>
          </div>
        </div>

      </section>
    </div>
  );
}
