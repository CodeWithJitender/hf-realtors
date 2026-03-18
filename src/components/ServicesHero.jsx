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
          className="text-[3rem] sm:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] tracking-tighter leading-[1.1] mb-6 uppercase flex flex-col items-start"
          style={{ fontFamily: 'var(--font-display)', fontWeight: '700' }}
        >
          <span className="block text-[#FFFFFF]">ELEVATE YOUR</span>
          <TextRotator words={words} className="text-[#E8C96A] block mt-1" />
        </h1>

        <p className="'Helvetica Neue', Helvetica, Arial, sans-serif text-lg md:text-xl max-w-xl leading-relaxed mb-10 font-light tracking-wide opacity-90" style={{ color: "#C5D6EE", fontFamily: "var(--font-body)" }}>
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
          className="relative w-full h-full aspect-[16/9] lg:aspect-[4/5] overflow-hidden shadow-[0_20px_50px_rgba(10,22,40,0.8)]"
          style={{ borderRadius: "16px", border: "1px solid rgba(232,201,106,0.15)" }}
        >
          <Image
            src="/images/management_dashboard.png"
            alt="Plan Your Schedule Dashboard"
            fill
            className="object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
            priority
          />

          {/* Subtle Decorative Gradient Overlay for blending */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 to-transparent pointer-events-none"></div>

          {/* Floating abstract graphic representing 3D/Wealth for visual flair */}
          <motion.div
            animate={{ y: [-5, 5, -5], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-8 top-1/4 w-32 h-32 border border-[#E8C96A]/30 rounded-3xl z-10 pointer-events-none"
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
