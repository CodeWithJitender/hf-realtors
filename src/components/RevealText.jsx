"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { usePreloader } from "@/context/PreloaderContext";

/**
 * A reusable component that implements the 'Telha Clarke' Staggered Mask Reveal animation.
 * It wraps children in an `overflow-hidden` container and slides them up gracefully.
 *
 * - Elements visible on initial load wait for the Preloader to finish before animating.
 * - Elements below the fold use standard `whileInView` scroll-triggered reveals.
 */
export default function RevealText({
    children,
    className = "",
    delay = 0,
    duration = 0.8,
    as: Component = "div"
}) {
    const { isPreloaderDone } = usePreloader();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    // Only animate when BOTH conditions are met:
    // 1. The preloader has finished its exit sequence
    // 2. The element is within the viewport
    const shouldAnimate = isPreloaderDone && isInView;

    return (
        <div ref={ref} className={`relative ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{
                    duration: duration,
                    delay: delay,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                <Component className="block">
                    {children}
                </Component>
            </motion.div>
        </div>
    );
}
