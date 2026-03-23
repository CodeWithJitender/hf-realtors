"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Services", href: "/services" },
    { name: "Contact Us", href: "/contact-us" },
];

export default function NavigationMenu({ isOpen, setIsOpen }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1001] flex">
                    {/* Backdrop Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Left-aligned Half-Screen Menu Panel */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full md:w-1/2 lg:w-[45%] h-full flex flex-col justify-between overflow-hidden shadow-2xl"
                        style={{
                            backgroundColor: "#0A1628",
                            color: "#FFFFFF",
                            borderRight: "1px solid rgba(232,201,106,0.15)",
                        }}
                    >
                        {/* Close Button */}
                        <div className="flex items-center px-6 md:px-12 py-6">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-xs font-semibold tracking-widest uppercase hover:opacity-70 transition-opacity flex items-center gap-2"
                            >
                                CLOSE
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <NavLinks setIsOpen={setIsOpen} />

                        {/* Footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="flex flex-col md:flex-row justify-between items-start md:items-end px-6 md:px-12 pb-12 w-full gap-8"
                        >
                            <div className="flex flex-col text-sm font-semibold tracking-widest uppercase gap-1">
                                <a
                                    href="mailto:hello@hfrealtors.com"
                                    className="hover:opacity-70 transition-opacity"
                                >
                                    HELLO@HFREALTORS.COM
                                </a>
                            </div>
                            <div className="text-sm font-semibold tracking-widest uppercase hover:opacity-70 transition-opacity pb-1">
                                <a href="#">LINKEDIN</a>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}

function NavLinks({ setIsOpen }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className="flex-grow flex flex-col justify-center px-6 md:px-12 pl-6 md:pl-24">
            <div className="flex flex-col gap-2 md:gap-4">
                {navLinks.map((link, i) => (
                    <div key={i} className="overflow-hidden">
                        {/* Entry animation wrapper */}
                        <motion.div
                            initial={{ y: "120%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1],
                                delay: 0.3 + i * 0.08,
                            }}
                        >
                            {/* Hover interaction wrapper */}
                            <motion.div
                                className="relative inline-block cursor-pointer"
                                animate={{
                                    opacity:
                                        hoveredIndex === null || hoveredIndex === i ? 1 : 0.25,
                                    x: hoveredIndex === i ? 14 : 0,
                                }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                onHoverStart={() => setHoveredIndex(i)}
                                onHoverEnd={() => setHoveredIndex(null)}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="font-medium tracking-tighter leading-none block"
                                    style={{
                                        fontSize: "var(--text-fluid-nav)",
                                        color:
                                            hoveredIndex === i ? "transparent" : "#FFFFFF",
                                        backgroundImage:
                                            hoveredIndex === i
                                                ? "linear-gradient(90deg, #9C772E, #FFED7E, #9C772E)"
                                                : "none",
                                        backgroundClip:
                                            hoveredIndex === i ? "text" : "unset",
                                        WebkitBackgroundClip:
                                            hoveredIndex === i ? "text" : "unset",
                                        transition: "color 0.3s ease",
                                    }}
                                >
                                    {link.name}
                                </Link>

                            </motion.div>

                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
}
