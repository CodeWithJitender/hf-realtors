"use client";

import Link from "next/link";
import { Mail, Linkedin, MessagesSquare } from "lucide-react";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-[#121212] text-white pt-24 pb-8 px-6 md:px-12 flex flex-col items-center justify-center relative z-20 overflow-hidden">

            {/* Top Section: Massive Hook */}
            <div className="text-center mb-16 relative">
                <RevealText delay={0.1} as="h2" className="text-6xl md:text-8xl lg:text-9xl font-black uppercase text-[#F9F8F6] mb-2 leading-[0.9] tracking-tight">
                    <span className="block">LET'S WORK</span>
                    <span className="block">TOGETHER</span>
                </RevealText>
            </div>

            {/* Middle Section: Contact Info */}
            <div className="flex flex-col items-center mb-16">
                <RevealText delay={0.2} className="mb-4">
                    <p className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-[#F9F8F6]/60 uppercase">
                        CONNECT WITH ME
                    </p>
                </RevealText>
                <RevealText delay={0.3}>
                    <MagneticButton
                        href="mailto:HELLO@HFREALTORS.COM"
                        className="text-2xl md:text-4xl lg:text-5xl border-transparent hover:border-white/20 transition-all px-12 py-8 bg-transparent"
                    >
                        HELLO@HFREALTORS.COM
                    </MagneticButton>
                </RevealText>
            </div>

            {/* Social Row */}
            <div className="flex items-center gap-4 md:gap-6 mb-24">
                <SocialIcon icon={<MessagesSquare className="w-5 h-5" />} href="#" label="WhatsApp" />
                <SocialIcon icon={<Mail className="w-5 h-5" />} href="mailto:hello@hfrealtors.com" label="Email" />
                <SocialIcon icon={<Linkedin className="w-5 h-5" />} href="#" label="LinkedIn" />
                <SocialIcon text="Bē" href="#" label="Behance" />
            </div>

            {/* Bottom Meta Row */}
            <div className="w-full max-w-7xl border-t border-white/10 pt-8 mt-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] md:text-xs text-stone-500 font-medium tracking-wide">

                <div className="text-center md:text-left">
                    &copy; {currentYear} HF Realtors
                </div>

                <div className="text-center md:flex-1">
                    Made with love and creative juices
                </div>

                <nav className="flex items-center gap-4 text-center md:text-right">
                    <Link href="/" className="hover:text-stone-300 transition-colors">Home</Link>
                    <span className="opacity-30">-</span>
                    <Link href="/about" className="hover:text-stone-300 transition-colors">About</Link>
                    <span className="opacity-30">-</span>
                    <Link href="/work" className="hover:text-stone-300 transition-colors">Work</Link>
                    <span className="opacity-30">-</span>
                    <Link href="/contact" className="hover:text-stone-300 transition-colors">Contact</Link>
                </nav>

            </div>
        </footer>
    );
}

// Sub-component for the circular social icons with the specific reddish background
function SocialIcon({ icon, text, href, label }) {
    return (
        <a
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F9F8F6] hover:bg-[#F9F8F6] hover:text-[#1A1A1A] hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg"
        >
            {icon ? (
                icon
            ) : (
                <span className="font-bold text-lg md:text-xl">{text}</span>
            )}
        </a>
    );
}
