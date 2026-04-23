"use client";

import React from 'react';
import Image from 'next/image';

export default function LandingHeader() {
  return (
    <header className="w-full bg-[#161F48]/0 absolute top-0 left-0 z-50 pt-6 px-6 lg:px-16 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="relative w-40 h-16 md:w-56 md:h-20">
        <Image 
          src="/images/logo.png" 
          alt="HF Realtors Logo" 
          fill 
          className="object-contain object-left" 
          priority 
        />
      </div>

      {/* Right: Contact Pills */}
      <div className="flex items-center gap-4">
        {/* Email Pill */}
        <a 
          href="mailto:ankit@hfrealtors.com" 
          className="hidden md:flex items-center justify-center px-6 py-2.5 rounded-full bg-[#182046]/80 text-[#D9D9D9] text-sm hover:bg-[#182046] transition-colors gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8C96A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          ankit@hfrealtors.com
        </a>
        
        {/* Phone Pill */}
        <a 
          href="tel:9999991036" 
          className="flex items-center justify-center px-6 py-2.5 rounded-full bg-[#182046]/80 text-[#D9D9D9] text-sm hover:bg-[#182046] transition-colors gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8C96A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          9999991036
        </a>
      </div>
    </header>
  );
}
