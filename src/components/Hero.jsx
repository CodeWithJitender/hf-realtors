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
        <section ref={sectionRef} className="sticky top-0 w-full h-screen overflow-hidden bg-[#1A1A1A] font-sans -z-10">

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

            {/* Deep Bottom Gradient for Text Contrast (The TREF trick) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-[#1A1A1A]/10 z-0 mix-blend-multiply"></div>

            {/* Bottom-Anchored Cinematic Content */}
            <div className="absolute bottom-0 left-0 right-0 w-full px-6 sm:px-12 lg:px-24 pb-12 lg:pb-20 z-10 w-full max-w-[2000px] mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">

                    {/* Left Column: Massive Heading */}
                    <div className="lg:col-span-7 flex flex-col justify-end">
                        <RevealText delay={2.6} className="mb-6">
                            <div className="flex items-center gap-3">
                                <div className="h-[1px] w-12 bg-stone-300"></div>
                                <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-stone-300">
                                    Wealth-Tech Real Estate
                                </span>
                            </div>
                        </RevealText>

                        <RevealText delay={2.8}>
                            <h1 className="text-[3rem] sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[7.5rem] font-bold tracking-tighter text-white leading-[0.9] lg:leading-[0.85] pb-2">
                                Smart Decisions. <br />
                                <span className="text-stone-300 italic font-sans">Wealth Creation.</span>
                            </h1>
                        </RevealText>
                    </div>

                    {/* Right Column: Context & Actions */}
                    <div className="lg:col-span-5 flex flex-col justify-end lg:pb-4">
                        <RevealText delay={3.0} className="mb-10">
                            <p className="text-base md:text-lg text-stone-300 font-normal leading-relaxed max-w-md lg:max-w-lg">
                                An immersive approach to acquiring high-yield assets and meticulously engineered aesthetic value in the modern urban landscape.
                            </p>
                        </RevealText>

                        <RevealText delay={3.2}>
                            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-6">

                                {/* Primary Button - Magnetic */}
                                <MagneticButton className="group gap-3 bg-[#F9F8F6] text-[#1A1A1A] border-transparent hover:border-white/20">
                                    Begin Journey
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                                </MagneticButton>

                                {/* Secondary Button - Magnetic */}
                                <MagneticButton>
                                    Properties
                                </MagneticButton>

                                {/* Tertiary Button - Magnetic */}
                                <MagneticButton>
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
