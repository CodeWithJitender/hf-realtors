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
        primarySrc: "/images/skyscraper_low_angle.png", // Modern high-rise exterior
        hoverSrc: "/images/interior.png" // Luxury interior render
    },
    {
        id: "02",
        title: "Wealth Management",
        desc: "Strategic financial planning integrated with real estate investments.",
        primarySrc: "/images/office_setting.png", // Professional office setting
        hoverSrc: "/images/financial_charts.png" // Financial data/growth charts
    },
    {
        id: "03",
        title: "Property Management",
        desc: "End-to-end management for rental, maintenance, and tenant coordination.",
        primarySrc: "/images/hero.png", // Managed villa exterior
        hoverSrc: "/images/management_dashboard.png" // Professional management team/dashboard
    }
];

export default function DualRevealCategories() {
    // Track which category is currently being hovered. null means default state.
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section className="relative w-full min-h-screen py-48 flex items-center justify-center overflow-hidden" style={{ backgroundColor: "#0A1628" }}>

            {/* Primary Background Image (Fades in on hover) */}
            <AnimatePresence>
                {hoveredIndex !== null && (
                    <motion.div
                        key={`bg-${hoveredIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="absolute inset-0 z-0 pointer-events-none"
                    >
                        <Image
                            src={SERVICES[hoveredIndex].primarySrc}
                            alt={`${SERVICES[hoveredIndex].title} Background`}
                            fill
                            className="object-cover object-center"
                            priority
                        />
                        {/* Darken overlay to ensure text legibility */}
                        <div className="absolute inset-0 bg-black/50"></div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-[95vw] md:max-w-[85vw] lg:max-w-7xl mx-auto flex flex-col">

                {/* Eyebrow */}
                <RevealText delay={0.1} className="mb-16">
                    <div className="flex items-center gap-3">
                        <div className="h-[1px] w-8 md:w-12 bg-white/30"></div>
                        <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em]  text-white/50">
                            Core Capabilities
                        </span>
                    </div>
                </RevealText>

                {/* Vertical Category List */}
                <div className="flex flex-col w-full border-t border-white/10">
                    {SERVICES.map((service, index) => {
                        const isHovered = hoveredIndex === index;
                        const isAnyHovered = hoveredIndex !== null;

                        // Title opacity logic:
                        // Default (no hover anywhere): 30%
                        // Hovering this item: 100%
                        // Hovering another item: 10%
                        let titleOpacity = 0.3;
                        if (isHovered) titleOpacity = 1;
                        else if (isAnyHovered) titleOpacity = 0.1;

                        return (
                            <div
                                key={service.id}
                                className="group relative border-b border-white/10 py-12 lg:py-16 cursor-pointer flex flex-col justify-center transition-colors duration-500 hover:border-white/30"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                // Touch support for mobile devices
                                onTouchStart={() => setHoveredIndex(index)}
                            >
                                {/* Default State (Title) */}
                                <div className="flex items-start md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-6 md:gap-12 relative z-20">
                                        <motion.span
                                            animate={{ opacity: titleOpacity }}
                                            transition={{ duration: 0.4 }}
                                            className="text-lg md:text-2xl font-light text-[#EDEDED] 'Helvetica Neue', Helvetica, Arial, sans-serif hidden md:block"
                                        >
                                            {service.id}
                                        </motion.span>

                                        {/* Telha Clarke stagger container for the title is built into RevealText if wrapped, 
                                            but since we just want an opacity fade for the interaction, motion.h3 handles it nicely. */}
                                        <motion.h3
                                            animate={{ opacity: titleOpacity }}
                                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                            className="text-4xl sm:text-5xl md:text-6xl lg:text-[7rem] font-extrabold tracking-tighter text-[#F9F8F6] uppercase leading-[0.85]"
                                        >
                                            {service.title}
                                        </motion.h3>
                                    </div>
                                </div>

                                {/* Hover State Reveals (Paragraph & Secondary Image) */}
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: isHovered ? "auto" : 0,
                                        opacity: isHovered ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    className="overflow-hidden md:ml-[4.5rem] lg:ml-[6rem] relative z-20"
                                >
                                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mt-6 pt-4">

                                        {/* Descriptive Text Reveal */}
                                        {isHovered && (
                                            <div className="w-full lg:w-1/2">
                                                <RevealText delay={0.1}>
                                                    <p className="text-lg md:text-3xl text-white/90 font-light max-w-xl leading-relaxed">
                                                        {service.desc}
                                                    </p>
                                                </RevealText>
                                            </div>
                                        )}

                                        {/* Floating Secondary Image Reveal (pellmell style) */}
                                        <AnimatePresence>
                                            {isHovered && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                                    transition={{
                                                        duration: 0.8,
                                                        delay: 0.2, // Slightly delayed entrance mapping the text
                                                        ease: [0.16, 1, 0.3, 1]
                                                    }}
                                                    className="relative w-full md:w-[400px] aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 z-30"
                                                >
                                                    <Image
                                                        src={service.hoverSrc}
                                                        alt={`${service.title} Highlight`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                    </div>
                                </motion.div>

                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
