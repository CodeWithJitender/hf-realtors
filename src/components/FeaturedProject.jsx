"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import RevealText from "@/components/RevealText";

export default function FeaturedProject() {
    const containerRef = useRef(null);

    // Parallax effect for the hero image
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Subtle scale and parallax for the hero image
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
    const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

    return (
        <section ref={containerRef} className="relative bg-[#1A1A1A] text-[#F9F8F6] font-sans py-32 overflow-hidden">
            <div className="max-w-[95vw] md:max-w-[85vw] mx-auto flex flex-col items-center">

                {/* Section Header */}
                <div className="w-full mb-12 flex flex-col items-start px-2 md:px-0">
                    <RevealText delay={0.1}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-[1px] w-8 md:w-12 bg-white/30"></div>
                            <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-white/50">
                                Featured Case Study
                            </span>
                        </div>
                    </RevealText>
                    <RevealText delay={0.2}>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#F9F8F6] leading-[1.1]">
                            The standard of <br />
                            <span className="text-white/40 italic font-normal text-3xl md:text-5xl">executable vision.</span>
                        </h2>
                    </RevealText>
                </div>

                {/* Hero Image Block (huts.com style) */}
                <div className="relative w-full h-[60vh] md:h-[80vh] rounded-[3rem] overflow-hidden mb-16 md:mb-24 group">
                    <motion.div
                        style={{ scale, y }}
                        className="absolute inset-x-0 -top-[10%] -bottom-[10%] w-full"
                    >
                        <Image
                            src="/images/featured-adu.png"
                            alt="Blueberry Hill ADU - Exterior Render"
                            fill
                            className="object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-105"
                            sizes="100vw"
                            priority
                        />
                        {/* Dramatic vignette overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/20 to-transparent mix-blend-multiply"></div>
                    </motion.div>

                    {/* Bottom-Left Anchored Content */}
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col justify-end">
                        <RevealText delay={0.3}>
                            <h3 className="text-4xl md:text-7xl lg:text-[6rem] font-bold tracking-tighter text-white leading-none mb-6 drop-shadow-2xl">
                                Blueberry Hill<br />ADU
                            </h3>
                        </RevealText>

                        {/* Pill Tags */}
                        <RevealText delay={0.4}>
                            <div className="flex flex-wrap gap-3">
                                {["ADU", "Sleeping Loft", "1 Bath", "<500 Sqft"].map((tag, idx) => (
                                    <div
                                        key={idx}
                                        className="px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase text-white/90"
                                    >
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </RevealText>
                    </div>
                </div>

                {/* Overview Split Section */}
                <div className="flex flex-col lg:flex-row justify-between w-full gap-16 lg:gap-8 px-4 md:px-0">

                    {/* Left: Storytelling Paragraph */}
                    <div className="lg:w-7/12">
                        <RevealText delay={0.3}>
                            <p className="text-[#F9F8F6]/80 text-lg md:text-2xl font-light leading-relaxed mb-8">
                                Built as phase 1 on a multi-structure development, this ADU based on our minimal aesthetic is completely off-grid. It utilizes a high-efficiency solar array, a water collection system, and low-draw appliances throughout.
                            </p>
                        </RevealText>
                        <RevealText delay={0.4}>
                            <p className="text-[#F9F8F6]/80 text-lg md:text-2xl font-light leading-relaxed">
                                Positioned in a remote section of the lot, the tiny home is engineered with custom millwork and space-specific furniture, merging strategic acquisition with peak operational oversight.
                            </p>
                        </RevealText>
                    </div>

                    {/* Right: Specs Table (huts.com style) */}
                    <div className="lg:w-4/12 flex flex-col">
                        {[
                            { label: "Size", value: "480 sqft" },
                            { label: "Lot Size", value: "17 Acres" },
                            { label: "Environment", value: "Forest" },
                            { label: "Status", value: "Completed" }
                        ].map((spec, index) => (
                            <div key={index} className="w-full">
                                <RevealText delay={0.4 + (index * 0.1)}>
                                    <div className="flex justify-between items-end py-6 border-b border-white/10 group-hover:border-white/30 transition-colors">
                                        <span className="text-sm md:text-base font-medium tracking-tight text-white/50">{spec.label}</span>
                                        <span className="text-sm md:text-base font-semibold tracking-tight text-[#F9F8F6]">{spec.value}</span>
                                    </div>
                                </RevealText>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
}
