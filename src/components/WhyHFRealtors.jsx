"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Button from "@/components/Button";
import RevealText from "@/components/RevealText";

export default function WhyHFRealtors() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Subtle parallax transform for the full-bleed background image
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <section ref={containerRef} className="py-32 w-full min-h-screen flex items-center justify-center relative overflow-hidden bg-[#1A1A1A] px-4 md:px-12 lg:px-24">

            {/* Frame Background: Full-Bleed Architectural Interior */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 w-full h-[120%] z-0"
            >
                <Image
                    src="/images/interior.png" // Premium interior render
                    alt="High-end exclusive interior design"
                    fill
                    className="object-cover opacity-60"
                />
            </motion.div>

            {/* Light Overlay to Sink the Background gently */}
            <div className="absolute inset-0 bg-[#1A1A1A]/80 z-0 mix-blend-overlay pointer-events-none" />

            {/* Inner Frame: Massive Centered Content Overlay Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                className="relative w-full max-w-[1400px] bg-[#1A1A1A]/90 backdrop-blur-md px-6 py-20 md:p-24 lg:p-32 flex flex-col items-center text-center shadow-2xl z-10 border border-white/5 rounded-[3rem]"
            >

                {/* 1. Monospace / Wide-Tracked Eyebrow */}
                <RevealText delay={0.1} className="mb-10 md:mb-14">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 md:w-12 md:h-12 border border-white/20 rounded-full flex items-center justify-center mb-6 opacity-60">
                            <div className="w-1 h-1 bg-[#F9F8F6] rounded-full"></div>
                        </div>
                        <h2 className="text-[10px] md:text-sm font-semibold tracking-[0.3em] uppercase text-[#F9F8F6]/60">
                            Welcome to HF Realtors
                        </h2>
                    </div>
                </RevealText>

                {/* 2. Dominant Sans-Serif Heading */}
                <RevealText delay={0.2} className="mb-12">
                    <h3 className="text-5xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold tracking-tighter text-[#F9F8F6] uppercase leading-[0.9] max-w-6xl">
                        Value Through <br className="hidden md:block" /> Architecture.
                    </h3>
                </RevealText>

                {/* 3. Elegant Editorial Body Copy */}
                <RevealText delay={0.3} className="mb-6">
                    <p className="text-lg md:text-xl lg:text-2xl font-sans text-[#F9F8F6]/80 max-w-4xl leading-relaxed">
                        We don't just find properties; we meticulously engineer their aesthetic and financial potential. Gain elite access to premium, off-market assets.
                    </p>
                </RevealText>

                <RevealText delay={0.4} className="mb-16">
                    <p className="text-base md:text-lg text-[#F9F8F6]/60 font-sans max-w-2xl leading-relaxed">
                        Acquire a property through our strategic advisory and receive comprehensive 3D interior design and spatial planning completely free, powered exclusively by our partners at GlocalDesign.in.
                    </p>
                </RevealText>

                {/* 4. Minimalist Ghost CTA Row */}
                <RevealText delay={0.5}>
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-4">
                        <Button variant="solid" className="w-full sm:w-auto">
                            Book Consultation
                        </Button>
                        <Button variant="ghost" className="w-full sm:w-auto">
                            Discover Partner Design
                        </Button>
                    </div>
                </RevealText>

            </motion.div>

        </section>
    );
}
