"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function MagneticButton({
    children,
    className = "",
    onClick,
    href = null,
    variant = "solid"
}) {
    const buttonRef = useRef(null);

    // Framer Motion values for the magnetic pull effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Apply spring physics for snappy, liquid movement
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const smoothX = useSpring(x, springConfig);
    const smoothY = useSpring(y, springConfig);

    // Liquid Fill State (tracks where the cursor entered from)
    const [fillCoords, setFillCoords] = useState({ x: "50%", y: "50%" });
    const [isHovered, setIsHovered] = useState(false);

    // Handle the magnetic tracking and calculate fill origin
    const handleMouseMove = (e) => {
        if (!buttonRef.current) return;

        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();

        // Calculate cursor position relative to the center of the button
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Magnetic Pull Strength (lower divider = stronger pull)
        const pullStrength = 3;
        const distanceX = (e.clientX - centerX) / pullStrength;
        const distanceY = (e.clientY - centerY) / pullStrength;

        x.set(distanceX);
        y.set(distanceY);

        // Calculate where the cursor is inside the button (percentage) for the liquid fill
        const localX = e.clientX - left;
        const localY = e.clientY - top;

        // Only update fill coordinates when the mouse first enters to pin the origin point
        if (!isHovered) {
            setFillCoords({
                x: `${(localX / width) * 100}%`,
                y: `${(localY / height) * 100}%`
            });
        }
    };

    const handleMouseEnter = (e) => {
        setIsHovered(true);
        handleMouseMove(e); // Initialize coordinates immediately
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        // Reset magnetic pull
        x.set(0);
        y.set(0);
    };

    const getVariantStyles = () => {
        switch (variant) {
            case "solid":
                return {
                    baseClasses: "gold-gradient",
                    fillColor: "#163548",
                    textColor: isHovered ? "#EDEDED" : "#163548",
                };
            case "outline":
                return {
                    baseClasses: "border border-[#CCA14D] bg-transparent hover:bg-[#CCA14D]/5",
                    fillColor: "linear-gradient(to right, #CCA14D, #FFED7E)",
                    textColor: isHovered ? "#163548" : "#EDEDED",
                };
            case "white-solid":
                return {
                    baseClasses: "bg-[#EDEDED]",
                    fillColor: "#163548",
                    textColor: isHovered ? "#EDEDED" : "#163548",
                };
            case "white-outline":
                return {
                    baseClasses: "border border-[#EDEDED]/50 bg-transparent hover:border-[#EDEDED]",
                    fillColor: "#EDEDED",
                    textColor: isHovered ? "#163548" : "#EDEDED",
                };
            default:
                return { baseClasses: "", fillColor: "", textColor: "" };
        }
    };
    const styles = getVariantStyles();

    // The base structural classes ensuring global consistency
    const baseClasses = `relative overflow-hidden rounded-[4rem] px-10 py-4 flex items-center justify-center cursor-pointer transition-colors duration-300 ${styles.baseClasses} ${className}`;

    // Content rendering wrapper
    const Wrapper = href ? motion.a : motion.button;
    const wrapperProps = href ? { href } : { onClick };

    return (
        <Wrapper
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ x: smoothX, y: smoothY }}
            className={baseClasses}
            {...wrapperProps}
        >
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: isHovered ? window.innerWidth < 768 ? 25 : 15 : 0,
                    opacity: isHovered ? 1 : 0
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    left: fillCoords.x,
                    top: fillCoords.y,
                    background: styles.fillColor
                }}
                className="absolute w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
            />

            <span
                className="relative z-10 font-sans font-semibold text-[13px] md:text-sm tracking-widest pointer-events-none whitespace-nowrap transition-colors duration-300 uppercase"
                style={{ color: styles.textColor }}
            >
                {children}
            </span>
        </Wrapper>
    );
}
