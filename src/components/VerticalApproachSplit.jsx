"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Button from "@/components/Button";

const services = [
    {
        id: "who-we-are",
        navLabel: "Who We Are",
        title: "BUY PROPERTY",
        desc: "Premium residential & commercial properties matched to your elite criteria through off-market global networks.",
        image: "/images/hero.png",
        navImage: "/images/interior.png" // Image shown on the left sticky side
    },
    {
        id: "our-values",
        navLabel: "Our Values",
        title: "WEALTH MANAGEMENT",
        desc: "Strategic financial planning integrated with property acquisition to ensure generational asset appreciation and tax efficiency.",
        image: "/images/interior.png",
        navImage: "/images/hero.png"
    },
    {
        id: "our-team",
        navLabel: "Our Team",
        title: "PROPERTY MANAGEMENT",
        desc: "End-to-end management protocols protecting your investments with rigorous maintenance and operational foresight.",
        image: "/images/hero.png",
        navImage: "/images/interior.png"
    },
    {
        id: "founders",
        navLabel: "Founders",
        title: "GLOCAL PARTNERSHIP",
        desc: "Exclusive alliance with GlocalDesign.in, ensuring your acquisitions are elevated through premium structural and interior design mapping.",
        image: "/images/interior.png",
        navImage: "/images/hero.png"
    }
];

export default function VerticalApproachSplit() {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        // The container is 400vh to allow for 4x 100vh cards to scroll past
        <section ref={containerRef} className="relative w-full h-[400vh] bg-[#0A1628] text-[#EDEDED] font-sans">
            <div className="absolute inset-0 flex flex-col md:flex-row w-full h-full">

                {/* LEFT SIDE: Sticky Nav Container */}
                <div className="w-full md:w-[45%] lg:w-1/2 h-screen sticky top-0 flex flex-col justify-center p-8 md:p-12 lg:px-24 overflow-hidden z-10 border-r border-[#EDEDED]/5">

                    <span className="font-sans font-bold text-[#E8C96A] uppercase tracking-widest text-sm mb-6 block drop-shadow-sm">
                        About Us
                    </span>

                    <h2 className="text-[2.5rem] sm:text-[3rem] lg:text-[4rem] tracking-tight leading-[1.05] text-[#EDEDED] mb-6" style={{ fontFamily: 'sans-serif' }}>
                        Transform A Space for Work, <br className="hidden lg:block" /> Into A Space for Life
                    </h2>

                    <p className="font-sans text-[#EDEDED]/80 text-base lg:text-lg max-w-lg mb-12 lg:mb-16 leading-relaxed">
                        HF Realtors is a reliable architecture & real estate firm in the global market that provides integrated services for elite emotional acquisition.
                    </p>

                    {/* Navigation Linking Row */}
                    <div className="flex flex-row flex-wrap gap-x-8 gap-y-4 mb-12 lg:mb-16">
                        {services.map((service, i) => {
                            const isActive = activeIndex === i;
                            return (
                                <div key={service.id} className="flex items-center gap-2 transition-all duration-300">
                                    <div className="w-3 h-3 flex items-center justify-center">
                                        <svg
                                            width="10" height="10" viewBox="0 0 24 24"
                                            fill={isActive ? "#E8C96A" : "transparent"}
                                            stroke={isActive ? "transparent" : "transparent"}
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`transition-all duration-300 ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`}
                                        >
                                            <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                    </div>
                                    <span
                                        className={`font-sans text-base lg:text-lg transition-colors duration-500 cursor-pointer ${isActive ? 'text-[#E8C96A]' : 'text-[#EDEDED]/50 hover:text-[#EDEDED]/80'}`}
                                        style={{ fontFamily: 'sans-serif' }}
                                        onClick={() => setActiveIndex(i)}
                                    >
                                        {service.navLabel}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Sliding Image Box (Slides Down on Change) */}
                    <div className="relative w-full max-w-md aspect-video rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] bg-[#0A1628]">
                        <AnimatePresence>
                            <motion.div
                                key={activeIndex}
                                initial={{ y: "-100%" }}
                                animate={{ y: "0%", zIndex: 10 }}
                                exit={{ y: "100%", zIndex: 0 }}
                                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <Image
                                    src={services[activeIndex].navImage}
                                    alt="Section Highlight"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-[#0A1628]/30 mix-blend-multiply pointer-events-none z-20" />
                    </div>

                </div>

                {/* RIGHT SIDE: Scrolling Cards Container */}
                <div className="w-full md:w-[55%] lg:w-1/2 flex flex-col z-20 bg-[#0A1628]">

                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            onViewportEnter={() => setActiveIndex(index)}
                            viewport={{ amount: 0.5 }} // Fire when 50% in view
                            className="w-full h-screen flex flex-col justify-center p-6 sm:p-12 lg:pr-24 lg:pl-0"
                        >

                            {/* Card Content container - fades and slides in when entering viewport */}
                            <motion.div
                                initial={{ opacity: 0.3, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
                                className="w-full flex flex-col items-start pl-0 lg:pl-[10%]"
                            >
                                {/* Image takes up majority of the card */}
                                <div className="relative w-full aspect-[4/3] sm:aspect-video md:aspect-[4/5] lg:aspect-[4/3] rounded-[3rem] overflow-hidden mb-8 shadow-2xl">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover"
                                        priority={index === 0}
                                    />
                                    {/* Cinematic tint */}
                                    <div className="absolute inset-0 bg-[#0A1628]/10 mix-blend-multiply transition-opacity duration-500 hover:opacity-0" />
                                </div>

                                <div className="pl-6 border-l-2 border-[#E8C96A]/30 py-2">
                                    <h3
                                        className="text-2xl sm:text-3xl lg:text-4xl text-[#E8C96A] mb-4 tracking-tight"
                                        style={{ fontFamily: 'sans-serif' }}
                                    >
                                        {service.title}
                                    </h3>
                                    <p className="font-sans text-[#EDEDED]/90 text-base sm:text-justify lg:text-lg max-w-md leading-relaxed mb-8">
                                        {service.desc}
                                    </p>
                                    <Button variant="outlined">
                                        Learn More
                                    </Button>
                                </div>

                            </motion.div>

                        </motion.div>
                    ))}

                </div>

            </div>
        </section>
    );
}
