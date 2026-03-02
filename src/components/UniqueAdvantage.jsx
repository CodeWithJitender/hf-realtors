"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/RevealText";

export default function UniqueAdvantage() {
    // The massive text broken down for staggered clip reveals
    const textLines = [
        { text: "REDEFINING", hasIcon: false },
        { text: "REAL ESTATE", hasIcon: true },
        { text: "THROUGH", hasIcon: false },
        { text: "PURE DESIGN", hasIcon: true },
    ];

    const iconVariants = {
        hidden: { scale: 0.5, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 1,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <section className="relative w-full min-h-screen py-32 md:py-48 px-6 flex flex-col items-center justify-center overflow-hidden bg-[#1A1A1A]">

            {/* The Zentry-style Eyebrow Label */}
            <div className="text-center mb-16 md:mb-24">
                <RevealText delay={0.1}>
                    <p className="text-[10px] md:text-xs font-semibold tracking-[0.3em] text-[#F9F8F6]/60 uppercase">
                        Who We Are
                    </p>
                </RevealText>
            </div>

            {/* Massive Clip-Reveal Typography Block */}
            <div className="flex flex-col items-center justify-center w-full">
                {textLines.map((line, index) => (
                    <div key={index} className="flex items-center gap-4 md:gap-8 overflow-hidden pt-2 pb-1">

                        {/* Decorative Icon Before Specific Lines */}
                        {line.hasIcon && (
                            <motion.div variants={iconVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center justify-center">
                                {/* Abstract Zentry-style blob/shape */}
                                <div className="w-4 h-4 md:w-8 md:h-8 lg:w-12 lg:h-12 bg-[#F9F8F6] rounded-sm rotate-45" />
                            </motion.div>
                        )}

                        <RevealText delay={0.1 * index} as="h2" className="text-[14vw] md:text-[11vw] leading-[0.8] font-bold uppercase tracking-tighter text-[#F9F8F6] text-center flex-shrink-0">
                            {line.text}
                        </RevealText>

                        {/* Decorative Icon After Specific Lines (Alternate) */}
                        {!line.hasIcon && index % 2 !== 0 && (
                            <motion.div variants={iconVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center justify-center">
                                <div className="w-3 h-3 md:w-6 md:h-6 lg:w-10 lg:h-10 bg-[#F9F8F6]/80 rounded-full" />
                            </motion.div>
                        )}

                    </div>
                ))}
            </div>

            {/* Brief descriptive text below the massive block */}
            <div className="mt-20 max-w-lg text-center mx-auto">
                <RevealText delay={0.4}>
                    <p className="text-[#F9F8F6]/80 font-sans text-sm md:text-base leading-relaxed">
                        Partner with the only real estate firm providing complimentary premium architectural redesign. We transform spaces before you even hold the keys.
                    </p>
                </RevealText>
            </div>

        </section>
    );
}
