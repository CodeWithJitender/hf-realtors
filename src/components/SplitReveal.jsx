"use client";

import { useRef, useState, useEffect } from "react";
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
                <span key={i} className="inline-block overflow-hidden pb-[0.15em] mb-[-0.15em]" style={{ verticalAlign: "bottom" }}>
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
        id: "who-we-are", label: "Who We Are", image: "/images/who-we-are-left-side.jpg",
        type: "stats", title: "WHO WE ARE",
        stats: [
            { value: "18+", label: "Years Of\nExperience" },
            { value: "3K", label: "Happy \nCustomers" },
            { value: "50+", label: "Developers \n Connected" },
        ],
    },
    {
        id: "our-values", label: "Our Values", image: "/images/our-value-left-side.jpg",
        type: "values", title: "OUR VALUES",
        values: [
            { num: "01", title: "Transparency ", desc: "Clear communication and honest guidance at every step." },
            { num: "02", title: "Integrity", desc: "Doing the right thing, always." },
            { num: "03", title: "Discretion ", desc: "Handling transactions and investments with complete confidentiality." },
            { num: "04", title: "Expertise", desc: "Deep market knowledge that drives informed decisions." },
        ],
    },
    {
        id: "our-team", label: "Our Team", image: "/images/our-team-left-side.jpg",
        type: "team", title: "Our Team",
        teamImage: "/images/hero.png",
        roles: [
            "Portfolio Managers | Brokerage Experts | Wealth Managers | Concierge Manager | Real Estate Experts ",
        ],
    },
    {
        id: "founders", label: "Founders", image: "/images/founder-left-side.jpg",
        type: "founders", title: "Meet Our\nFounders",
        founders: [
            { name: "Kunal Jaggi", image: "https://cdn.theorg.com/707fe690-ab0c-4006-8499-de47610e4fff_medium.jpg" },
        ],
    },
];

