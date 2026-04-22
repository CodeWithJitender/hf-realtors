"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(null);

  // Position percentages are based on a 16:9 wrapper scaling over the background image
  const steps = [
    {
      id: "discovery",
      title: "Discovery",
      desc: "We define your requirements, budget, and timeline.",
      pos: { top: '29.5%', left: '29.5%' },
    },
    {
      id: "mapping",
      title: "Market Mapping",
      desc: "Shortlisting across relevant NCR locations based on your goal.",
      pos: { top: '38%', left: '36.5%' },
    },
    {
      id: "evaluation",
      title: "Evaluation",
      desc: "Clear comparison of options with pros, risks, and potential.",
      pos: { top: '49%', left: '58.5%' },
    },
    {
      id: "execution",
      title: "Execution",
      desc: "Negotiation, documentation, and closure handled.",
      pos: { top: '50.5%', left: '72.5%' },
    }
  ];

  return (
    <section className="w-full py-20 lg:py-28 bg-[#161F48] border-t border-[#E8C96A]/10 overflow-hidden">
        
        {/* Main Heading */}
        <div className="max-w-6xl mx-auto text-center mb-10 md:mb-16 px-4">
          <h2 
            className="font-semibold leading-tight bg-gradient-to-b from-[#E8C96A] to-[#B8913A] text-transparent bg-clip-text inline-block px-4"
            style={{ 
              fontFamily: "'Poppins', sans-serif", 
              fontSize: "clamp(32px, 5vw, 56px)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            From requirement to decision, <br className="hidden md:block" />
            structured end-to-end
          </h2>
        </div>

        {/* Process Map Interactive Container (Full Width) */}
        <div className="relative w-full overflow-visible">
          {/* The image tag forces the exact organic aspect ratio, stopping background drift */}
          <img 
            src="/images/master-landing-page/fifth-sec-bg-with-point.png" 
            alt="End-to-End Process Map"
            className="w-full h-auto select-none pointer-events-none"
          />

          {/* Absolute Interactive Overlay */}
          <div className="absolute inset-0">
            {steps.map((step) => (
            <div 
              key={step.id}
              className="absolute z-[50]"
              style={{ 
                top: step.pos.top, 
                left: step.pos.left, 
              }}
              onMouseEnter={() => setActiveStep(step.id)}
              onMouseLeave={() => setActiveStep(null)}
              onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
            >
              <div className="relative group cursor-pointer flex items-center select-none transform -translate-x-1/2 -translate-y-1/2">
                {/* Invisible Hover Target over the baked-in image spot */}
                <div className="w-10 h-3 md:w-12 md:h-4 bg-transparent cursor-pointer flex-shrink-0 relative z-10"></div>

                {/* Heading Text placed absolutely to the right to prevent vertical overlap on mobile */}
                <h3 className="absolute left-full ml-3 md:ml-4 text-white font-semibold text-[13px] md:text-base lg:text-xl whitespace-nowrap bg-[#161F48]/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none px-3 py-1.5 md:p-0 rounded-full md:rounded-none transition-all duration-300 select-none drop-shadow-md text-shadow-md group-hover:text-[#E8C96A] z-20">
                  {step.title}
                </h3>

                {/* Pop-up Info Tooltip */}
                <AnimatePresence>
                  {activeStep === step.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-[220px] md:w-[260px] p-4 bg-[#1e2a5e]/80 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-[100] pointer-events-none"
                    >
                      {/* Triangle pointer linking popup to title */}
                      <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 backdrop-blur-md bg-[#253259] border-t border-l border-white/20 transform rotate-45 rounded-sm"></div>
                      <p className="text-[#D9D9D9] text-xs md:text-sm italic font-light relative z-10 leading-relaxed text-center">
                        {step.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
          </div>
        </div>
    </section>
  );
}
