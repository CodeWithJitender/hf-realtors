"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

// ─── Word-reveal driven by parent animate state ──────────────────────
function RevealWords({ text, className, delay = 0, animate = "visible" }) {
    const words = text.split(" ");
    const container = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
    };
    const item = {
        hidden: { y: "108%", opacity: 0 },
        visible: { y: "0%", opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
    };
    return (
        <motion.span
            className={className}
            aria-label={text}
            variants={container}
            initial="hidden"
            animate={animate}
        >
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden" style={{ verticalAlign: "bottom" }}>
                    <motion.span className="inline-block" variants={item}>
                        {word}&nbsp;
                    </motion.span>
                </span>
            ))}
        </motion.span>
    );
}

// ─── Line-reveal for tab section headings (right panel) ─────────────
function RevealLine({ text, className, delay = 0, animate = "visible" }) {
    return (
        <span className="inline-block overflow-hidden">
            <motion.span
                className={`inline-block ${className}`}
                initial={{ y: "110%", opacity: 0 }}
                animate={animate === "visible"
                    ? { y: "0%", opacity: 1, transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] } }
                    : { y: "110%", opacity: 0, transition: { duration: 0.3 } }
                }
            >
                {text}
            </motion.span>
        </span>
    );
}

// ─── Fade-up stagger for list items ─────────────────────────────────
function FadeUp({ children, delay = 0, animate = "visible", className = "" }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 24 }}
            animate={animate === "visible"
                ? { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] } }
                : { opacity: 0, y: 24, transition: { duration: 0.2 } }
            }
        >
            {children}
        </motion.div>
    );
}

// ─── Tab Data ──────────────────────────────────────────────────────
const tabs = [
    {
        id: "who-we-are", label: "Who We Are", image: "/images/interior.png",
        type: "stats", title: "WHO WE ARE",
        stats: [
            { value: "20+", label: "Years Of\nExperience" },
            { value: "08", label: "Sq. ft. \n transacted" },
            { value: "3M", label: "Closed \nDeals" },
        ],
    },
    {
        id: "our-values", label: "Our Values", image: "/images/hero.png",
        type: "values", title: "OUR VALUES",
        values: [
            { num: "01", title: "Transparency ", desc: "Clear communication and honest guidance at every step." },
            { num: "02", title: "Integrity", desc: "Doing the right thing, always." },
            { num: "03", title: "Discretion ", desc: "Handling transactions and investments with complete confidentiality." },
            { num: "04", title: "Expertise", desc: "Deep market knowledge that drives informed decisions." },
        ],
    },
    {
        id: "our-team", label: "Our Team", image: "/images/interior.png",
        type: "team", title: "Our Team",
        teamImage: "/images/hero.png",
        roles: [
            "Portfolio Managers | Brokerage Experts | Wealth Managers | Concierge Manager | Real Estate Experts ",
        ],
    },
    {
        id: "founders", label: "Founders", image: "/images/hero.png",
        type: "founders", title: "Meet Our\nFounders",
        founders: [
            { name: "Kunal Jaggi", image: "https://cdn.theorg.com/707fe690-ab0c-4006-8499-de47610e4fff_medium.jpg" },
        ],
    },
];

// ─── Split Door Text ───────────────────────────────────────────────
const SplitText = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-fluid-container w-full h-full pointer-events-none">
        <h2 className="font-sans font-bold uppercase leading-[0.85] tracking-tighter text-[#CCA14D] drop-shadow-2xl text-[8vw] sm:text-[7vw] lg:text-[6.5vw] max-w-[95vw]">
            {/* We sell real estate that <br />
            evokes emotions. We give a new <br />
            sense of self. */}
            Pioneering a New Standard in Real Estate.

        </h2>
    </div>
);

// ─── Tab Content Components ────────────────────────────────────────
function StatsContent({ tab, isActive }) {
    const anim = isActive ? "visible" : "hidden";
    return (
        <div className="flex flex-col gap-6 md:gap-10 w-full">
            {tab.stats.map((stat, i) => (
                <FadeUp key={i} delay={0.1 + i * 0.12} animate={anim}>
                    <div className="flex flex-row items-center gap-6 md:gap-8 xl:gap-16 w-full">
                        <span className="font-sans font-light text-[4rem] md:text-[6rem] xl:text-[9rem] text-[#CCA14D] tracking-tighter min-w-[120px] md:min-w-[180px] xl:min-w-[240px] leading-none">
                            {stat.value}
                        </span>
                        <span className="font-sans font-medium text-base md:text-xl xl:text-2xl text-[#163548] leading-tight whitespace-pre-line uppercase tracking-wide">
                            {stat.label}
                        </span>
                    </div>
                </FadeUp>
            ))}
        </div>
    );
}

