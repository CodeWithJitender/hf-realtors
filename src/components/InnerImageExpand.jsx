"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";

export default function InnerImageExpand() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Outer Container scales up
    // Start: inset(20% 15% 20% 15%) -> a centered rectangle
    // End: inset(0% 0% 0% 0%) -> full screen
    const outerClipPath = useTransform(scrollYProgress, [0, 0.4], ["inset(20% 15% 20% 15%)", "inset(0% 0% 0% 0%)"]);

    // Inner Image Box scales up simultaneously but within the outer box
    // Start: A smaller rectangle inside the outer view
    // End: expands to fill its parent
    const innerWidth = useTransform(scrollYProgress, [0, 0.6], ["30%", "100%"]);
    const innerHeight = useTransform(scrollYProgress, [0, 0.6], ["30%", "100%"]);

    // UI Elements fade out
    const uiOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    return (
        <section ref={containerRef} className="relative w-full h-[300vh] bg-[#7A1315] z-20">
            {/* Sticky Container */}
            <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#7A1315] z-10 flex flex-col justify-center items-center">
                
                {/* Navigation / UI Elements */}
                <motion.div style={{ opacity: uiOpacity }} className="absolute top-1/2 left-8 -translate-y-1/2 flex items-center gap-4 z-0 text-white font-sans text-xs tracking-widest font-bold">
                    [+] NAVIGATION
                </motion.div>
                <motion.div style={{ opacity: uiOpacity }} className="absolute top-1/2 left-40 -translate-y-1/2 flex items-center gap-4 z-0 text-white font-sans text-xs tracking-widest font-bold">
                    RU
                </motion.div>
                <motion.div style={{ opacity: uiOpacity }} className="absolute top-1/2 right-8 -translate-y-1/2 flex items-center gap-4 z-0 text-white font-sans text-xs tracking-widest font-bold">
                    LET'S DISCUSS ↗
                </motion.div>
                
                {/* Bottom Logo */}
                <motion.div 
                    style={{ opacity: uiOpacity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center z-0"
                >
                    <h2 className="text-white text-4xl font-sans tracking-tighter" style={{ fontFamily: 'var(--font-futura), Futura, sans-serif', fontWeight: 'bold' }}>
                        HF
                    </h2>
                </motion.div>

                {/* Outer Expanding Container */}
                <motion.div 
                    className="absolute inset-0 z-20 w-full h-full flex flex-col justify-center items-center overflow-hidden"
                    style={{ clipPath: outerClipPath }}
                >
                    {/* Background Image (Outer) */}
                    <div className="absolute inset-0 w-full h-full z-0">
                        <Image 
                            src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=2000" // Placeholder ocean/horizon
                            alt="Horizon View" 
                            fill 
                            className="object-cover"
                        />
                    </div>

                    {/* Inner Expanding Box */}
                    <motion.div 
                        className="relative z-10 shadow-2xl overflow-hidden"
                        style={{ width: innerWidth, height: innerHeight }}
                    >
                        <Image 
                            // Placeholder architectural/pool view
                            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1920" 
                            alt="Interior View" 
                            fill 
                            className="object-cover"
                        />
                    </motion.div>
                    
                </motion.div>

            </div>
        </section>
    );
}
