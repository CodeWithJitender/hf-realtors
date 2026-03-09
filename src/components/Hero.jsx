"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useScroll, useTransform, motion } from "framer-motion";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";

export default function Hero() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    // Parallax background: moves slower than scroll speed
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <section ref={sectionRef} className="sticky top-0 w-full h-screen overflow-hidden bg-[#163548] font-sans -z-10">

            {/* Full-Bleed Parallax Background Image */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 -top-[10%] h-[120%] w-full z-0"
            >
                <Image
                    src="/images/hero.png"
                    alt="Premium architectural home exterior"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>

            {/* Subtle dark overlay for contrast */}
            <div className="absolute inset-0 bg-black/40 z-0 mix-blend-multiply"></div>

            {/* Deep Bottom Gradient for Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-0"></div>

            {/* Bottom-Anchored Cinematic Content */}
            <div className="absolute bottom-0 left-0 right-0 w-full px-6 sm:px-12 lg:px-24 pb-12 lg:pb-20 z-10 max-w-[2000px] mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">

                    {/* Left Column: Massive Heading */}
                    <div className="lg:col-span-8 xl:col-span-7 flex flex-col justify-end">
                        <RevealText delay={0.2} className="mb-6">
                            <div className="flex items-center gap-4">
                                <div className="h-[1px] w-16 bg-[#EDEDED]/50"></div>
                                <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-[#EDEDED]">
                                    Wealth-Tech Real Estate
                                </span>
                            </div>
                        </RevealText>

                        <RevealText delay={0.4}>
                            <h1 className="text-[3.5rem] sm:text-7xl md:text-[6rem] lg:text-[7rem] xl:text-[8.5rem] tracking-tight text-[#EDEDED] leading-[1] lg:leading-[0.9] pb-4 drop-shadow-xl">
                                <span className="block font-sans font-bold">Smart Decisions.</span>
                                <span className="block font-serif font-medium italic -mt-2">Wealth Creation.</span>
                            </h1>
                        </RevealText>
                    </div>

                    {/* Right Column: Context & Actions */}
                    <div className="lg:col-span-4 xl:col-span-5 flex flex-col justify-end lg:pb-6">
                        <RevealText delay={0.6} className="mb-10">
                            <p className="text-sm md:text-base text-[#EDEDED] font-normal leading-relaxed max-w-md xl:max-w-lg">
                                An immersive approach to acquiring high yield assets and meticulously engineered aesthetic value in the modern urban landscape.
                            </p>
                        </RevealText>

                        <RevealText delay={0.8}>
                            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4">

                                {/* Primary Button - Solid White */}
                                <MagneticButton variant="white-solid" className="group gap-3">
                                    Begin Journey
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                                </MagneticButton>

                                {/* Secondary Button - Outline White */}
                                <MagneticButton variant="white-outline">
                                    Properties
                                </MagneticButton>

                                {/* Tertiary Button - Outline White */}
                                <MagneticButton variant="white-outline">
                                    Glocal Design
                                </MagneticButton>

                            </div>
                        </RevealText>
                    </div>

                </div>
            </div>

        </section>
    );
}