function ValuesContent({ tab, isActive }) {
    const anim = isActive ? "visible" : "hidden";
    return (
        <div className="flex flex-col w-full max-w-2xl">
            <div className="flex flex-col rounded-2xl md:rounded-[2rem] overflow-hidden border border-[#CCA14D]/20 shadow-lg bg-white">
                {tab.values.map((val, i) => (
                    <FadeUp key={i} delay={0.1 + i * 0.1} animate={anim}>
                        <div className="flex flex-row items-center justify-between p-6 md:p-8 border-b border-[#CCA14D]/10 last:border-0 hover:bg-[#CCA14D]/5 transition-colors">
                            <div className="flex flex-col">
                                <span className="font-sans font-bold text-lg md:text-2xl text-[#CCA14D] mb-1">{val.title}</span>
                                <span className="font-sans text-sm md:text-base text-[#163548]/70 whitespace-pre-line leading-relaxed">{val.desc}</span>
                            </div>
                            <span className="font-sans font-light text-[3rem] md:text-[4.5rem] leading-none text-[#CCA14D] opacity-25 ml-4">{val.num}</span>
                        </div>
                    </FadeUp>
                ))}
            </div>
        </div>
    );
}

function TeamContent({ tab, isActive }) {
    const anim = isActive ? "visible" : "hidden";
    return (
        <div className="flex flex-col items-center justify-center w-full h-full relative">
            <motion.h3
                initial={{ opacity: 0 }}
                animate={isActive ? { opacity: 0.1 } : { opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="hidden md:block text-[5rem] xl:text-[9rem] tracking-tighter text-[#163548] leading-none whitespace-nowrap absolute top-[-4rem] xl:top-[-7rem] z-0"
            >
                {tab.title}
            </motion.h3>
            <FadeUp delay={0.08} animate={anim} className="relative w-full aspect-[4/3] xl:aspect-video z-10 mt-12 rounded-[2rem] overflow-hidden shadow-2xl border border-[#CCA14D]/20">
                <Image src={tab.teamImage} alt="Our Team" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#163548]/40 via-transparent to-transparent" />
            </FadeUp>
            <div className="mt-10 flex flex-col items-center text-center gap-3 z-20">
                {tab.roles.map((line, i) => (
                    <RevealLine
                        key={i}
                        text={line}
                        animate={anim}
                        delay={0.3 + i * 0.15}
                        className="font-sans text-[10px] sm:text-xs xl:text-sm tracking-[0.18em] text-[#163548] font-semibold uppercase"
                    />
                ))}
            </div>
        </div>
    );
}

function FoundersContent({ tab, isActive }) {
    const anim = isActive ? "visible" : "hidden";
    return (
        <div className="flex flex-col justify-center items-center gap-8 w-full">
            {/* Portrait card — large, fills former 3-card row */}
            {tab.founders.map((founder, i) => (
                <FadeUp key={i} delay={0.05 + i * 0.12} animate={anim} className="w-full sm:w-[50%] flex-shrink-0">
                    <div className="relative w-full aspect-[3/4] group rounded-2xl overflow-hidden border border-[#CCA14D]/25 shadow-xl bg-[#1D3E53]">
                        <Image src={founder.image} alt={founder.name} fill className="object-cover opacity-90 grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <span className="absolute bottom-4 left-0 right-0 text-center font-sans font-semibold text-base text-white px-2">{founder.name}</span>
                    </div>
                </FadeUp>
            ))}
            {/* Heading fills remaining horizontal space */}
            <div className="flex-1 flex items-end pb-4">
                <RevealWords
                    text="Meet Our Founder"
                    className="text-[2.5rem] xl:text-[4rem] tracking-tighter text-[#CCA14D] leading-[0.9] block"
                    delay={0.15}
                    animate={anim}
                />
            </div>
        </div>
    );
}

function TabContent({ tab, isActive }) {
    switch (tab.type) {
        case "stats": return <StatsContent tab={tab} isActive={isActive} />;
        case "values": return <ValuesContent tab={tab} isActive={isActive} />;
        case "team": return <TeamContent tab={tab} isActive={isActive} />;
        case "founders": return <FoundersContent tab={tab} isActive={isActive} />;
        default: return null;
    }
}

// ─── Main Component ────────────────────────────────────────────────
export default function SplitReveal() {
    const sectionRef = useRef(null);
    const [currentTab, setCurrentTab] = useState(0);
    const [doorsOpen, setDoorsOpen] = useState(false);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    // Door animation
    const leftX = useTransform(scrollYProgress, [0.02, 0.12], ["0%", "-100%"]);
    const rightX = useTransform(scrollYProgress, [0.02, 0.12], ["0%", "100%"]);
    const doorOpacity = useTransform(scrollYProgress, [0.11, 0.12], [1, 0]);

    // Tab ranges
    const TAB_RANGES = [
        [0.12, 0.35],
        [0.35, 0.55],
        [0.55, 0.75],
        [0.75, 0.95],
    ];

    // Active index motion value (for TabButton highlights)
    const activeIndex = useTransform(scrollYProgress, (v) => {
        if (v < 0.12) return 0;
        for (let i = TAB_RANGES.length - 1; i >= 0; i--) {
            if (v >= TAB_RANGES[i][0]) return i;
        }
        return 0;
    });

    // Sync active tab to React state (for right-panel isActive)
    useMotionValueEvent(activeIndex, "change", (v) => {
        setCurrentTab(Math.round(v));
    });

    // Detect when doors have fully opened (progress > 0.12)
    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (v >= 0.13) setDoorsOpen(true);
        if (v < 0.10) setDoorsOpen(false);
    });

    // Tab panel opacity/Y for fade transitions
    const tabOpacities = TAB_RANGES.map(([start, end], i) => {
        const isFirst = i === 0;
        const isLast = i === TAB_RANGES.length - 1;
        if (isFirst) return useTransform(scrollYProgress, [0, end - 0.03, end], [1, 1, 0]);
        if (isLast) return useTransform(scrollYProgress, [start - 0.03, start + 0.03, 1], [0, 1, 1]);
        return useTransform(scrollYProgress, [start - 0.03, start + 0.03, end - 0.03, end], [0, 1, 1, 0]);
    });

    const tabYs = TAB_RANGES.map(([start, end], i) => {
        const isFirst = i === 0;
        const isLast = i === TAB_RANGES.length - 1;
        if (isFirst) return useTransform(scrollYProgress, [0, end - 0.03, end], [0, 0, -40]);
        if (isLast) return useTransform(scrollYProgress, [start - 0.03, start + 0.03, 1], [40, 0, 0]);
        return useTransform(scrollYProgress, [start - 0.03, start + 0.03, end - 0.03, end], [40, 0, 0, -40]);
    });

    // Left panel image crossfade
    const tabImageOpacities = tabs.map((_, i) => {
        const [start, end] = TAB_RANGES[i];
        const isFirst = i === 0;
        const isLast = i === tabs.length - 1;
        if (isFirst) return useTransform(scrollYProgress, [0, end - 0.02, end], [1, 1, 0]);
        if (isLast) return useTransform(scrollYProgress, [start - 0.02, start + 0.02, 1], [0, 1, 1]);
        return useTransform(scrollYProgress, [start - 0.02, start + 0.02, end - 0.02, end], [0, 1, 1, 0]);
    });

    const dotTop = useTransform(scrollYProgress, [0.15, 0.95], ["5%", "95%"]);

    return (
        <section ref={sectionRef} className="relative w-full bg-white" style={{ height: "700vh" }}>
            <div className="sticky top-0 w-full h-screen overflow-hidden">

                {/* ── Layer 0: About Us Content ── */}
                <div className="absolute inset-0 z-0 flex flex-col md:flex-row w-full h-full text-[#163548] px-fluid-container py-4 md:py-fluid-section">

                    {/* Left Panel — shrink-0 so it doesn't steal right-panel height on mobile */}
                    <div className="w-full md:w-1/2 flex-none md:flex flex-col justify-start md:justify-center lg:pr-12 z-10">

                        {/* Eyebrow — only after doors open */}
                        <motion.span
                            initial={{ opacity: 0, y: 16 }}
                            animate={doorsOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                            transition={{ duration: 0.6, delay: 0.05 }}
                            className="font-sans font-semibold text-[#CCA14D] uppercase tracking-widest text-[10px] md:text-sm mb-4 md:mb-6 block"
                        >
                            ABOUT US
                        </motion.span>

                        {/* Heading — word-by-word AFTER doors open */}
                        <h2 className="text-fluid-h1 tracking-tight leading-[1.1] md:leading-[1.05] text-[#163548] mb-6">
                            <RevealWords
                                text="Leading the Future of Real Estate"
                                animate={doorsOpen ? "visible" : "hidden"}
                                delay={0.1}
                            />
                        </h2>
                        {/* Subtitle paragraph — desktop only (too tall on mobile) */}
                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            animate={doorsOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                            transition={{ duration: 0.65, delay: 0.55 }}
                            className="hidden md:block text-sm md:text-base text-[#163548]/60 font-poppins font-medium leading-relaxed mb-6 md:mb-10"
                        >
                            Our framework is driven by research, compliance, discretion, and long-term capital performance, delivering breakthrough outcomes in an evolving market.

                        </motion.p>
                        {/* Tab Nav — single-row scrollable on mobile, wrap on desktop */}
                        <motion.div
                            className="flex flex-row overflow-x-auto md:flex-wrap items-center gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-2 mb-4 md:mb-8 scrollbar-none"
                            style={{ scrollbarWidth: "none" }}
                            initial="hidden"
                            animate={doorsOpen ? "visible" : "hidden"}
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
                            }}
                        >
                            {tabs.map((tab, i) => (
                                <motion.div
                                    key={tab.id}
                                    className="flex-shrink-0"
                                    variants={{
                                        hidden: { opacity: 0, y: 12 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                                    }}
                                >
                                    <TabButton tab={tab} index={i} activeIndex={activeIndex} />
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Crossfading Image — desktop only (too tall on mobile) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={doorsOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.7, delay: 0.35 }}
                            className="hidden md:block relative w-full md:aspect-[16/9] lg:aspect-[21/9] rounded-3xl md:rounded-[4rem] overflow-hidden shadow-xl bg-[#F0ECE4]"
                        >
                            {tabs.map((tab, i) => (
                                <motion.div
                                    key={tab.id}
                                    style={{ opacity: tabImageOpacities[i] }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <Image src={tab.image} alt={tab.label} fill className="object-cover" priority={i === 0} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Panel — flex-1 + overflow-y-auto on mobile so tall content scrolls */}
                    <div className="w-full md:w-1/2 flex-1 md:flex-none flex items-start md:items-center justify-center relative lg:pl-20 xl:pl-32 overflow-y-auto md:overflow-visible">
                        {/* Vertical Rail — grows in after doors open */}
                        <motion.div
                            className="absolute left-4 lg:left-12 top-0 bottom-0 w-[1px] bg-[#CCA14D]/30 z-30 hidden md:block origin-top"
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={doorsOpen ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
                            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <motion.div
                                className="absolute w-3 h-3 rounded-full bg-[#CCA14D] shadow-[0_0_12px_#CCA14D]"
                                style={{ left: "-5px", top: dotTop }}
                                initial={{ opacity: 0 }}
                                animate={doorsOpen ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                            />
                        </motion.div>

                        {/* Tab Panels — on mobile: block flow (only active shows); on desktop: absolute opacity/y transitions */}
                        <div className="relative w-full md:min-h-[60vh] flex items-start md:items-center py-2 md:py-0">
                            {tabs.map((tab, i) => {
                                const isCurrentActive = doorsOpen && currentTab === i;
                                return (
                                    <motion.div
                                        key={tab.id}
                                        style={{ opacity: tabOpacities[i], y: tabYs[i] }}
                                        className={`md:absolute md:inset-0 flex flex-col justify-start md:justify-center w-full ${isCurrentActive ? "flex" : "hidden md:flex"
                                            }`}
                                    >
                                        <TabContent tab={tab} isActive={isCurrentActive} />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── Layer 1: Split Doors ── */}
                <motion.div style={{ opacity: doorOpacity }} className="absolute inset-0 z-50 pointer-events-none">
                    <motion.div
                        style={{ x: leftX, clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
                        className="absolute inset-0 bg-[#163548] will-change-transform"
                    >
                        <Image src="/images/hero.png" alt="Split Left" fill className="object-cover" priority />
                        <div className="absolute inset-0 bg-[#163548]/80 mix-blend-multiply" />
                        <SplitText />
                    </motion.div>
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

// ─── Tab Button ────────────────────────────────────────────────────
function TabButton({ tab, index, activeIndex }) {
    const isActive = useTransform(activeIndex, (v) => v === index);
    const markerWidth = useTransform(isActive, (a) => a ? "12px" : "0px");
    const markerOpacity = useTransform(isActive, (a) => a ? 1 : 0);
    const markerMR = useTransform(isActive, (a) => a ? "8px" : "0px");
    const textColor = useTransform(isActive, (a) => a ? "#CCA14D" : "#6B7A8A");
    const fontWeight = useTransform(isActive, (a) => a ? 700 : 500);

    return (
        <div className="flex items-center cursor-pointer group py-2">
            <motion.div
                style={{ width: markerWidth, opacity: markerOpacity, marginRight: markerMR }}
                className="flex items-center overflow-hidden"
            >
                <svg width="8" height="8" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" fill="#CCA14D" />
                </svg>
            </motion.div>
            <motion.span
                style={{ color: textColor, fontWeight }}
                className="font-sans whitespace-nowrap text-base md:text-lg lg:text-xl group-hover:text-[#163548] transition-colors duration-300"
            >
                {tab.label}
            </motion.span>
        </div>
    );
}
