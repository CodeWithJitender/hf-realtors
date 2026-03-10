"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Button({
    children,
    className = "",
    onClick,
    href = null,
    variant = "solid" // "solid" | "outlined"
}) {
    const buttonRef = useRef(null);

    // Framer Motion values for the magnetic pull effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Apply spring physics: Stiffness 150, Damping 20
    const springConfig = { damping: 20, stiffness: 150, mass: 0.1 };
    const smoothX = useSpring(x, springConfig);
    const smoothY = useSpring(y, springConfig);

    // Liquid Fill State (tracks where the cursor entered from)
    const [fillCoords, setFillCoords] = useState({ x: "50%", y: "50%" });
    const [isHovered, setIsHovered] = useState(false);

    // Handle the magnetic tracking and calculate fill origin
    const handleMouseMove = (e) => {
        if (!buttonRef.current) return;

        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const rawX = e.clientX - centerX;
        const rawY = e.clientY - centerY;

        // Cap to 60px radius
        const distance = Math.sqrt(rawX * rawX + rawY * rawY);
        const radius = 60;
        
        let targetX = rawX;
        let targetY = rawY;

        if (distance > radius) {
            targetX = (rawX / distance) * radius;
            targetY = (rawY / distance) * radius;
        }

        // Apply magnetic pull (divided by a factor for natural movement vs cursor position)
        x.set(targetX / 2);
        y.set(targetY / 2);

        const localX = e.clientX - left;
        const localY = e.clientY - top;

        if (!isHovered) {
            setFillCoords({
                x: `${(localX / width) * 100}%`,
                y: `${(localY / height) * 100}%`
            });
        }
    };

    const handleMouseEnter = (e) => {
        setIsHovered(true);
        handleMouseMove(e);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    // Define Variant Styles
    const getVariantStyles = () => {
        if (variant === "outlined") {
            return {
                bgClass: "bg-transparent",
                borderClass: "bg-[linear-gradient(to_right,#CCA14D,#FFED7E)]", // Gold Gradient Border
                paddingClass: "p-[2px]", // Creates 2px border
                fillColor: "#EDEDED", // White goo
                textColor: isHovered ? "#163548" : "#FFED7E", // Light gold -> Deep Navy
            };
        }
        
        // Default: solid
        return {
            bgClass: "bg-[#163548]", // Deep Navy
            borderClass: "bg-[linear-gradient(to_right,#CCA14D,#FFED7E)]", // Gold Gradient Border
            paddingClass: "p-[2px]", // Creates 2px border
            fillColor: "#EDEDED", // White goo
            textColor: isHovered ? "#163548" : "#EDEDED", // Off-white -> Deep Navy
        };
    };

    const styles = getVariantStyles();

    const baseClasses = `relative rounded-[4rem] group flex items-center justify-center cursor-pointer transition-colors duration-300 isolate ${className}`;

    const Wrapper = href ? motion.a : motion.button;
    const wrapperProps = href ? { href } : { onClick };

    return (
        <Wrapper
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ x: smoothX, y: smoothY }}
            animate={{ scale: isHovered ? 1.03 : 1 }}
            whileTap={{ scale: 0.97 }}
            className={baseClasses}
            {...wrapperProps}
        >
            {/* Embedded SVG filter for Gooey effect */}
            <svg style={{ visibility: "hidden", position: "absolute" }} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id={`goo-${variant}`}>
                        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            {/* Static Gold Gradient Border with Inner Background */}
            <div 
                className={`absolute inset-0 rounded-[4rem] z-[-1] pointer-events-none ${styles.borderClass} ${styles.paddingClass}`}
                style={variant === "outlined" ? {
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                } : {}}
            >
                {/* Inner Background */}
                <div className={`w-full h-full rounded-[calc(4rem-2px)] ${styles.bgClass}`} />
            </div>

            {/* Inner Mask with Gooey Filter for Liquid Fill */}
            <div
                className={`absolute inset-[2px] rounded-[calc(4rem-2px)] z-0 transition-colors duration-300 pointer-events-none overflow-hidden`}
                style={{ filter: `url(#goo-${variant})` }}
            >
                <div className="absolute inset-0 bg-transparent" />

                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: isHovered ? 35 : 0,
                        opacity: isHovered ? 1 : 0
                    }}
                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                    style={{
                        left: fillCoords.x,
                        top: fillCoords.y,
                        background: styles.fillColor,
                        width: '30px',
                        height: '30px'
                    }}
                    className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[1]"
                />
            </div>

            {/* Actual Content */}
            <span
                className="relative z-10 px-10 py-4 w-full h-full flex items-center justify-center font-sans font-medium text-[13px] md:text-sm tracking-widest pointer-events-none whitespace-nowrap transition-colors duration-500 uppercase"
                style={{ color: styles.textColor, fontFamily: 'var(--font-poppins), sans-serif', fontWeight: 500 }}
            >
                {children}
            </span>
        </Wrapper>
    );
}
