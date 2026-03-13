"use client";

import { useEffect, useRef, createContext, useContext } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin once
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const LenisContext = createContext(null);

/**
 * useLenis — Access the Lenis instance from any client component.
 * Example: const lenis = useLenis(); lenis?.scrollTo("#section");
 */
export function useLenis() {
    return useContext(LenisContext);
}

/**
 * SmoothScrollProvider
 * - Initialises Lenis globally with a premium smooth-scroll feel.
 * - Syncs Lenis tick → GSAP ScrollTrigger so all GSAP scroll animations stay in sync.
 * - Syncs Lenis → Framer Motion automatically (FM reads native scrollY, which Lenis updates).
 * - Disabled on touch devices (smoothTouch: false) to preserve native mobile feel.
 */
export default function SmoothScrollProvider({ children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            // Lerp controls the inertia feel (0 = instant, 1 = never arrives)
            // 0.1 = tight/premium, 0.07 = very silky
            lerp: 0.1,
            // Exponential ease — feels silky and expensive on wheel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            // Disable smooth on touch to preserve native mobile inertia
            smoothTouch: false,
            // Multipliers — keep at default 1 for predictable feel
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // Sync Lenis scroll events → GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // Drive Lenis via GSAP's ticker for perfectly synced, rAF-aligned updates
        const tickerCallback = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0); // Prevent jump on tab re-focus

        return () => {
            gsap.ticker.remove(tickerCallback);
            lenis.destroy();
        };
    }, []);

    return (
        <LenisContext.Provider value={lenisRef}>
            {children}
        </LenisContext.Provider>
    );
}