// ─── Split Door Text ───────────────────────────────────────────────
const SplitText = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-fluid-container w-full h-full pointer-events-none">
        <h2
            className="font-bold leading-[1.05] tracking-tighter text-[#E8C96A] drop-shadow-2xl text-[8vw] sm:text-[7vw] lg:text-[6.5vw] max-w-[95vw]"
            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", color: "#E8C96A" }}
        >
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
                    <div className="flex flex-row items-center w-full">
                        <span className="font-light text-[#E8C96A] tracking-tighter flex-shrink-0 leading-none" style={{ fontSize: "var(--text-fluid-stat)", width: "clamp(110px,18vw,320px)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                            {stat.value}
                        </span>
                        <span className="font-medium text-[#fff] leading-tight whitespace-pre-line uppercase tracking-wide" style={{ fontSize: "var(--text-fluid-h4)", fontFamily: "var(--font-inter), 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
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
            <div
                className="flex flex-col rounded-2xl md:rounded-[2rem] overflow-hidden border border-[#E8C96A]/25"
                style={{
                    background: "rgba(8, 18, 35, 0.55)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    boxShadow: "0 8px 48px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(232,201,106,0.08), 0 0 0 1px rgba(232,201,106,0.12)",
                }}
            >
                {tab.values.map((val, i) => (
                    <FadeUp key={i} delay={0.1 + i * 0.1} animate={anim}>
                        <div className="group relative flex flex-row items-center justify-between p-6 md:p-8 border-b border-[#E8C96A]/10 last:border-0 transition-all duration-300 overflow-hidden">
                            {/* Row hover shimmer */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                style={{ background: "linear-gradient(90deg, rgba(232,201,106,0.06) 0%, rgba(232,201,106,0.02) 60%, transparent 100%)" }}
                            />
                            <div className="flex flex-col relative z-10">
                                <span className="font-bold text-[#E8C96A] mb-1" style={{ fontSize: "var(--text-fluid-h4)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>{val.title}</span>
                                <span className="text-[#EDEDED]/70 whitespace-pre-line leading-relaxed" style={{ fontSize: "var(--text-fluid-body)", fontFamily: "var(--font-inter), 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>{val.desc}</span>
                            </div>
                            <span className="font-light leading-none text-[#E8C96A] opacity-25 group-hover:opacity-50 ml-4 relative z-10 transition-opacity duration-300" style={{ fontSize: "var(--text-fluid-stat-sm)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>{val.num}</span>
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
                initial={{ opacity: 0, y: 16 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="hidden md:block tracking-tighter text-[#E8C96A] leading-none mb-6 w-full text-center"
                style={{ fontSize: "var(--text-fluid-h2)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
            >
                {tab.title}
            </motion.h3>
            <FadeUp delay={0.08} animate={anim} className="relative w-full aspect-[4/3] xl:aspect-video rounded-2xl z-10 overflow-hidden shadow-2xl border border-[#E8C96A]/20">
                <Image src={tab.teamImage} alt="Our Team" fill className="object-cover rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/40 via-transparent to-transparent" />
            </FadeUp>
            <div className="mt-8 flex flex-col items-center text-center gap-3 z-20">
                {tab.roles.map((line, i) => (
                    <RevealLine
                        key={i}
                        text={line}
                        animate={anim}
                        delay={0.3 + i * 0.15}
                        className="'Helvetica Neue', Helvetica, Arial, sans-serif text-[10px] sm:text-xs xl:text-sm tracking-[0.18em] text-[#fff] font-semibold uppercase"
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
                    <div className="relative w-full aspect-[3/4] group rounded-2xl overflow-hidden border border-[#E8C96A]/25 shadow-xl bg-[#0F1E38]">
                        <Image src={founder.image} alt={founder.name} fill className="object-cover opacity-90 grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <span className="absolute bottom-4 left-0 right-0 text-center 'Helvetica Neue', Helvetica, Arial, sans-serif font-semibold text-base text-[#EDEDED] px-2">{founder.name}</span>
                    </div>
                </FadeUp>
            ))}
            {/* Heading fills remaining horizontal space */}
            <div className="flex-1 flex items-end pb-4">
                <RevealWords
                    text="Meet Our Founder"
                    className="text-[2.5rem] xl:text-[4rem] tracking-tighter text-[#E8C96A] leading-[0.9] block" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
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
// ─── Desktop Scroll Section (own component so hooks only run when mounted) ──
function DesktopReveal() {
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

    const activeIndex = useTransform(scrollYProgress, (v) => {
        if (v < 0.12) return 0;
        for (let i = TAB_RANGES.length - 1; i >= 0; i--) {
            if (v >= TAB_RANGES[i][0]) return i;
        }
        return 0;
    });

    useMotionValueEvent(activeIndex, "change", (v) => {
        setCurrentTab(Math.round(v));
    });

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (v >= 0.13) setDoorsOpen(true);
        if (v < 0.10) setDoorsOpen(false);
    });

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
        <section ref={sectionRef} className="relative w-full h-[300vh] lg:h-[700vh]" style={{ backgroundColor: "#0A1628" }}>
            <div className="sticky top-0 w-full h-screen overflow-hidden">

                {/* ── Layer 0: About Us Content ── */}
                <div className="absolute inset-0 z-0 flex flex-col md:flex-row w-full h-full text-[#FFFFFF] px-fluid-container py-4 md:py-fluid-section">

                    {/* Left Panel */}
                    <div className="w-full md:w-1/2 flex-none md:flex flex-col justify-start md:justify-center lg:pr-12 z-10">

                        <motion.span
                            initial={{ opacity: 0, y: 16 }}
                            animate={doorsOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                            transition={{ duration: 0.6, delay: 0.05 }}
                            className="'Helvetica Neue', Helvetica, Arial, sans-serif font-semibold text-[#FFFFFF] uppercase tracking-widest text-[10px] md:text-sm mb-4 md:mb-6 block"
                        >
                            ABOUT US
                        </motion.span>

                        <h2 className="text-fluid-h1 tracking-tight leading-[1.2] mb-6 pb-1" style={{ color: "#E8C96A", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                            <RevealWords
                                text="Leading the Future of Real Estate"
                                animate={doorsOpen ? "visible" : "hidden"}
                                delay={0.1}
                            />
                        </h2>

                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            animate={doorsOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                            transition={{ duration: 0.65, delay: 0.55 }}
                            className="hidden md:block text-sm md:text-base font-medium leading-relaxed mb-6 md:mb-10" style={{ color: "#fff", fontFamily: "var(--font-body)" }}
                        >
                            Our framework is driven by research, compliance, discretion, and long-term capital performance, <br className="hidden sm:block" /> delivering breakthrough outcomes in an evolving market.
                        </motion.p>

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

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={doorsOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.7, delay: 0.35 }}
                            className="hidden md:block relative w-full md:aspect-[16/9] lg:aspect-[21/9] rounded-3xl md:rounded-[4rem] overflow-hidden shadow-xl bg-[#0F1E38] border border-[rgba(232,201,106,0.1)]"
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

                    {/* Right Panel */}
                    <div className="w-full md:w-1/2 flex-1 md:flex-none flex items-start md:items-center justify-center relative lg:pl-20 xl:pl-32 overflow-y-auto md:overflow-visible">
                        <motion.div
                            className="absolute left-4 lg:left-12 top-0 bottom-0 w-[1px] bg-[#E8C96A]/30 z-30 hidden md:block origin-top"
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={doorsOpen ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
                            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <motion.div
                                className="absolute w-3 h-3 rounded-full bg-[#E8C96A] shadow-[0_0_12px_#E8C96A]"
                                style={{ left: "-5px", top: dotTop }}
                                initial={{ opacity: 0 }}
                                animate={doorsOpen ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                            />
                        </motion.div>

                        <div className="relative w-full md:min-h-[60vh] flex items-start md:items-center py-2 md:py-0">
                            {tabs.map((tab, i) => {
                                const isCurrentActive = doorsOpen && currentTab === i;
                                return (
                                    <motion.div
                                        key={tab.id}
                                        style={{ opacity: tabOpacities[i], y: tabYs[i] }}
                                        className={`md:absolute md:inset-0 flex flex-col justify-start md:justify-center w-full ${isCurrentActive ? "flex" : "hidden md:flex"}`}
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
                        className="absolute inset-0 bg-[#0A1628] will-change-transform"
                    >
                        <Image src="/images/pioneeering-bg.jpg" alt="Split Left" fill className="object-cover" priority />
                        <div className="absolute inset-0 bg-[#0A1628]/80 mix-blend-multiply" />
                        <SplitText />
                    </motion.div>
                    <motion.div
                        style={{ x: rightX, clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }}
                        className="absolute inset-0 bg-[#0A1628] will-change-transform"
                    >
                        <Image src="/images/pioneeering-bg.jpg" alt="Split Right" fill className="object-cover" priority />
                        <div className="absolute inset-0 bg-[#0A1628]/80 mix-blend-multiply" />
                        <SplitText />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

// ─── Mobile Reveal ────────────────────────────────────────────────
// Split-door animation first, then 4 stacked scroll-reveal sections
function MobileReveal() {
    const doorRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: doorRef,
        offset: ["start start", "end end"],
    });

    // Doors slide open over the first 60% of the scroll, then fade
    const leftX = useTransform(scrollYProgress, [0.05, 0.6], ["0%", "-100%"]);
    const rightX = useTransform(scrollYProgress, [0.05, 0.6], ["0%", "100%"]);
    const doorOpacity = useTransform(scrollYProgress, [0.58, 0.72], [1, 0]);

    // Shared fade-up variant for section entries
    const sectionVariants = {
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
    };

    return (
        <div>
            {/* ―― 1. Door Animation ―― */}
            <section ref={doorRef} className="relative h-[250vh]">
                <div className="sticky top-0 h-screen overflow-hidden">
                    <motion.div style={{ opacity: doorOpacity }} className="absolute inset-0 z-50 pointer-events-none">
                        {/* Left door */}
                        <motion.div
                            style={{ x: leftX, clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
                            className="absolute inset-0 bg-[#0A1628] will-change-transform"
                        >
                            <Image src="/images/pioneeering-bg.jpg" alt="" fill className="object-cover" priority />
                            <div className="absolute inset-0 bg-[#0A1628]/80 mix-blend-multiply" />
                            <SplitText />
                        </motion.div>
                        {/* Right door */}
                        <motion.div
                            style={{ x: rightX, clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }}
                            className="absolute inset-0 bg-[#0A1628] will-change-transform"
                        >
                            <Image src="/images/pioneeering-bg.jpg" alt="" fill className="object-cover" priority />
                            <div className="absolute inset-0 bg-[#0A1628]/80 mix-blend-multiply" />
                            <SplitText />
                        </motion.div>
                    </motion.div>

                    {/* About Us content anchored to bottom, no dead whitespace */}
                    <div className="absolute inset-0 flex flex-col justify-end px-6 pb-16" style={{ backgroundColor: "#0A1628" }}>
                        <span className="block 'Helvetica Neue', Helvetica, Arial, sans-serif font-semibold text-[#E8C96A] uppercase tracking-widest text-[10px] mb-4">ABOUT US</span>
                        <h2 className="font-bold tracking-tight leading-[1.2] text-[#E8C96A] mb-4 pb-1" style={{ fontSize: "var(--text-fluid-h2)", fontFamily: "var(--font-display)" }}>
                            Leading the Future of Real Estate
                        </h2>
                        <p className="text-sm leading-relaxed" style={{ color: "#7A8FAB", fontFamily: "var(--font-body)" }}>
                            Our framework is driven by research, compliance, discretion, and long-term capital performance.
                        </p>
                    </div>
                </div>
            </section>

            {/* ―― 2. Stacked Scroll-Reveal Sections ―― */}
            <div style={{ backgroundColor: "#0A1628", color: "#FFFFFF" }}>

                {/* WHO WE ARE */}
                <motion.section
                    className="px-6 py-14 border-t border-[#E8C96A]/20"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    <h3 className="'Helvetica Neue', Helvetica, Arial, sans-serif font-bold uppercase tracking-widest text-[10px] text-[#E8C96A] mb-8">WHO WE ARE</h3>
                    <div className="flex flex-col gap-8">
                        {tabs[0].stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                className="flex flex-row items-center gap-6"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <span className="font-light text-[#E8C96A] tracking-tighter leading-none" style={{ fontSize: "var(--text-fluid-stat-sm)", fontFamily: "var(--font-display)" }}>{stat.value}</span>
                                <span className="font-semibold uppercase tracking-wide whitespace-pre-line leading-tight" style={{ fontSize: "var(--text-fluid-xs)", color: "#C5D6EE", fontFamily: "var(--font-body)" }}>{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* OUR VALUES */}
                <motion.section
                    className="px-6 py-14 border-t border-[#E8C96A]/20"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    <h3 className="'Helvetica Neue', Helvetica, Arial, sans-serif font-bold uppercase tracking-widest text-[10px] text-[#E8C96A] mb-8">OUR VALUES</h3>
                    <div
                        className="flex flex-col border border-[#E8C96A]/25 rounded-2xl overflow-hidden"
                        style={{
                            background: "rgba(8, 18, 35, 0.55)",
                            backdropFilter: "blur(24px)",
                            WebkitBackdropFilter: "blur(24px)",
                            boxShadow: "0 8px 48px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(232,201,106,0.08)",
                        }}
                    >
                        {tabs[1].values.map((val, i) => (
                            <motion.div
                                key={i}
                                className="flex flex-row items-center justify-between p-5 border-b border-[#E8C96A]/10 last:border-0"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className="flex flex-col">
                                    <span className="font-bold text-[#E8C96A] mb-1" style={{ fontSize: "var(--text-fluid-body)", fontFamily: "var(--font-display)" }}>{val.title}</span>
                                    <span className="leading-relaxed" style={{ fontSize: "var(--text-fluid-xs)", color: "#7A8FAB", fontFamily: "var(--font-body)" }}>{val.desc}</span>
                                </div>
                                <span className="font-light text-[#E8C96A] opacity-20 ml-4 leading-none" style={{ fontSize: "var(--text-fluid-stat-sm)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>{val.num}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* OUR TEAM */}
                <motion.section
                    className="px-6 py-14 border-t border-[#E8C96A]/20"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    <h3 className="'Helvetica Neue', Helvetica, Arial, sans-serif font-bold uppercase tracking-widest text-[10px] text-[#E8C96A] mb-8">OUR TEAM</h3>
                    <div className="relative w-full aspect-[4/3] overflow-hidden shadow-xl border border-[#E8C96A]/20 mb-6 ">
                        <Image src={tabs[2].teamImage} alt="Our Team" fill className="object-cover " />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/40 via-transparent to-transparent" />
                    </div>
                    <div className="flex flex-col items-center text-center gap-2">
                        {tabs[2].roles.map((line, i) => (
                            <p key={i} className="'Helvetica Neue', Helvetica, Arial, sans-serif text-[10px] tracking-[0.15em] font-semibold uppercase" style={{ color: "#C5D6EE" }}>{line}</p>
                        ))}
                    </div>
                </motion.section>

                {/* FOUNDERS */}
                <motion.section
                    className="px-6 py-14 border-t border-[#E8C96A]/20"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    <h3 className="'Helvetica Neue', Helvetica, Arial, sans-serif font-bold uppercase tracking-widest text-[10px] text-[#E8C96A] mb-8">MEET OUR FOUNDER</h3>
                    {tabs[3].founders.map((founder, i) => (
                        <motion.div
                            key={i}
                            className="relative w-full aspect-[3/4] overflow-hidden border border-[#E8C96A]/25 shadow-xl"
                            initial={{ opacity: 0, scale: 0.97 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Image src={founder.image} alt={founder.name} fill className="object-cover grayscale" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <span className="absolute bottom-4 left-0 right-0 text-center 'Helvetica Neue', Helvetica, Arial, sans-serif font-semibold text-base text-[#EDEDED]">{founder.name}</span>
                        </motion.div>
                    ))}
                </motion.section>

            </div>
        </div>
    );
}

// ─── Main Component ────────────────────────────────────────────────
export default function SplitReveal() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        setIsDesktop(mq.matches);
        const handler = (e) => setIsDesktop(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    if (isDesktop) return <DesktopReveal />;
    return <MobileReveal />;
}



// ─── Tab Button ────────────────────────────────────────────────────
function TabButton({ tab, index, activeIndex }) {
    const isActive = useTransform(activeIndex, (v) => v === index);
    const markerWidth = useTransform(isActive, (a) => a ? "12px" : "0px");
    const markerOpacity = useTransform(isActive, (a) => a ? 1 : 0);
    const markerMR = useTransform(isActive, (a) => a ? "8px" : "0px");
    const textColor = useTransform(isActive, (a) => a ? "#E8C96A" : "#6B7A8A");
    const fontWeight = useTransform(isActive, (a) => a ? 700 : 500);

    return (
        <div className="flex items-center cursor-pointer group py-2">
            <motion.div
                style={{ width: markerWidth, opacity: markerOpacity, marginRight: markerMR }}
                className="flex items-center overflow-hidden"
            >
                <svg width="8" height="8" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" fill="#E8C96A" />
                </svg>
            </motion.div>
            <motion.span
                style={{ color: textColor, fontWeight, fontSize: "var(--text-fluid-body)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                className="whitespace-nowrap group-hover:text-[#0A1628] transition-colors duration-300"
            >
                {tab.label}
            </motion.span>
        </div>
    );
}
