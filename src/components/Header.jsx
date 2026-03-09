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
                ? "bg-[#EDEDED] text-[#163548] border-[#163548]/10 py-4 shadow-sm"
                : "bg-transparent text-[#EDEDED] border-transparent py-6"
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
                            <span className={`w-5 h-[2px] transition-colors ${scrolled ? 'bg-[#163548]' : 'bg-[#EDEDED]'}`}></span>
                            <span className={`w-5 h-[2px] transition-colors ${scrolled ? 'bg-[#163548]' : 'bg-[#EDEDED]'}`}></span>
                            <span className={`w-3 h-[2px] transition-colors ${scrolled ? 'bg-[#163548]' : 'bg-[#EDEDED]'}`}></span>
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
                            className="relative w-48 h-12 md:w-[300px] md:h-[75px]"
                        >
                            <Image
                                src={scrolled ? "/images/logo-black.png" : "/images/logo.png"}
                                alt="HF Realtors Logo"
                                fill
                                className={`object-contain transition-all duration-500 ${!scrolled ? "brightness-0 invert" : ""}`}
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
