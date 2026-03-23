"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/RevealText";

export default function FinalTextSection() {
    return (
        <section className="relative w-full bg-white text-black py-24 md:py-32 px-8 md:px-12 lg:px-24 flex flex-col items-center justify-center">

            <div className="max-w-4xl w-full flex flex-col gap-8 md:gap-12">

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="tracking-tight text-center font-bold text-[#E8C96A]"
                    style={{ fontSize: "var(--text-fluid-h2)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                >
                    Building and Managing Real Estate Value
                </motion.h2>

                {/* Paragraphs */}
                <div className="flex flex-col gap-6 md:gap-8 leading-relaxed tracking-wide text-black/80 font-medium" style={{ fontSize: "var(--text-fluid-body)" }}>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        HF Realtors is an independent real estate advisory firm focused on helping clients build, manage, and optimize property investments with clarity and confidence.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        We work closely with individuals and investors to identify opportunities in residential and commercial real estate, ensuring every decision is guided by market insight, transparency, and long-term value creation.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        As the market evolves, we continue to refine our approach, delivering thoughtful advisory and sustainable outcomes for every client we serve.
                    </motion.p>
                </div>

                {/* Thin Bottom Line */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-10px" }}
                    transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-[1px] bg-black/20 mt-8 md:mt-16 origin-left"
                />

            </div>

        </section>
    );
}
