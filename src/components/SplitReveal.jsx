"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";

const SplitText = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-12 lg:px-24 w-full h-full pointer-events-none">
        <h2 className="font-sans font-bold uppercase leading-[0.85] tracking-tighter text-[#CCA14D] drop-shadow-2xl text-[8vw] sm:text-[7vw] lg:text-[6.5vw] max-w-[95vw]">
            We sell real estate that <br />
            evokes emotions. We give a new <br />
            sense of self.
        </h2>
    </div>
);

export default function SplitReveal() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        // Doors animate over the full 250vh height of this standalone section
        offset: ["start start", "end end"]
    });

    // Left half moves out to -100%, right half moves out to 100%
    const leftX = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "-100%"]);
    const rightX = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

    return (
        // Standalone 250vh section — no children, just the shutter transition
        <section ref={containerRef} className="relative w-full h-[250vh] bg-[#163548]">

            {/* The Sticky Split Doors */}
            <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">

                {/* Left Half Container */}
                <motion.div
                    style={{ x: leftX, clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
                    className="absolute inset-0 bg-[#163548] z-50 will-change-transform"
                >
                    <Image src="/images/hero.png" alt="Split Left" fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-[#163548]/80 mix-blend-multiply" />
                    <SplitText />
                </motion.div>

                {/* Right Half Container */}
                <motion.div
                    style={{ x: rightX, clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }}
                    className="absolute inset-0 bg-[#163548] z-50 will-change-transform"
                >
                    <Image src="/images/hero.png" alt="Split Right" fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-[#163548]/80 mix-blend-multiply" />
                    <SplitText />
                </motion.div>

            </div>
        </section>
    );
}
