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
        imageSrc: "/images/hero.png"
    },
    {
        id: "02",
        title: "Wealth Management",
        desc: "Strategic financial planning integrated with real estate investments.",
        imageSrc: "/images/interior.png"
    },
    {
        id: "03",
        title: "Property Management",
        desc: "End-to-end management for rental, maintenance, and tenant coordination.",
        imageSrc: "/images/abstract_modern_building.png"
    }
];

export default function SequentialRevealCategories() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section className="relative w-full min-h-screen bg-[#163548] py-32 md:py-48 flex items-center justify-center overflow-hidden">

            {/* Blurred Background Image Transition */}
            <AnimatePresence>
                {hoveredIndex !== null && (
                    <motion.div
                        key={`bg-${hoveredIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 z-0 pointer-events-none"
                    >
                        <Image
                            src={SERVICES[hoveredIndex].imageSrc}
                            alt={`${SERVICES[hoveredIndex].title} Background`}
                            fill
                            className="object-cover object-center blur-md scale-105"
                            priority
                        />
                        {/* Darken overlay to ensure crisp white text contrast */}
                        <div className="absolute inset-0 bg-black/60 mix-blend-multiply"></div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-[95vw] md:max-w-[85vw] mx-auto flex flex-col">

                {/* Eyebrow Label */}
                <RevealText delay={0.1} className="mb-16">
                    <div className="flex items-center gap-3">
                        <div className="h-[1px] w-8 md:w-12 bg-[#FFED7E]/30"></div>
                        <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-[#FFED7E]/50">
                            Core Capabilities
                        </span>
                    </div>
                </RevealText>

                {/* Vertical Category List */}
                <div className="flex flex-col w-full border-t border-[#EDEDED]/10">
                    {SERVICES.map((service, index) => {
                        const isHovered = hoveredIndex === index;
                        const isAnyHovered = hoveredIndex !== null;

                        // Headline Opacity Logic
                        let titleOpacity = 0.3;
                        if (isHovered) titleOpacity = 1;
                        else if (isAnyHovered) titleOpacity = 0.1;

                        return (
                            <div
                                key={service.id}
                                className="group relative border-b border-[#EDEDED]/10 py-12 cursor-pointer flex flex-col transition-all duration-500 hover:border-transparent"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                // Touch support for mobile tap
                                onTouchStart={() => setHoveredIndex(index)}
                            >
                                {/* 1. The Headline (Always occupies space, fades opacity) */}
                                <div className="flex items-start md:items-center gap-6 md:gap-12 relative z-20 overflow-hidden pb-2">
                                    <motion.span
                                        animate={{ opacity: titleOpacity }}
                                        transition={{ duration: 0.4 }}
                                        className="text-xl md:text-3xl font-light text-[#EDEDED] font-sans hidden md:block mt-2"
                                    >
                                        {service.id}
                                    </motion.span>

                                    {/* The Telha Clarke Slide-Up Effect for the Headline is achieved by 
                                        animating 'y' from 100% to 0 on entry, but here the user wants it to 
                                        "stay at the top, pop to 100% opacity using the Telha Clarke slide-up mask."
                                        Since it's constantly visible, sliding it up on *hover* would cause layout shifts. 
                                        The prompt likely implies the *initial load* of the section uses the slide-up, 
                                        while the *hover* triggers purely opacity. However, to literally interpret "pops to 100% using the slide-up mask" 
                                        on hover, we can slide a duplicate element or just rely on a crisp opacity transition 
                                        to prevent jarring document flow changes. We will stick to opacity for the persistent header. */}
                                    <motion.h3
                                        animate={{ opacity: titleOpacity }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        className={`text-4xl sm:text-5xl md:text-6xl lg:text-[7rem] font-serif font-medium tracking-tight uppercase leading-[0.85] transition-colors duration-500 drop-shadow-md ${isHovered ? 'text-[#FFED7E]' : 'text-[#EDEDED]'}`}
                                    >
                                        {service.title}
                                    </motion.h3>
                                </div>


                                {/* Gold Gradient Underline on Hover */}
                                <div className={`absolute bottom-0 left-0 h-[2px] w-full transition-all duration-500 ${isHovered ? 'opacity-100 gold-gradient' : 'opacity-0 bg-transparent'}`} />

                                {/* 
                                    The Vertical Sequential Reveal Container:
                                    2. Image
                                    3. Paragraph
                                */}
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: isHovered ? "auto" : 0,
                                        opacity: isHovered ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    className="overflow-hidden md:ml-[5.5rem] lg:ml-[7.5rem] flex flex-col items-start gap-8"
                                >
                                    {/* 2. The Architectural Image (with Spring Physics) */}
                                    <AnimatePresence>
                                        {isHovered && (
                                            <motion.div
                                                initial={{ scale: 0.8, y: 50, opacity: 0 }}
                                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                                                // Specific physics requested by user
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 120,
                                                    damping: 20,
                                                    delay: 0.1 // Slight delay after container starts opening
                                                }}
                                                className="relative w-full max-w-2xl aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl mt-8"
                                            >
                                                <Image
                                                    src={service.imageSrc}
                                                    alt={`${service.title} Highlight`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* 3. The Descriptive Paragraph (Staggered Fade-in) */}
                                    {isHovered && (
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: 10, opacity: 0 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: 0.3, // Reveals AFTER the image springs in
                                                ease: [0.16, 1, 0.3, 1]
                                            }}
                                            className="w-full max-w-2xl mb-4"
                                        >
                                            <p className="text-xl md:text-3xl text-[#EDEDED]/90 font-light leading-relaxed">
                                                {service.desc}
                                            </p>
                                        </motion.div>
                                    )}
                                </motion.div>

                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
