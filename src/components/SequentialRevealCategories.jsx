"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import RevealText from "@/components/RevealText";

const SERVICES = [
  {
    id: "01",
    title: "Property Buying",
    desc: "Expert guidance to help you identify, evaluate, and acquire the right property, backed by market insight and strategic advisory.",
    imageSrc: "/images/hero.png",
  },
  {
    id: "02",
    title: "Property Selling",
    desc: "Maximize the value of your property with targeted marketing, qualified buyers, and a smooth, well-managed transaction process.",
    imageSrc: "/images/interior.png",
  },
  {
    id: "03",
    title: "Leasing & Rentals",
    desc: "End-to-end support for leasing residential and commercial spaces, connecting the right properties with the right tenants.",
    imageSrc: "/images/abstract_modern_building.png",
  },
  {
    id: "04",
    title: "Property Portfolio Management",
    desc: "Strategic management of real estate assets to help optimize performance, maintain value, and support long-term investment goals.",
    imageSrc: "/images/hero.png",
  },
  {
    id: "05",
    title: "Wealth & Investment Advisory",
    desc: "Data-driven insights and expert advice to help you make informed real estate investment decisions that build lasting wealth.",
    imageSrc: "/images/interior.png",
  },
  {
    id: "06",
    title: "Concierge Services",
    desc: "Personalized assistance that goes beyond transactions — from property setup to design and lifestyle support.",
    imageSrc: "/images/abstract_modern_building.png",
  },
];

export default function SequentialRevealCategories() {
  // Track which card is currently active (opened).
  // Cards open as they enter the viewport on scroll.
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="relative w-full bg-white py-16 md:py-24">
      {/* Eyebrow */}
      <div className="w-full max-w-[95vw] md:max-w-[85vw] mx-auto mb-12 md:mb-16">
        <RevealText delay={0.1}>
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 md:w-12 bg-[#163548]/25" />
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-[#163548]/50">
              Core Capabilities
            </span>
          </div>
        </RevealText>
      </div>

      {/* Card list — normal flow, no sticky */}
      <div className="w-full max-w-[95vw] md:max-w-[85vw] mx-auto flex flex-col border-t border-[#163548]/10">
        {SERVICES.map((service, index) => {
          const isActive = activeIndex === index;

          // Active card full opacity; inactive cards dimmed
          const titleOpacity =
            isActive ? 1 : activeIndex !== null ? 0.2 : 0.35;

          return (
            <motion.div
              key={service.id}
              // Open this card when it scrolls into view (30% threshold)
              onViewportEnter={() => setActiveIndex(index)}
              viewport={{ amount: 0.3, once: false }}
              className="relative border-b border-[#163548]/10 py-8 md:py-10 flex flex-col"
            >
              {/* Header row */}
              <div className="flex items-start md:items-center gap-6 md:gap-12 relative z-20 pb-2">
                <motion.span
                  animate={{ opacity: titleOpacity }}
                  transition={{ duration: 0.4 }}
                  className="text-xl md:text-3xl font-light text-[#163548] hidden md:block mt-2 select-none"
                >
                  {service.id}
                </motion.span>

                <motion.h3
                  animate={{
                    opacity: titleOpacity,
                    color: isActive ? "#CCA14D" : "#163548",
                  }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-[7rem] font-serif font-medium tracking-tight uppercase leading-[0.85]"
                >
                  {service.title}
                </motion.h3>
              </div>

              {/* Gold underline when active */}
              <motion.div
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-0 left-0 h-[2px] w-full gold-gradient"
              />

              {/* Expandable body */}
              <motion.div
                animate={{
                  height: isActive ? "auto" : 0,
                  opacity: isActive ? 1 : 0,
                }}
                initial={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden flex flex-col gap-4"
              >
                {/* Image */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      key={service.id}
                      initial={{ scale: 0.96, y: 30, opacity: 0 }}
                      animate={{ scale: 1, y: 0, opacity: 1 }}
                      exit={{ scale: 0.98, y: 10, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 90,
                        damping: 20,
                        delay: 0.1,
                      }}
                      className="relative w-full mt-6 rounded-2xl overflow-hidden shadow-xl border border-[#163548]/10"
                      style={{ height: "300px" }}
                    >
                      <Image
                        src={service.imageSrc}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="85vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#163548]/25 via-transparent to-transparent" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Description */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.p
                      key={`desc-${service.id}`}
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 8, opacity: 0 }}
                      transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
                      className="text-lg md:text-2xl text-[#163548]/65 font-light leading-relaxed mb-2"
                    >
                      {service.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
