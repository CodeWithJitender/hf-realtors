"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const MotionLink = motion(Link);

export default function Button({
    children,
    className = "",
    onClick,
    href = "#",
    variant = "solid",
    showArrow = true
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
                borderClass: "bg-[linear-gradient(to_right,#E8C96A,#E8C96A)]", // Gold Gradient Border
                paddingClass: "p-[2px]", // Creates 2px border
                fillColor: "#EDEDED", // White goo
                textColor: isHovered ? "#0A1628" : "#EDEDED", // White -> Deep Navy
            };
        }
        if (variant === "white-outlined") {
            return {
                bgClass: "bg-transparent",
                borderClass: "bg-white", // Solid White Border
                paddingClass: "p-[1px]", // Creates 1px border like perfectly drawn outline
                fillColor: "#EDEDED", // Pure white goo
                textColor: isHovered ? "#000000" : "#EDEDED", // White -> Black text
            };
        }

        if (variant === "gold") {
            return {
                bgClass: "bg-[linear-gradient(to_right,#B8913A,#E8C96A)]",
                borderClass: "bg-[linear-gradient(to_right,#B8913A,#E8C96A)]",
                paddingClass: "p-0",
                fillColor: "#0A1628",
                textColor: isHovered ? "#E8C96A" : "#0A1628",
            };
        }

        // Default: solid
        return {
            bgClass: "bg-[#0A1628]", // Deep Navy
            borderClass: "bg-[linear-gradient(to_right,#E8C96A,#E8C96A)]", // Gold Gradient Border
            paddingClass: "p-[2px]", // Creates 2px border
            fillColor: "#EDEDED", // White goo
            textColor: isHovered ? "#0A1628" : "#EDEDED", // Off-white -> Deep Navy
        };
    };

    const styles = getVariantStyles();

    const baseClasses = `relative rounded-[4rem] group inline-flex items-center justify-center cursor-pointer transition-colors duration-300 isolate ${className}`;

    const Wrapper = MotionLink;
    const wrapperProps = { href, rel: "noopener noreferrer", onClick };

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
                style={(variant === "outlined" || variant === "white-outlined") ? {
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
                className="relative z-10 flex items-center justify-center gap-2 font-bold text-[13px] md:text-sm tracking-widest pointer-events-none whitespace-nowrap transition-colors duration-500 uppercase px-8 py-4"
                style={{ color: styles.textColor, fontFamily: "'Futura', var(--font-inter), sans-serif", fontWeight: 700 }}
            >
                {children}
                {showArrow && <ChevronRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform flex-shrink-0" />}
            </span>
        </Wrapper>
    );
}
