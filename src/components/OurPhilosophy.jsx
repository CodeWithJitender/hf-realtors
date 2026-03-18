"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const philosophyCards = [
    {
        id: "integrity",
        title: "Integrity",
        desc: "We operate with uncompromising transparency. Every transaction, every structural detail, and every advisory session is grounded in absolute truth.",
        image: "https://images.unsplash.com/photo-1497215840924-11885fcedae8?auto=format&fit=crop&q=80&w=1200",
        number: "01"
    },
    {
        id: "precision",
        title: "Precision",
        desc: "Architecture demands exactness, as does wealth management. We align structural perfection with financial exactitude to guarantee maximum ROI.",
        image: "https://images.unsplash.com/photo-1541888086925-920a0b62e4d4?auto=format&fit=crop&q=80&w=1200",
        number: "02"
    },
    {
        id: "legacy",
        title: "Legacy",
        desc: "We don't just build spaces; we architect generational wealth. Our acquisitions are curated to appreciate in value and stand the test of time.",
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200",
        number: "03"
    }
];

export default function OurPhilosophy() {
    const containerRef = useRef(null);
    
    // We only need the scroll progress if we want to animate the background or left column, 
    // but the native sticky layout handles most of it simply.
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const leftColOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0.3]);

    return (
        <section ref={containerRef} className="relative w-full bg-[#0A1628] font-sans border-t border-[#EDEDED]/10">
            {/* 300vh height to accommodate 3 full-screen cards scrolling */}
            <div className="flex flex-col md:flex-row w-full max-w-[1920px] mx-auto min-h-[300vh]">
                
                {/* LEFT SIDE: Sticky Title Container */}
                <div className="w-full md:w-[40%] h-[40vh] md:h-screen md:sticky md:top-0 flex flex-col justify-center p-8 md:p-12 lg:px-24 border-r border-[#EDEDED]/5 bg-[#0A1628] z-10 md:z-0">
                    <motion.div style={{ opacity: leftColOpacity }} className="flex flex-col">
                        <span className="font-sans font-medium text-[#E8C96A] uppercase tracking-widest text-[11px] md:text-xs mb-6 lg:mb-8 block">THE FOUNDATION</span>
                        
                        <h2 className="text-fluid-h1 tracking-tighter leading-[0.9] text-[#EDEDED] mb-6 uppercase" style={{ fontFamily: 'var(--font-futura), Futura, sans-serif', fontWeight: 'bold' }}>
                            Our <br className="hidden md:block"/>
                            Core <br className="hidden md:block"/>
                            Values
                        </h2>
                    </motion.div>
                </div>

                {/* RIGHT SIDE: Scrolling Cards */}
                <div className="w-full md:w-[60%] flex flex-col z-10 pt-[5vh] lg:pt-[10vh]">
                    
                    {philosophyCards.map((card, index) => (
                        <div 
                            key={card.id} 
                            className="w-full min-h-[90vh] lg:min-h-screen flex items-center justify-center p-6 sm:p-12 lg:py-24 lg:pl-24 lg:pr-32 sticky top-0 md:relative"
                            // Adding sticky top-0 on mobile makes the cards stack on top of each other while the left section is above them
                        >
                            <motion.div
                                initial={{ opacity: 0.3, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
                                className="w-full flex w-full relative group"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden shadow-2xl">
                                    <Image
                                        src={card.image}
                                        alt={card.title}
                                        fill
                                        className="object-cover opacity-60 grayscale-[30%] transition-transform duration-1000 group-hover:scale-105"
                                        priority={index === 0}
                                    />
                                    {/* Vignette Overlay for mood */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/40 to-[#0A1628]/80 mix-blend-multiply" />
                                    <div className="absolute inset-0 bg-[#0A1628] opacity-20 group-hover:opacity-0 transition-opacity duration-700" />
                                </div>

                                {/* Content overlaying the image */}
                                <div className="relative z-10 p-8 sm:p-12 lg:p-16 flex flex-col justify-end w-full min-h-[60vh] md:min-h-[70vh]">
                                    <div className="flex flex-col border-l-2 border-[#E8C96A] pl-6 lg:pl-10">
                                        <div className="flex items-baseline gap-4 mb-4">
                                            <span 
                                                className="text-[#E8C96A] text-lg lg:text-3xl tracking-tighter"
                                                style={{ fontFamily: 'var(--font-futura), Futura, sans-serif', fontWeight: 'bold' }}
                                            >
                                                {card.number}
                                            </span>
                                            <h3 
                                                className="text-fluid-h2 tracking-tighter leading-[1] text-[#EDEDED] uppercase" 
                                                style={{ fontFamily: 'var(--font-futura), Futura, sans-serif', fontWeight: 'bold' }}
                                            >
                                                {card.title}
                                            </h3>
                                        </div>
                                        
                                        <p className="font-sans text-[#EDEDED] text-fluid-body max-w-lg leading-relaxed pt-4 font-light tracking-wide opacity-90">
                                            {card.desc}
                                        </p>
                                    </div>
                                </div>

                            </motion.div>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}
