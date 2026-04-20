"use client";

import React from 'react';
import Link from 'next/link';

export default function LandingFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#293568] py-12 px-6 lg:px-16 border-t border-[#E8C96A]/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-2xl font-bold text-[#E8C96A] tracking-tighter">
          HF<span className="text-white font-light"> REALTORS</span>
        </div>

        <p className="text-[#D9D9D9] text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} HF Realtors. All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-[#D9D9D9] text-sm">
          <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <button onClick={scrollToTop} className="text-[#E8C96A] hover:text-white bg-transparent border-none cursor-pointer font-bold transition-colors">
            Back to Top &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
}
