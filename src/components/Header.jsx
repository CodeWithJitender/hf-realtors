"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import NavigationMenu from "./NavigationMenu";
import Link from "next/link";

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
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled
                ? "border-[rgba(232,201,106,0.15)] py-4"
                : "border-transparent py-6"
            }`}
        style={scrolled ? { backgroundColor: "rgba(10,22,40,0.95)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", color: "#E8C96A" } : { backgroundColor: "transparent", color: "#E8C96A" }}
        >
            {/* ── Desktop layout: 3-column grid (menu | logo | contact) ── */}
            <div className="hidden md:grid grid-cols-3 items-center px-12 w-full">

                {/* Left: Menu Trigger */}
                <div className="flex justify-start">
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="flex items-center gap-3 group hover:opacity-70 transition-opacity"
                    >
                        <div className="flex flex-col gap-[3px]">
                            <span className="w-5 h-[2px] bg-[#E8C96A]"></span>
                            <span className="w-5 h-[2px] bg-[#E8C96A]"></span>
                            <span className="w-3 h-[2px] bg-[#E8C96A]"></span>
                        </div>
                        <span className="text-xs font-semibold tracking-widest uppercase mt-0.5">
                            Menu
                        </span>
                    </button>
                </div>

                {/* Center: Logo */}
                <div className="flex justify-center relative z-10">
                    <Link href="/" className="block">
                        <motion.div
                            animate={{ y: [-2, 2, -2] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                            className="relative w-[300px] h-[75px]"
                        >
                            <Image
                                src="/images/logo.png"
                                alt="HF Realtors Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>
                    </Link>
                </div>

                {/* Right: Contact Us */}
                <div className="flex justify-end">
                    <Link
                        href="/contact-us"
                        className="text-xs font-semibold tracking-widest uppercase hover:opacity-70 transition-opacity mt-0.5"
                    >
                        Contact Us
                    </Link>
                </div>

            </div>

            {/* ── Mobile layout: logo left, hamburger right ── */}
            <div className="flex md:hidden items-center justify-between px-6 w-full">

                {/* Left: Logo */}
                <Link href="/" className="block relative z-10">
                    <motion.div
                        animate={{ y: [-2, 2, -2] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                        className="relative w-40 h-10"
                    >
                        <Image
                            src="/images/logo.png"
                            alt="HF Realtors Logo"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </motion.div>
                </Link>

                {/* Right: Hamburger */}
                <button
                    onClick={() => setMenuOpen(true)}
                    className="flex flex-col gap-[3px] hover:opacity-70 transition-opacity"
                >
                    <span className="w-5 h-[2px] bg-[#E8C96A]"></span>
                    <span className="w-5 h-[2px] bg-[#E8C96A]"></span>
                    <span className="w-3 h-[2px] bg-[#E8C96A]"></span>
                </button>

            </div>

            <NavigationMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />
        </motion.header>
    );
}
