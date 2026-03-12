"use client";

import { useRef, useMemo } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ─── Tab Data ──────────────────────────────────────────────────────
const tabs = [
    {
        id: "who-we-are",
        label: "Who We Are",
        image: "/images/interior.png",
        type: "stats",
        title: "WHO WE ARE",
        stats: [
            { value: "20+", label: "Years Of\nExperience" },
            { value: "08", label: "Global Offices\nIn Asia Pacific" },
            { value: "3M", label: "SQM Project\nCompleted" }
        ]
    },
    {
        id: "our-values",
        label: "Our Values",
        image: "/images/hero.png",
        type: "values",
        title: "OUR VALUES",
        values: [
            { num: "01", title: "Experience", desc: "More than 20 years of\nexperiences in interior fit-out field" },
            { num: "02", title: "Expansion", desc: "8 regional offices\naround Asia Pacific" },
            { num: "03", title: "Reliable", desc: "Accountability and creditability" },
            { num: "04", title: "Performance", desc: "Solid track record" }
        ]
    },
    {
        id: "our-team",
        label: "Our Team",
        image: "/images/interior.png",
        type: "team",
        title: "Our Team",
        teamImage: "/images/hero.png",
        roles: [
            "INTERIOR DESIGNER | PROJECT MANAGEMENT | CONSTRUCTION TEAM | CAD TEAM",
            "SITE SUPERVISOR & SAFETY TEAM | MECHANICAL & ELECTRICAL | QUANTITY SURVEYOR"
        ]
    },
    {
        id: "founders",
        label: "Founders",
        image: "/images/hero.png",
        type: "founders",
        title: "Meet Our\nFounders",
        founders: [
            { name: "David Zhang", image: "/images/interior.png" },
            { name: "Molly Liu", image: "/images/hero.png" },
            { name: "Jason Pang", image: "/images/interior.png" }
        ]
    }
];

// ─── Split Door Text ───────────────────────────────────────────────
const SplitText = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-fluid-container w-full h-full pointer-events-none">
        <h2 className="font-sans font-bold uppercase leading-[0.85] tracking-tighter text-[#CCA14D] drop-shadow-2xl text-[8vw] sm:text-[7vw] lg:text-[6.5vw] max-w-[95vw]">
            We sell real estate that <br />
            evokes emotions. We give a new <br />
            sense of self.
        </h2>
    </div>
);

// ─── Tab Content Renderers ─────────────────────────────────────────
function StatsContent({ tab }) {
    return (
        <div className="flex flex-col gap-6 md:gap-12 w-full">
            <span className="font-sans font-medium text-[#FFED7E] uppercase tracking-widest text-[10px] md:text-sm mb-2 md:mb-4">{tab.title}</span>
            {tab.stats.map((stat, i) => (
                <div key={i} className="flex flex-row items-center gap-6 md:gap-8 xl:gap-16 w-full">
                    <span className="font-sans font-light text-[4rem] md:text-[6rem] xl:text-[9rem] masonry-number text-[#CCA14D] tracking-tighter min-w-[120px] md:min-w-[180px] xl:min-w-[240px] leading-none">{stat.value}</span>
                    <span className="font-sans font-medium text-base md:text-xl xl:text-3xl text-[#CCA14D] leading-tight whitespace-pre-line uppercase tracking-wide">{stat.label}</span>
                </div>
            ))}
        </div>
    );
}

