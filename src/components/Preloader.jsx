"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Force overflow hidden on mount, then restore when animation finishes
        document.body.style.overflow = "hidden";

        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "auto";
        }, 3500); // Failsafe duration

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "auto";
        };
    }, []);

    // If completely done loading and animated, remove from DOM
    if (!isLoading) return null;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 2.5, ease: "linear" }}
            onAnimationComplete={() => {
                setIsLoading(false);
                document.body.style.overflow = "auto";
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
        >
            {/* 
              The Circle SVG Mask.
              We use an enormous viewBox so the "background" of the SVG covers the whole screen,
              while the cutout remains small in the center. Then we scale the whole thing.
            */}
            <motion.svg
                viewBox="-5000 -5000 10000 10000"
                className="w-full h-full absolute inset-0 object-cover"
                preserveAspectRatio="xMidYMid slice"
                initial={{ scale: 1 }}
                animate={{ scale: 300 }}
                transition={{
                    duration: 2.0,
                    delay: 0.5, // Start expanding sooner
                    ease: [0.76, 0, 0.24, 1] // Custom smooth cinematic easing
                }}
            >
                {/* 
                  Compound Path: 
                  Draws a massive outer rectangle (-5000 to 5000) 
                  AND a small keyhole shape in the center (around 0,0).
                  The EvenOdd fill rule punches the keyhole out of the rectangle.
                */}
                <path
                    fill="#EDEDED" // Light Gray/Off-White base bg
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="
                        M-5000,-5000 H5000 V5000 H-5000 Z 
                        M 40,0 
                        A 40,40 0 1,0 -40,0 
                        A 40,40 0 1,0 40,0 
                        Z
                    "
                />
            </motion.svg>

        </motion.div>
    );
}
