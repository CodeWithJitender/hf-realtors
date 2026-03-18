"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function ThankYouPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".ty-icon",    { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7 })
        .fromTo(".ty-heading", { y: 40,    opacity: 0 }, { y: 0,    opacity: 1, duration: 0.8 }, "-=0.3")
        .fromTo(".ty-body",    { y: 24,    opacity: 0 }, { y: 0,    opacity: 1, duration: 0.7 }, "-=0.4")
        .fromTo(".ty-cta",     { y: 16,    opacity: 0 }, { y: 0,    opacity: 1, duration: 0.6 }, "-=0.3");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#0A1628] px-6 py-24">
      <div
        ref={containerRef}
        className="flex flex-col items-center text-center max-w-xl w-full"
      >
        {/* Animated checkmark */}
        <div
          className="ty-icon w-20 h-20 rounded-full flex items-center justify-center mb-8 opacity-0"
          style={{
            background: "rgba(204,161,77,0.10)",
            border: "1.5px solid rgba(204,161,77,0.4)",
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E8C96A"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Heading */}
        <h1
          className="ty-heading uppercase tracking-tight leading-none text-[#EDEDED] mb-4 opacity-0"
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
          }}
        >
          Thank You
        </h1>

        {/* Gold divider */}
        <div className="w-12 h-px bg-[#E8C96A] mb-6" />

        {/* Body */}
        <p
          className="ty-body text-[#EDEDED]/65 leading-relaxed mb-10 opacity-0"
          style={{
            fontFamily: "var(--font-inter), 'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 500,
            fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
          }}
        >
          Your message has been received. A member of our team will be in touch
          with you shortly.
        </p>

        {/* CTA back home */}
        <Link
          href="/"
          className="ty-cta inline-flex items-center gap-2 text-[#E8C96A] uppercase tracking-widest text-xs font-semibold
                     border border-[#E8C96A]/40 rounded-full px-8 py-4 hover:bg-[#E8C96A] hover:text-[#0A1628]
                     transition-all duration-300 opacity-0"
          style={{ fontFamily: "var(--font-inter), 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