function ValuesContent({ tab }) {
    return (
        <div className="flex flex-col w-full max-w-2xl">
            <span className="font-sans font-medium text-[#FFED7E] uppercase tracking-widest text-[10px] md:text-sm mb-4 md:mb-8">{tab.title}</span>
            <div className="flex flex-col rounded-2xl md:rounded-[2rem] overflow-hidden border border-[#CCA14D]/20 shadow-2xl bg-[#1D3E53]/80 backdrop-blur-md">
                {tab.values.map((val, i) => (
                    <div key={i} className="flex flex-row items-center justify-between p-6 md:p-8 xl:p-10 border-b border-[#CCA14D]/10 last:border-0 hover:bg-[#CCA14D]/5 transition-colors">
                        <div className="flex flex-col">
                            <span className="font-sans font-bold text-lg md:text-2xl text-[#CCA14D] mb-1 md:mb-3">{val.title}</span>
                            <span className="font-sans text-fluid-body text-[#EDEDED] whitespace-pre-line leading-relaxed opacity-80">{val.desc}</span>
                        </div>
                        <span className="font-sans font-light text-[3.5rem] md:text-[5rem] leading-none text-[#CCA14D] opacity-40 ml-4">{val.num}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TeamContent({ tab }) {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full relative">
            <h3 className="text-[7rem] xl:text-[12rem] tracking-tighter text-[#CCA14D] z-0 leading-none whitespace-nowrap opacity-20 absolute top-[-5rem] xl:top-[-8rem]" style={{ fontFamily: 'Futura, sans-serif' }}>{tab.title}</h3>
            <div className="relative w-full aspect-[4/3] xl:aspect-video z-10 mt-12 rounded-[2rem] overflow-hidden shadow-2xl border border-[#CCA14D]/20">
                <Image src={tab.teamImage} alt="Our Team" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#163548] via-transparent to-transparent opacity-60" />
            </div>
            <div className="mt-12 flex flex-col items-center text-center gap-4 z-20">
                {tab.roles.map((line, i) => (
                    <p key={i} className="font-sans text-xs sm:text-sm xl:text-base tracking-[0.2em] text-[#EDEDED] font-bold uppercase opacity-90">{line}</p>
                ))}
            </div>
        </div>
    );
}

function FoundersContent({ tab }) {
    return (
        <div className="flex flex-col w-full items-center lg:items-start">
            <div className="flex flex-row justify-center lg:justify-start gap-4 xl:gap-10 mb-16 w-full">
                {tab.founders.map((founder, i) => (
                    <div key={i} className="flex flex-col relative w-1/3 max-w-[200px] aspect-[4/5] group rounded-2xl overflow-hidden border border-[#CCA14D]/30 shadow-2xl bg-[#1D3E53]">
                        <Image src={founder.image} alt={founder.name} fill className="object-cover opacity-90 grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-transparent to-transparent opacity-60" />
                        <span className="absolute bottom-4 left-0 right-0 text-center font-sans font-bold text-sm xl:text-base text-[#EDEDED] px-2">{founder.name}</span>
                    </div>
                ))}
            </div>
            <h3 className="text-[6rem] xl:text-[10rem] tracking-tighter text-[#CCA14D] leading-[0.8] text-center lg:text-left" style={{ fontFamily: 'Futura, sans-serif' }}>{tab.title}</h3>
        </div>
    );
}

// ─── Render Tab Content ────────────────────────────────────────────
function TabContent({ tab }) {
    switch (tab.type) {
        case "stats": return <StatsContent tab={tab} />;
        case "values": return <ValuesContent tab={tab} />;
        case "team": return <TeamContent tab={tab} />;
        case "founders": return <FoundersContent tab={tab} />;
        default: return null;
    }
}

// ─── Main Component ────────────────────────────────────────────────
export default function SplitReveal() {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // ── Phase 1: Door Animation (0 → 0.12) ──
    const leftX = useTransform(scrollYProgress, [0.02, 0.12], ["0%", "-100%"]);
    const rightX = useTransform(scrollYProgress, [0.02, 0.12], ["0%", "100%"]);
    // Doors should disappear (pointer-events + visibility) after opening
    const doorOpacity = useTransform(scrollYProgress, [0.11, 0.12], [1, 0]);

    // ── Phase 2: Tab Content Transitions (0.15 → 0.95) ──
    // Each tab gets ~20% of the remaining scroll range
    const TAB_RANGES = [
        [0.12, 0.35],  // Who We Are
        [0.35, 0.55],  // Our Values
        [0.55, 0.75],  // Our Team
        [0.75, 0.95],  // Founders
    ];

    // Active tab index derived from scroll progress
    const activeIndex = useTransform(scrollYProgress, (v) => {
        if (v < 0.12) return 0;
        for (let i = TAB_RANGES.length - 1; i >= 0; i--) {
            if (v >= TAB_RANGES[i][0]) return i;
        }
        return 0;
    });

    // Tab content opacity transforms — each tab fades in/out within its range
    const tabOpacities = TAB_RANGES.map(([start, end]) => {
        const fadeIn = start;
        const fadeOut = end;
        return useTransform(scrollYProgress, [fadeIn - 0.03, fadeIn + 0.03, fadeOut - 0.03, fadeOut], [0, 1, 1, 0]);
    });

    // Tab content Y transforms — slide up into view
    const tabYs = TAB_RANGES.map(([start, end]) => {
        return useTransform(scrollYProgress, [start - 0.03, start + 0.03, end - 0.03, end], [40, 0, 0, -40]);
    });

    // Left panel image (crossfade based on active tab)
    const tabImageOpacities = tabs.map((_, i) => {
        const [start, end] = TAB_RANGES[i];
        return useTransform(scrollYProgress, [start - 0.02, start + 0.02, end - 0.02, end], [0, 1, 1, 0]);
    });

    // Vertical rail dot position
    const dotTop = useTransform(scrollYProgress, [0.15, 0.95], ["5%", "95%"]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-[#163548]"
            style={{ height: "700vh" }}
        >
            {/* ── Sticky Viewport ── */}
            <div className="sticky top-0 w-full h-screen overflow-hidden">

                {/* ═══════════════════ LAYER 0: About Us Content ═══════════════════ */}
                <div className="absolute inset-0 z-0 flex flex-col md:flex-row w-full h-full text-[#EDEDED] px-fluid-container py-fluid-section">

                    {/* ── Left Panel (static within sticky) ── */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center lg:pr-12 z-10">

                        <span className="font-sans font-medium text-[#FFED7E] uppercase tracking-widest text-[10px] md:text-sm mb-4 md:mb-6 block">
                            ABOUT US
                        </span>

                        <h2
                            className="text-fluid-h1 tracking-tight leading-[1.1] md:leading-[1.05] text-[#EDEDED] mb-6 md:mb-10"
                            style={{ fontFamily: 'Futura, sans-serif' }}
                        >
                            Transform A Space for Work, <br className="hidden xl:block" /> Into A Space for Life
                        </h2>

                        {/* Tab Navigation — highlights driven by scroll */}
                        <div className="flex flex-row flex-wrap items-center gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-2 md:gap-y-4 mb-8 md:mb-12 relative">
                            {tabs.map((tab, i) => (
                                <TabButton key={tab.id} tab={tab} index={i} activeIndex={activeIndex} />
                            ))}
                        </div>

                        {/* Image — crossfades based on active tab */}
                        <div className="relative w-full aspect-[2/1] md:aspect-[16/9] lg:aspect-[21/9] rounded-3xl md:rounded-[4rem] overflow-hidden shadow-2xl bg-[#163548]">
                            {tabs.map((tab, i) => (
                                <motion.div
                                    key={tab.id}
                                    style={{ opacity: tabImageOpacities[i] }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <Image src={tab.image} alt={tab.label} fill className="object-cover" priority={i === 0} />
                                </motion.div>
                            ))}
                            <div className="absolute inset-0 bg-[#163548]/20 mix-blend-multiply pointer-events-none z-20" />
                        </div>
                    </div>

                    {/* ── Right Panel (tab content driven by scroll) ── */}
                    <div className="w-full md:w-1/2 flex items-center justify-center relative lg:pl-20 xl:pl-32">

                        {/* Vertical Rail + Glowing Dot */}
                        <div className="absolute left-4 lg:left-12 top-0 bottom-0 w-[1px] bg-[#CCA14D]/30 z-30 hidden md:block">
                            <motion.div
                                className="absolute w-3 h-3 rounded-full bg-[#CCA14D] shadow-[0_0_15px_#CCA14D]"
                                style={{ left: "-5px", top: dotTop }}
                            />
                        </div>

                        {/* Tab Content Panels — stacked absolutely, opacity-driven */}
                        <div className="relative w-full min-h-[60vh] flex items-center">
                            {tabs.map((tab, i) => (
                                <motion.div
                                    key={tab.id}
                                    style={{ opacity: tabOpacities[i], y: tabYs[i] }}
                                    className="absolute inset-0 flex flex-col justify-center w-full"
                                >
                                    <TabContent tab={tab} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ═══════════════════ LAYER 1: Split Doors (on top) ═══════════════════ */}
                <motion.div
                    style={{ opacity: doorOpacity }}
                    className="absolute inset-0 z-50 pointer-events-none"
                >
                    {/* Left Door */}
                    <motion.div
                        style={{ x: leftX, clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
                        className="absolute inset-0 bg-[#163548] will-change-transform"
                    >
                        <Image src="/images/hero.png" alt="Split Left" fill className="object-cover" priority />
                        <div className="absolute inset-0 bg-[#163548]/80 mix-blend-multiply" />
                        <SplitText />
                    </motion.div>

                    {/* Right Door */}
                    <motion.div
                        style={{ x: rightX, clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }}
                        className="absolute inset-0 bg-[#163548] will-change-transform"
                    >
                        <Image src="/images/hero.png" alt="Split Right" fill className="object-cover" priority />
                        <div className="absolute inset-0 bg-[#163548]/80 mix-blend-multiply" />
                        <SplitText />
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}

// ─── Tab Button (scroll-driven highlight) ──────────────────────────
function TabButton({ tab, index, activeIndex }) {
    const isActive = useTransform(activeIndex, (v) => v === index);
    const markerWidth = useTransform(isActive, (active) => active ? "12px" : "0px");
    const markerOpacity = useTransform(isActive, (active) => active ? 1 : 0);
    const markerMR = useTransform(isActive, (active) => active ? "8px" : "0px");
    const textColor = useTransform(isActive, (active) => active ? "#FFED7E" : "#8A98A5");
    const fontWeight = useTransform(isActive, (active) => active ? 700 : 600);

    return (
        <div className="flex items-center cursor-pointer group py-2">
            <motion.div
                style={{ width: markerWidth, opacity: markerOpacity, marginRight: markerMR }}
                className="flex items-center overflow-hidden transition-all duration-300"
            >
                <svg width="8" height="8" viewBox="0 0 24 24" className="min-w-[8px] md:min-w-[10px]">
                    <polygon points="5 3 19 12 5 21 5 3" fill="#CCA14D" />
                </svg>
            </motion.div>
            <motion.span
                style={{ color: textColor, fontWeight }}
                className="font-sans whitespace-nowrap text-base md:text-lg lg:text-xl transition-colors duration-300 group-hover:text-[#EDEDED]"
            >
                {tab.label}
            </motion.span>
        </div>
    );
}
