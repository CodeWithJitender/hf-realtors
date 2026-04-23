"use client";

import React from 'react';
import Image from 'next/image';

export default function SiteFooter() {
  return (
    <footer className="relative w-full bg-[#161F48] overflow-hidden pb-12">

       {/* GIANT BACKGROUND TEXT (realtors) */}
       <div className="absolute bottom-0 inset-x-0 w-full flex justify-center overflow-hidden pointer-events-none z-0">
          <span 
            className="text-[18vw] font-bold leading-[0.8] tracking-[0.1em] lowercase whitespace-nowrap select-none bg-gradient-to-b from-[#E8C96A] to-transparent text-transparent bg-clip-text opacity-15"
            style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            realtors
          </span>
       </div>

       {/* TOP SECTION: Heading and Skyline Background */}
       <div className="w-full relative flex items-center justify-center pt-20 pb-12 z-20 overflow-visible">
         {/* Background Skyline Image confined to this section */}
         <div 
           className="absolute inset-x-0 bottom-0 w-full h-[250%] pointer-events-none z-0"
           style={{
             backgroundImage: "url('/images/master-landing-page/footer-bg.png')",
             backgroundSize: "contain",
             backgroundPosition: "bottom center",
             backgroundRepeat: "no-repeat",
             opacity: 1
           }}
         ></div>

         {/* The Text */}
         <div className="relative z-20 max-w-6xl w-full px-6 flex justify-center">
            <h2 
              className="text-3xl md:text-[40px] font-light tracking-wide text-center leading-[1.5] md:leading-tight relative w-full"
              style={{ fontFamily: "'Poppins', sans-serif", color: "#7C8BD2" }}
            >
               Your journey to the right property begins w<span className="text-[#161F48] font-normal relative z-10 whitespace-nowrap">
                  ith us
                  {/* Floating Gold Element EXACTLY intersecting text without massive blur */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-28 sm:h-28 md:w-[140px] md:h-[140px] rounded-full bg-[#DCA43B] opacity-90 -z-10 mt-1"></div>
               </span>
            </h2>
         </div>
       </div>



       {/* BOTTOM SECTION: 4 Columns Grid */}
       <div className="relative z-20 max-w-[1400px] mx-auto px-6 lg:px-16 pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 w-full">
            
            {/* Col 1: Logo */}
            <div className="flex flex-col items-center sm:items-start justify-start">
               <div className="relative w-56 h-20 md:w-72 md:h-24">
                 <Image src="/images/logo.png" alt="Head Field Realtors" fill className="object-contain sm:object-left" priority />
               </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="flex flex-col gap-3 text-[#D9D9D9] text-base md:text-lg font-light items-center sm:items-start pt-1">
               <a href="#" className="hover:text-[#E8C96A] transition-colors w-max tracking-wide">Home</a>
               <a href="#" className="hover:text-[#E8C96A] transition-colors w-max tracking-wide">About Head Field</a>
               <a href="#" className="hover:text-[#E8C96A] transition-colors w-max tracking-wide">Our Expertise</a>
               <a href="#" className="hover:text-[#E8C96A] transition-colors w-max tracking-wide">Our Approach</a>
               <a href="#" className="hover:text-[#E8C96A] transition-colors w-max tracking-wide">Contact</a>
            </div>

            {/* Col 3: Social Media SVGs */}
            <div className="flex gap-5 items-start justify-center sm:justify-start pt-1">
               {/* Instagram (border icon) */}
               <a aria-label="Instagram" href="#" className="flex items-center justify-center text-[#E8C96A] hover:opacity-75 transition-opacity">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
               </a>
               {/* LinkedIn (Icon filled text) */}
               <a aria-label="LinkedIn" href="#" className="flex items-center justify-center text-[#E8C96A] hover:opacity-75 transition-opacity">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.475-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
               </a>
               {/* YouTube (filled icon) */}
               <a aria-label="YouTube" href="#" className="flex items-center justify-center text-[#E8C96A] hover:opacity-75 transition-opacity">
                  <svg width="38" height="38" viewBox="0 0 24 24" fill="currentColor"><path d="M21.582 6.186a2.632 2.632 0 0 0-1.85-1.879C18.093 3.882 12 3.882 12 3.882s-6.093 0-7.732.425a2.632 2.632 0 0 0-1.85 1.879C2 7.854 2 12 2 12s0 4.146.418 5.814a2.632 2.632 0 0 0 1.85 1.879C5.907 20.118 12 20.118 12 20.118s6.093 0 7.732-.425a2.632 2.632 0 0 0 1.85-1.879C22 16.146 22 12 22 12s0-4.146-.418-5.814zM10.007 15.116V8.884L15.345 12l-5.338 3.116z"/></svg>
               </a>
            </div>

            {/* Col 4: Contact Pills */}
            <div className="flex flex-col gap-5 items-center sm:items-start lg:items-end w-full pt-1">
               {/* Mail Pill */}
               <a href="mailto:ankit@hfrealtors.com" className="w-[90%] sm:w-min px-6 py-3.5 rounded-[2rem] border border-[#E8C96A]/60 bg-[#161F48] text-[#D9D9D9] hover:bg-[#E8C96A] hover:text-[#161F48] transition-colors text-base font-light tracking-wide flex items-center justify-center sm:justify-start gap-4">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                 <span className="whitespace-nowrap">ankit@hfrealtors.com</span>
               </a>

               {/* Phone Pill */}
               <a href="tel:9999991036" className="w-[90%] sm:w-min px-6 py-3.5 rounded-[2rem] border border-[#E8C96A]/60 bg-[#161F48] text-[#D9D9D9] hover:bg-[#E8C96A] hover:text-[#161F48] transition-colors text-base font-light tracking-wide flex items-center justify-center sm:justify-start gap-4">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                 </svg>
                 <span className="whitespace-nowrap">9999991036</span>
               </a>
            </div>

          </div>
       </div>

    </footer>
  );
}
