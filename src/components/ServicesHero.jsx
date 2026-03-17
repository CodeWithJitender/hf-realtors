"use client";

import React from 'react';
import TextRotator from './TextRotator';
import Button from './Button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePreloader } from '@/context/PreloaderContext';

export default function ServicesHero() {
  const words = ["LEGACY", "PORTFOLIO", "WEALTH", "LIFESTYLE"];
  const { isPreloaderDone } = usePreloader();

  return (
    <div className="relative w-full min-h-screen flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 pt-32 pb-20 px-6 md:px-12 lg:px-24 z-10">

      {/* Left Column: Typography & CTA */}
      <div className="w-full lg:w-1/2 flex flex-col items-start justify-center">
        <h1
          className="text-[3rem] sm:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] tracking-tighter leading-[1.1] text-[#CCA14D] mb-6 uppercase flex flex-col items-start"
          style={{ fontFamily: 'var(--font-futura), Futura, sans-serif', fontWeight: 'bold' }}
        >
          <span className="block text-[#EDEDED]">ELEVATE YOUR</span>
          <TextRotator words={words} className="text-[#CCA14D] block mt-1" />
        </h1>

        <p className="font-sans text-lg md:text-xl max-w-xl leading-relaxed mb-10 font-light tracking-wide opacity-90 text-[#EDEDED]">
          From strategic wealth planning to finding the perfect property, our expert advisory team is dedicated to securing your generational legacy.
        </p>

        <Button variant="outlined" href="#all-services">
          Explore Services
        </Button>
      </div>

      {/* Right Column: Image */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative h-[400px] lg:h-auto lg:min-h-[600px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isPreloaderDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full h-full aspect-[16/9] lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(22,53,72,0.8)]"
        >
          <Image
            src="/images/management_dashboard.png"
            alt="Plan Your Schedule Dashboard"
            fill
            className="object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
            priority
          />

          {/* Subtle Decorative Gradient Overlay for blending */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#163548]/80 to-transparent pointer-events-none"></div>

          {/* Floating abstract graphic representing 3D/Wealth for visual flair */}
          <motion.div
            animate={{ y: [-5, 5, -5], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-8 top-1/4 w-32 h-32 border border-[#CCA14D]/30 rounded-3xl z-10 pointer-events-none"
            style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg) rotateZ(45deg)' }}
          />
          <motion.div
            animate={{ y: [5, -5, 5], rotate: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -left-12 bottom-1/4 w-40 h-40 border border-[#EDEDED]/20 rounded-full backdrop-blur-[2px] z-10 pointer-events-none bg-[#EDEDED]/5"
          />
        </motion.div>
      </div>
    </div>
  );
}
