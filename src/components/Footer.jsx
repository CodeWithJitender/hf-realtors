"use client";

import Link from "next/link";
import { Mail, Linkedin, MessagesSquare } from "lucide-react";
import RevealText from "@/components/RevealText";
import Button from "@/components/Button";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-[#0A1628] text-[#EDEDED] py-fluid-section px-fluid-container flex flex-col items-center justify-center relative z-20">

            {/* Top Section: Massive Hook */}
            <div className="text-center mb-16 relative">
                <RevealText delay={0.1} as="h2" className="text-6xl md:text-8xl lg:text-9xl font-medium uppercase text-[#EDEDED] mb-2 leading-[1] tracking-tight drop-shadow-md">
                    <span className="block" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>LET'S WORK</span>
                    <span className="block" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>TOGETHER</span>
                </RevealText>
            </div>

            {/* Middle Section: Contact Info */}
            <div className="flex flex-col items-center mb-16">
                <RevealText delay={0.2} className="mb-4">
                    <p className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-[#E8C96A] uppercase" style={{ fontFamily: "var(--font-inter), 'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500 }}>
                        CONNECT WITH US
                    </p>
                </RevealText>
                <RevealText delay={0.3}>
                    <Button
                        href="mailto:HELLO@HFREALTORS.COM"
                        variant="outlined"
                        showArrow={false}
                        className="border-transparent hover:border-[#E8C96A]/20 transition-all bg-transparent text-[#E8C96A] hover:text-[#0A1628]"
                    >
                        <span style={{ fontFamily: "var(--font-inter), 'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500 }}>HELLO@HFREALTORS.COM</span>
                    </Button>
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
            <div className="w-full max-w-7xl border-t border-[#EDEDED]/10 pt-8 mt-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] md:text-xs text-[#EDEDED]/60 font-medium tracking-wide">

                <div className="text-center md:text-left" style={{ fontFamily: "var(--font-inter), 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                    &copy; {currentYear} HF Realtors
                </div>


                <nav className="flex items-center gap-4 text-center md:text-right" style={{ fontFamily: "var(--font-inter), 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                    <Link href="/" className="hover:text-[#E8C96A] transition-colors">Home</Link>
                    <span className="opacity-30">-</span>
                    <Link href="/about-us" className="hover:text-[#E8C96A] transition-colors">About</Link>
                    <span className="opacity-30">-</span>
                    <Link href="/services" className="hover:text-[#E8C96A] transition-colors">Services</Link>
                    <span className="opacity-30">-</span>
                    <Link href="/contact-us" className="hover:text-[#E8C96A] transition-colors">Contact</Link>
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
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#EDEDED]/5 border border-[#EDEDED]/10 flex items-center justify-center text-[#EDEDED] hover:bg-[#E8C96A] hover:text-[#0A1628] hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg"
        >
            {icon ? (
                icon
            ) : (
                <span className="font-bold text-lg md:text-xl">{text}</span>
            )}
        </a>
    );
}
