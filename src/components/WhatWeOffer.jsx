"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import RevealText from "@/components/RevealText";

const SERVICES = [
    {
        id: "01",
        label: "FINANCIAL ARCHITECTURE",
        title: "Wealth Management",
        desc: "Strategic portfolio structuring intended to maximize returns, minimize tax liabilities, and ensure long-term, resilient multi-generational wealth.",
        src: "/images/interior.png"
    },
    {
        id: "02",
        label: "OPERATIONAL OVERSIGHT",
        title: "Property Management",
        desc: "End-to-end operational oversight. From rigorous tenant acquisition to premium facility maintenance, we guarantee your asset remains pristine and maximally profitable.",
        src: "/images/abstract_modern_building.png"
    },
    {
        id: "03",
        label: "AESTHETIC ENGINEERING",
        title: "Glocal Partnerships",
        desc: "Seamlessly integrate world-class spatial planning and bespoke interior layouts completely free, powered exclusively by our elite design partners at GlocalDesign.in.",
        src: "/images/skyscraper_low_angle.png"
    }
];

// Sub-component for individual project cards to handle local vertical parallax
function ServiceCard({ service }) {
    const cardRef = useRef(null);

    // Track scroll specifically for this card to drive the vertical image parallax
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Vertical Parallax: Image moves slightly slower/faster than the scroll
    const imageParallaxY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div ref={cardRef} className="w-full flex justify-center mb-32 md:mb-48 last:mb-0">
            <div className="w-full max-w-[95vw] md:max-w-[85vw] flex flex-col">

                {/* Massive Image Container with Parallax + Consistent border radius */}
                <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-white/5 rounded-[3rem] mb-8 md:mb-12">
                    <motion.div
                        style={{ y: imageParallaxY }}
                        className="absolute inset-x-0 -top-[15%] -bottom-[15%] w-full"
                    >
                        <Image
                            src={service.src}
                            alt={service.title}
                            fill
                            className="object-cover"
                            sizes="100vw"
                        />
                    </motion.div>
                </div>

                {/* Split Typography (Authentic Nussli Layout) */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-4 md:gap-8 px-2 md:px-0">
                    {/* Left: Project Title */}
                    <div className="max-w-3xl">
                        <RevealText delay={0.1}>
                            <h4 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-[#F9F8F6] leading-none">
                                {service.title} <span className="text-white/30 font-light">—</span> <br className="hidden md:block" />
                                <span className="text-xl md:text-3xl lg:text-4xl font-normal text-[#F9F8F6]/60 tracking-tight uppercase">{service.label}</span>
                            </h4>
                        </RevealText>
                    </div>

                    {/* Right: Project Details */}
                    <div className="text-left md:text-right max-w-sm lg:max-w-md mt-4 md:mt-0">
                        <RevealText delay={0.2} className="mb-2">
                            <p className="font-sans text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#F9F8F6]/50">
                                Step {service.id}
                            </p>
                        </RevealText>
                        <RevealText delay={0.3}>
                            <p className="text-[#F9F8F6]/80 font-sans text-sm md:text-base leading-relaxed">
                                {service.desc}
                            </p>
                        </RevealText>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default function WhatWeOffer() {

    return (
        <section id="services" className="relative bg-[#1A1A1A] text-[#F9F8F6] font-sans z-10 py-fluid-section min-h-screen">

            {/* PART 2: THE IMMERSIVE CARDS */}
            <div className="relative w-full z-20 flex flex-col items-center">
                {SERVICES.map((service, index) => (
                    <ServiceCard key={index} service={service} />
                ))}
            </div>

        </section>
    );
}
