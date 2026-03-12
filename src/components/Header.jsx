"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import NavigationMenu from "./NavigationMenu";

// Pages that start with a light background — header must use dark text at top
const LIGHT_BG_PAGES = ["/contact-us"];

export default function Header() {
    const pathname = usePathname();
    const isLightPage = LIGHT_BG_PAGES.includes(pathname);

    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        
        // Background coloring trigger
        setScrolled(latest > 50);

        // Hide/Show logic based on scroll direction
        if (latest > previous && latest > 150) {
            setHidden(true); // Scrolling down - hide
        } else {
            setHidden(false); // Scrolling up - reveal
        }
    });

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" }
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 w-full z-50 transition-colors duration-500 border-b ${
                scrolled
                    ? "bg-[#EDEDED] text-[#163548] border-[#163548]/10 py-4 shadow-sm"
                    : isLightPage
                        ? "bg-transparent text-[#CCA14D] border-transparent py-6"
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
                            <span className={`w-5 h-[2px] transition-colors ${scrolled ? 'bg-[#163548]' : isLightPage ? 'bg-[#CCA14D]' : 'bg-[#EDEDED]'}`}></span>
                            <span className={`w-5 h-[2px] transition-colors ${scrolled ? 'bg-[#163548]' : isLightPage ? 'bg-[#CCA14D]' : 'bg-[#EDEDED]'}`}></span>
                            <span className={`w-3 h-[2px] transition-colors ${scrolled ? 'bg-[#163548]' : isLightPage ? 'bg-[#CCA14D]' : 'bg-[#EDEDED]'}`}></span>
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
                                className={`object-contain transition-all duration-500 ${
                                    scrolled ? "" : isLightPage ? "" : "brightness-0 invert"
                                }`}
                                priority
                            />
                        </motion.div>
                    </a>
                </div>

                {/* Right: Contact Us */}
                <div className="flex justify-end hidden sm:flex">
                    <a
                        href="/contact-us"
                        className="text-xs font-semibold tracking-widest uppercase hover:opacity-70 transition-opacity mt-0.5"
                    >
                        Contact Us
                    </a>
                </div>

            </div>

            <NavigationMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />
        </motion.header>
    );
}
