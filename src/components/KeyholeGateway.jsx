"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";

const Content = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 w-full h-full pointer-events-none">
        <h2 className="font-sans font-bold uppercase leading-[0.85] tracking-tight text-[#CCA14D] drop-shadow-2xl text-[10vw] sm:text-[8vw] lg:text-[7vw]">
            Value Through <br /> Architecture
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-12 pointer-events-auto">
            <MagneticButton variant="solid">Explore Properties</MagneticButton>
            <MagneticButton variant="solid">Wealth Plan</MagneticButton>
        </div>
    </div>
);

export default function KeyholeGateway() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100, mass: 0.2 });

    // Keyhole Mask Scale: 12% to cover entire screen, framing the circular view of the headline
    const maskSize = useTransform(smoothProgress, [0, 0.4], ["12%", "150%"]);
    const clipPathRaw = useTransform(maskSize, (size) => `circle(${size} at center)`);

    // Split Halves Logic: triggers after the mask fills the screen (0.5 to 0.9)
    const leftX = useTransform(smoothProgress, [0.5, 0.9], ["0%", "-100%"]);
    const rightX = useTransform(smoothProgress, [0.5, 0.9], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="relative w-full h-[300vh] bg-[#163548]">
            <div className="sticky top-0 w-full h-screen overflow-hidden">

                {/* --- 1. The Next Section Revealed Underneath (Why HF Realtors) --- */}
                <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#EDEDED]">
                    {/* The rounded-[3rem] architectural image revealed */}
                    <div className="absolute inset-4 sm:inset-10 lg:inset-16 overflow-hidden rounded-[3rem] z-0 shadow-2xl">
                        <Image src="/images/management_dashboard.png" alt="Why HF Realtors Reality" fill className="object-cover opacity-90" priority />
                        <div className="absolute inset-0 bg-[#163548]/90 mix-blend-multiply" />

                        <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-4xl mx-auto px-6 text-center">
                            <h2 className="text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-sans font-bold uppercase tracking-tight text-[#CCA14D] leading-[1] mb-6 drop-shadow-lg">
                                Why HF Realtors
                            </h2>
                            <p className="text-[#EDEDED] font-sans text-lg md:text-xl mb-10 drop-shadow-md">
                                We operate at the intersection of architectural brilliance and financial strategic advantage. A new sense of self.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- 2. The Keyhole Mask Container --- */}
                {/* We apply the circle clipPath to this parent wrapper to create the keyhole effect. */}
                <motion.div
                    style={{ clipPath: clipPathRaw }}
                    className="absolute inset-0 z-10 w-full h-full pointer-events-none"
                >
                    {/* Left Half Container (Includes the Text for Physical Splitting) */}
                    <motion.div
                        style={{ x: leftX, clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
                        className="absolute inset-0 bg-[#163548] z-10 will-change-transform pointer-events-auto"
                    >
                        <Image src="/images/hero.png" alt="Split Left" fill className="object-cover" priority />
                        <div className="absolute inset-0 bg-[#163548]/80 mix-blend-multiply" />
                        <Content />
                    </motion.div>

                    {/* Right Half Container (Includes the Text for Physical Splitting) */}
                    <motion.div
                        style={{ x: rightX, clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }}
                        className="absolute inset-0 bg-[#163548] z-10 will-change-transform pointer-events-auto"
                    >
                        <Image src="/images/hero.png" alt="Split Right" fill className="object-cover" priority />
                        <div className="absolute inset-0 bg-[#163548]/80 mix-blend-multiply" />
                        <Content />
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
