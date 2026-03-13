"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePreloader } from "@/context/PreloaderContext";

export default function AboutUsHero() {
    const { isPreloaderDone } = usePreloader();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax effect for the background image
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-[#101010] overflow-hidden flex flex-col justify-center items-center">
            {/* Background Image with Parallax & Boxed Zoom-Out */}
            <motion.div
                className="absolute inset-0 w-full h-full z-0 origin-center"
                initial={{ scale: 1.1 }}
                animate={isPreloaderDone ? { scale: 0.85 } : { scale: 1.1 }}
                transition={{ duration: 1.8, ease: [0.2, 0.65, 0.3, 0.9] }}
                style={{ y, opacity }}
            >
                <Image
                    // You can replace this placeholder with a more suitable resort/building image
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1920"
                    alt="Phuket Real Estate"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Subtle dark overlay for readability */}
                <div className="absolute inset-0 bg-black/30 transition-opacity duration-1000" />
            </motion.div>

            {/* Main Center Text */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center w-full px-4">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={isPreloaderDone ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 30 }}
                    transition={{ duration: 1.2, delay: isPreloaderDone ? 1.2 : 0, ease: [0.2, 0.65, 0.3, 0.9] }}
                    className="text-[12vw] sm:text-[8vw] md:text-[6.5vw] lg:text-[6vw] tracking-tighter leading-[1.05] text-white uppercase m-0 p-0"
                    style={{ fontFamily: 'var(--font-futura), Futura, sans-serif', fontWeight: 'bold' }}
                >
                    Building Trust in Every Transaction
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isPreloaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 1, delay: isPreloaderDone ? 1.7 : 0, ease: [0.2, 0.65, 0.3, 0.9] }}
                    className="mt-6 max-w-2xl text-white/80 font-sans font-light text-sm sm:text-base md:text-lg leading-relaxed tracking-wide"
                >
                    HF Realtors was founded with a simple belief: real estate decisions deserve clarity, expertise, and a trusted partner who prioritizes long-term value over short-term transactions.
                </motion.p>
            </div>

            {/* Bottom Elements */}
            <div className="absolute bottom-8 left-0 w-full px-8 md:px-12 lg:px-16 flex justify-between items-end z-10 hidden">
                {/* Scroll Down */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isPreloaderDone ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: isPreloaderDone ? 1.8 : 0, duration: 1 }}
                    className="flex flex-col items-start gap-2 text-white font-sans text-xs md:text-sm font-bold tracking-[0.1em] uppercase"
                >
                    <div className="flex items-center gap-2 cursor-pointer group hover:opacity-70 transition-opacity">
                        <span>Scroll Down</span>
                        <motion.span
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="inline-block"
                        >
                            ↓
                        </motion.span>
                    </div>
                </motion.div>

                {/* Location */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isPreloaderDone ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: isPreloaderDone ? 1.8 : 0, duration: 1 }}
                    className="flex items-center gap-3 text-white font-sans text-xs md:text-sm font-bold tracking-[0.1em] uppercase opacity-90"
                >
                    {/* Minimalist Circle Indicator */}
                    <span className="w-1.5 h-1.5 rounded-full border-[1.5px] border-white/60" />
                    <span>Phuket, Thailand</span>
                </motion.div>
            </div>
        </section>
    );
}
