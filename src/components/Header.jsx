"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import NavigationMenu from "./NavigationMenu";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled
                ? "bg-[#1A1A1A] text-[#F9F8F6] border-white/10 py-4 shadow-sm"
                : "bg-transparent text-[#F9F8F6] border-transparent py-6"
                }`}
        >
            <div className="grid grid-cols-3 items-center px-6 md:px-12 w-full">

                {/* Left: Menu Trigger */}
                <div className="flex justify-start">
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="flex items-center gap-3 group hover:opacity-70 transition-opacity"
                    >
                        <div className="flex flex-col gap-[3px]">
                            <span className={`w-5 h-[2px] transition-colors bg-[#F9F8F6]`}></span>
                            <span className={`w-5 h-[2px] transition-colors bg-[#F9F8F6]`}></span>
                            <span className={`w-3 h-[2px] transition-colors bg-[#F9F8F6]`}></span>
                        </div>
                        <span className="hidden md:block text-xs font-semibold tracking-widest uppercase mt-0.5">
                            Menu
                        </span>
                    </button>
                </div>

                {/* Center: Logo */}
                <div className="flex justify-center relative z-10">
                    <a href="/" className="block">
                        <motion.div
                            animate={{ y: [-2, 2, -2] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                            className="relative w-32 h-8 md:w-40 md:h-10"
                        >
                            <Image
                                src="https://headfield.com/wp-content/uploads/2023/01/Headfield-white.png"
                                alt="HF Realtors Logo"
                                fill
                                className={`object-contain transition-all duration-500`}
                                priority
                            />
                        </motion.div>
                    </a>
                </div>

                {/* Right: Contact Us */}
                <div className="flex justify-end hidden sm:flex">
                    <a
                        href="#contact"
                        className="text-xs font-semibold tracking-widest uppercase hover:opacity-70 transition-opacity mt-0.5"
                    >
                        Contact Us
                    </a>
                </div>

            </div>

            <NavigationMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />
        </header>
    );
}
