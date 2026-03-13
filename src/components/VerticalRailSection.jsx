"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import Button from "@/components/Button";

const milestones = [
    {
        title: "Who We Are",
        heading: "A Vision For Tomorrow",
        text: "HF Realtors is a reliable architecture & real estate firm in the global market that provides integrated services for elite emotional acquisition.",
        image: "/images/interior.png",
        align: "left"
    },
    {
        title: "Our Approach",
        heading: "Strategic Execution",
        text: "We don't just sell properties; we craft investment strategies. Our methodology ensures every acquisition appreciates in both emotional and financial value.",
        image: "/images/hero.png",
        align: "right"
    },
    {
        title: "The Result",
        heading: "Generational Wealth",
        text: "Our clients secure assets that define their legacy. Unparalleled design coupled with prime locations ensures enduring prosperity.",
        image: "/images/interior.png",
        align: "left"
    }
];

export default function VerticalRailSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const glowTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="relative w-full bg-[#163548] py-fluid-section text-[#EDEDED]">
            <div className="container mx-auto px-fluid-container relative">

                {/* Central fixed vertical line */}
                <div className="absolute left-[24px] lg:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 lg:-translate-x-1/2 z-0">
                    <motion.div
                        style={{ scaleY: scrollYProgress }}
                        className="absolute left-0 top-0 w-full h-full bg-gradient-to-b from-[#CCA14D] to-[#FFED7E] origin-top will-change-transform z-10 shadow-[0_0_10px_#CCA14D]"
                    />
                    {/* Glowing Progress Node */}
                    <motion.div
                        style={{ top: glowTop }}
                        className="absolute left-1/2 -mt-2 w-4 h-4 rounded-full bg-[#FFED7E] shadow-[0_0_20px_#CCA14D] -translate-x-1/2 z-20 will-change-transform"
                    />
                </div>

                <div className="relative z-10 flex flex-col gap-32 lg:gap-48 pl-8 lg:pl-0">
                    {milestones.map((milestone, index) => {
                        const isLeft = milestone.align === "left";

                        return (
                            <div key={index} className={`flex flex-col lg:flex-row items-center w-full ${isLeft ? '' : 'lg:flex-row-reverse'}`}>

                                {/* Content Side */}
                                <div className={`w-full lg:w-1/2 flex flex-col ${isLeft ? 'lg:pr-16 xl:pr-32 lg:items-end lg:text-right' : 'lg:pl-16 xl:pl-32 items-start text-left'}`}>
                                    <motion.div
                                        initial={{ opacity: 0.3, x: isLeft ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: false, margin: "-100px" }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="max-w-xl flex flex-col items-start lg:items-stretch"
                                    >
                                        <div className={`w-full flex flex-col ${isLeft ? 'lg:items-end' : 'items-start'}`}>
                                            <span className="font-sans font-bold text-[#CCA14D] uppercase tracking-widest text-sm mb-4 block">
                                                {milestone.title}
                                            </span>
                                            <h2 className={`font-sans font-bold text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] text-[#CCA14D] leading-[1.1] tracking-tight mb-6 ${isLeft ? 'lg:text-right' : 'text-left'}`} style={{ fontFamily: 'sans-serif' }}>
                                                {milestone.heading}
                                            </h2>
                                            <p className={`font-sans font-regular text-lg text-[#EDEDED] mb-10 w-full ${isLeft ? 'lg:text-right' : 'text-left'}`}>
                                                {milestone.text}
                                            </p>
                                            <div className={`flex w-full ${isLeft ? 'lg:justify-end' : 'justify-start'}`}>
                                                <Button variant="solid">
                                                    Explore
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Image Side */}
                                <div className="w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-center items-center">
                                    <motion.div
                                        initial={{ opacity: 0.3, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: false, margin: "-100px" }}
                                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                        className={`relative w-[90%] lg:w-[80%] aspect-[4/3] rounded-3xl overflow-hidden ${isLeft ? 'lg:ml-auto' : 'lg:mr-auto'}`}
                                    >
                                        <Image src={milestone.image} alt={milestone.heading} fill className="object-cover" />
                                        <div className="absolute inset-0 bg-[#163548]/30 mix-blend-multiply" />
                                    </motion.div>
                                </div>

                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
