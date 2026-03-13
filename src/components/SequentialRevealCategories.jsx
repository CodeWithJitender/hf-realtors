"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import RevealText from "@/components/RevealText";

const SERVICES = [
  {
    id: "01",
    title: "Buy Property",
    desc: "Premium residential & commercial properties with high appreciation potential.",
    imageSrc: "/images/hero.png",
  },
  {
    id: "02",
    title: "Wealth Management",
    desc: "Strategic financial planning integrated with real estate investments.",
    imageSrc: "/images/interior.png",
  },
  {
    id: "03",
    title: "Property Management",
    desc: "End-to-end management for rental, maintenance, and tenant coordination.",
    imageSrc: "/images/abstract_modern_building.png",
  },
];

// Each card occupies its own scroll window; null means no card is active
// Total: 0 → 0.05 (intro) | 0.05–0.37 (card 0) | 0.37–0.67 (card 1) | 0.67–0.95 (card 2) | 0.95→1 (outro)
const CARD_RANGES = [
  [0.05, 0.37],
  [0.37, 0.67],
  [0.67, 0.95],
];

export default function SequentialRevealCategories() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const activeRef = useRef(null); // stable ref to avoid stale closure

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress → active card (null if outside all ranges)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let next = null;
    for (let i = 0; i < CARD_RANGES.length; i++) {
      if (v >= CARD_RANGES[i][0] && v < CARD_RANGES[i][1]) {
        next = i;
        break;
      }
    }
    if (next !== activeRef.current) {
      activeRef.current = next;
      setActiveIndex(next);
    }
  });

  return (
    // 400vh gives comfortable scroll time for 3 cards
    <section
      ref={sectionRef}
      className="relative w-full bg-white"
      style={{ height: "400vh" }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-[95vw] md:max-w-[85vw] mx-auto flex flex-col py-16 md:py-24">

          {/* Eyebrow */}
          <RevealText delay={0.1} className="mb-12 md:mb-16">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 md:w-12 bg-[#163548]/25" />
              <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-[#163548]/50">
                Core Capabilities
              </span>
            </div>
          </RevealText>

          {/* Card list */}
          <div className="flex flex-col w-full border-t border-[#163548]/10">
            {SERVICES.map((service, index) => {
              const isActive = activeIndex === index;

              // Active card full opacity; inactive cards dimmed
              const titleOpacity = isActive ? 1 : activeIndex !== null ? 0.2 : 0.35;

              return (
                <div
                  key={service.id}
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
