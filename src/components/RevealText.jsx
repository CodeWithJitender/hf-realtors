"use client";

import { motion } from "framer-motion";

/**
 * A reusable component that implements the 'Telha Clarke' Staggered Mask Reveal animation.
 * It wraps children in an `overflow-hidden` container and slides them up gracefully.
 */
export default function RevealText({
    children,
    className = "",
    delay = 0,
    duration = 0.8,
    as: Component = "div"
}) {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                    duration: duration,
                    delay: delay,
                    ease: [0.16, 1, 0.3, 1], // The signature high-end cubic-bezier
                }}
            >
                <Component className="block">
                    {children}
                </Component>
            </motion.div>
        </div>
    );
}
