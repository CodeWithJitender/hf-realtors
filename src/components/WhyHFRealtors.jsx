"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import Button from "@/components/Button";
import RevealText from "@/components/RevealText";

function ScrubWord({ children, progress, range }) {
    const opacity = useTransform(progress, range, [0.15, 1]);
    return (
        <span className="relative inline-block">
            <span className="absolute opacity-20 text-[#EDEDED] left-0 top-0">{children}</span>
            <motion.span style={{ opacity }} className="text-[#EDEDED] relative z-10">{children}</motion.span>
        </span>
    );
}

export default function WhyHFRealtors() {
    const containerRef = useRef(null);
    const scrubRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const { scrollYProgress: scrubProgress } = useScroll({
        target: scrubRef,
        offset: ["start 85%", "end 40%"]
    });

    // Subtle parallax transform for the full-bleed background image
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    const bodyText = "We don't just find properties; we meticulously engineer their aesthetic and financial potential. Gain elite access to premium, off-market assets.";
    const bodyWords = bodyText.split(" ");

    return (
        <section ref={containerRef} className="py-fluid-section w-full min-h-screen flex items-center justify-center relative bg-[#163548] px-fluid-container">

            {/* Isolated clipping layer for the background to accommodate the -top offset */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Frame Background: Full-Bleed Architectural Interior */}
                <motion.div
                    style={{ y: backgroundY }}
                    className="absolute inset-0 -top-[10%] w-full h-[120%]"
                >
                    <Image
                        src="/images/interior.png" // Premium interior render
                        alt="High-end exclusive interior design"
                        fill
                        className="object-cover opacity-60"
                    />
                </motion.div>
            </div>

            {/* Dark Overlay to Sink the Background gently */}
            <div className="absolute inset-0 bg-[#163548]/80 z-0 mix-blend-overlay pointer-events-none" />

            {/* Inner Frame: Massive Centered Content Overlay Card / Bento Surface */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                className="relative w-full max-w-[1400px] bg-[#224d68]/40 backdrop-blur-md px-fluid-container py-fluid-section flex flex-col items-center text-center shadow-2xl z-10 border border-[#FFED7E]/5 rounded-[3rem]"
            >

                {/* 1. Monospace / Wide-Tracked Eyebrow */}
                <RevealText delay={0.1} className="mb-10 md:mb-14">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 md:w-12 md:h-12 border border-[#FFED7E]/10 rounded-full flex items-center justify-center mb-6">
                            <div className="w-1 h-1 bg-[#FFED7E] rounded-full"></div>
                        </div>
                        <h2 className="text-[10px] md:text-sm font-semibold tracking-[0.3em] uppercase text-[#FFED7E]/70 font-medium font-sans">
                            Welcome to HF Realtors
                        </h2>
                    </div>
                </RevealText>

                {/* 2 & 3. Scrub Text Area */}
                <div ref={scrubRef} className="flex flex-col items-center w-full">
                    {/* 2. Dominant Serif Heading (H1 context) */}
                    <h3 className="mb-12 text-5xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-serif font-medium tracking-tight leading-[0.9] max-w-6xl drop-shadow-md text-center">
                        <ScrubWord progress={scrubProgress} range={[0, 0.15]}>Value</ScrubWord>{" "}
                        <ScrubWord progress={scrubProgress} range={[0.15, 0.3]}>Through</ScrubWord>
                        <br className="hidden md:block" />
                        <ScrubWord progress={scrubProgress} range={[0.3, 0.45]}>Architecture.</ScrubWord>
                    </h3>

                    {/* 3. Elegant Editorial Body Copy */}
                    <p className="mb-6 text-lg md:text-xl lg:text-2xl font-sans max-w-4xl leading-relaxed text-center">
                        {bodyWords.map((word, i) => {
                            const start = 0.45 + (i / bodyWords.length) * 0.55;
                            const end = start + (0.55 / bodyWords.length);
                            return (
                                <span key={i}>
                                    <ScrubWord progress={scrubProgress} range={[start, end]}>
                                        {word}
                                    </ScrubWord>
                                    {" "}
                                </span>
                            );
                        })}
                    </p>
                </div>

                <RevealText delay={0.4} className="mb-16 mt-6">
                    <p className="text-base md:text-lg text-[#EDEDED] font-sans max-w-2xl leading-relaxed">
                        Acquire a property through our strategic advisory and receive comprehensive 3D interior design and spatial planning completely free, powered exclusively by our partners at GlocalDesign.in.
                    </p>
                </RevealText>

                {/* 4. Minimalist Ghost CTA Row */}
                <RevealText delay={0.5}>
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-4">
                        <Button variant="gold" className="w-full sm:w-auto">
                            Book A Consultation
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
