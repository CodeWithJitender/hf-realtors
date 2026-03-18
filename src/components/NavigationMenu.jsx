import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Services", href: "/services" },
    { name: "Contact Us", href: "/contact-us" },
];

export default function NavigationMenu({ isOpen, setIsOpen }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex">
                    {/* Backdrop Overlay - clicks outside the menu close it */}
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
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Signature ease
                        className="relative w-full md:w-1/2 lg:w-[45%] h-full flex flex-col justify-between overflow-hidden shadow-2xl"
                        style={{ backgroundColor: "#0A1628", color: "#FFFFFF", borderRight: "1px solid rgba(232,201,106,0.15)" }}
                    >
                        {/* Top Header Row of the Menu */}
                        <div className="grid grid-cols-1 items-center px-6 md:px-12 py-6 w-full">
                            <div className="flex justify-start">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-xs font-semibold tracking-widest uppercase hover:opacity-70 transition-opacity flex items-center gap-2"
                                >
                                    CLOSE
                                </button>
                            </div>
                        </div>

                        {/* Massive Navigation Links */}
                        <div className="flex-grow flex flex-col justify-center px-6 md:px-12 pl-6 md:pl-24">
                            <div className="flex flex-col gap-2 md:gap-4">
                                {navLinks.map((link, i) => (
                                    <div key={i} className="overflow-hidden">
                                        <motion.div
                                            initial={{ y: "120%", opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: "100%", opacity: 0 }}
                                            transition={{
                                                duration: 0.8,
                                                ease: [0.16, 1, 0.3, 1],
                                                delay: 0.3 + i * 0.08, // Staggered delay after background drops
                                            }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className="text-5xl md:text-7xl lg:text-[7rem] font-medium tracking-tighter leading-none hover:text-[#E8C96A] transition-colors block"
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer Row of the Menu */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="flex flex-col md:flex-row justify-between items-start md:items-end px-6 md:px-12 pb-12 w-full gap-8"
                        >
                            <div className="flex flex-col text-sm font-semibold tracking-widest uppercase gap-1">
                                {/* <p>HF REALTORS</p> */}
                                <a href="mailto:hello@hfrealtors.com" className="hover:opacity-70 transition-opacity">
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
        </AnimatePresence>
    );
}
