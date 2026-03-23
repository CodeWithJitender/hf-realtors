"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import RevealText from "@/components/RevealText";

const SERVICES = [
    {
        id: "01",
        title: "Buy Property",
        desc: "Premium residential & commercial properties with high appreciation potential.",
        src: "/images/hero.png" // Re-using existing architectural images for global consistency
    },
    {
        id: "02",
        title: "Wealth Management",
        desc: "Strategic financial planning integrated with real estate investments.",
        src: "/images/interior.png" // Re-using existing architectural images
    },
    {
        id: "03",
        title: "Property Management",
        desc: "End-to-end management for rental, maintenance, and tenant coordination.",
        src: "/images/abstract_modern_building.png" // Re-using existing architectural images
    }
];

export default function OfferCategories() {
    // Default to 'Buy Property' (0) so a background is pre-loaded and active
    const [hoveredIndex, setHoveredIndex] = useState(0);

    return (
        <section className="relative w-full min-h-[90vh] bg-[#1A1A1A] py-16 md:py-32 flex items-center justify-center">

            {/* The massive isolated container matching global rounded-[3rem] consistency */}
            <div className="relative w-full max-w-[95vw] md:max-w-[85vw] mx-auto min-h-[75vh] md:min-h-[80vh] rounded-[3rem] overflow-hidden flex flex-col justify-center px-6 md:px-16 py-16 transition-shadow duration-700 hover:shadow-[0_0_80px_rgba(0,0,0,0.8)]">

                {/* Dynamically changing background image with crossfade */}
                <AnimatePresence>
                    <motion.div
                        key={hoveredIndex}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 z-0 origin-center"
                    >
                        <Image
                            src={SERVICES[hoveredIndex].src}
                            alt={SERVICES[hoveredIndex].title}
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Dark Overlays to ensure Poppins typography legibility per user constraints */}
                        <div className="absolute inset-0 bg-[#1A1A1A]/80 mix-blend-multiply transition-opacity duration-700"></div>
                        <div className="absolute inset-0 bg-black/50"></div>
                    </motion.div>
                </AnimatePresence>

                {/* Content Overlay */}
                <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col">

                    {/* Eyebrow Label */}
                    <RevealText delay={0.1} className="mb-12">
                        <div className="flex items-center gap-3">
                            <div className="h-[1px] w-8 md:w-12 bg-white/30"></div>
                            <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-white/50">
                                Core Capabilities
                            </span>
                        </div>
                    </RevealText>

                    {/* Interactive Hover List (Pell Mell style) */}
                    <div className="flex flex-col w-full border-t border-white/10">
                        {SERVICES.map((service, index) => {
                            const isHovered = hoveredIndex === index;

                            return (
                                <div
                                    key={service.id}
                                    className="group border-b border-white/10 py-8 md:py-12 cursor-pointer flex flex-col justify-center transition-colors duration-500 hover:border-white/30"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    // For mobile interactivity, tapping mimics hovering
                                    onTouchStart={() => setHoveredIndex(index)}
                                >
                                    <div className="flex items-start md:items-center justify-between gap-4">

                                        {/* Title & Number */}
                                        <div className="flex items-center gap-6 md:gap-12">
                                            <motion.span
                                                animate={{ opacity: isHovered ? 1 : 0.3 }}
                                                className="text-lg md:text-2xl font-light text-[#EDEDED] 'Helvetica Neue', Helvetica, Arial, sans-serif hidden md:block"
                                            >
                                                {service.id}
                                            </motion.span>

                                            {/* Font-extrabold and tracking-tighter as per instruction */}
                                            <motion.h3
                                                animate={{ opacity: isHovered ? 1 : 0.4 }}
                                                className="font-extrabold tracking-tighter text-[#F9F8F6] uppercase transition-colors duration-500 leading-[0.85]" style={{ fontSize: "var(--text-fluid-hero)" }}
                                            >
                                                {service.title}
                                            </motion.h3>
                                        </div>
                                    </div>

                                    {/* Expandable Telha Clarke Paragraph Reveal */}
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{
                                            height: isHovered ? "auto" : 0,
                                            opacity: isHovered ? 1 : 0,
                                            marginTop: isHovered ? "1.5rem" : "0px"
                                        }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Smooth expansion
                                        className="overflow-hidden md:ml-[4.5rem] lg:ml-[4.5rem]"
                                    >
                                        {/* Only mount RevealText when expanded to trigger the Telha Clarke staggered animation */}
                                        {isHovered && (
                                            <RevealText delay={0}>
                                                <p className="text-white/80 font-normal max-w-2xl leading-relaxed mt-2 pb-2" style={{ fontSize: "var(--text-fluid-h3)" }}>
                                                    {service.desc}
                                                </p>
                                            </RevealText>
                                        )}
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
