"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const tabs = [
    {
        id: "who-we-are",
        label: "Who We Are",
        image: "/images/interior.png",
        type: "stats",
        title: "WHO WE ARE",
        stats: [
            { value: "20+", label: "Years Of\nExperience" },
            { value: "08", label: "Sq. ft.\n transacted" },
            { value: "3M", label: "Closed \nDeals" }
        ]
    },
    {
        id: "our-values",
        label: "Our Values",
        image: "/images/hero.png",
        type: "values",
        title: "OUR VALUES",
        values: [
            { num: "01", title: "Transparency ", desc: "Clear communication and honest guidance at every step." },
            { num: "02", title: "Integrity", desc: "Doing the right thing, always." },
            { num: "03", title: "Discretion ", desc: "Handling transactions and investments with complete confidentiality." },
            { num: "04", title: "Expertise", desc: "Deep market knowledge that drives informed decisions." }
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
            "Portfolio Managers | Brokerage Experts | Wealth Managers | Concierge Manager | Real Estate Experts",
        ]
    },
    {
        id: "founders",
        label: "Founders",
        image: "/images/hero.png",
        type: "founders",
        title: "Meet Our\nFounders",
        founders: [
            { name: "Kunal Jaggi", image: "https://cdn.theorg.com/707fe690-ab0c-4006-8499-de47610e4fff_medium.jpg" }
        ]
    }
];

export default function AboutUsSticky() {
    const containerRef = useRef(null);
    const rightColRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Track scroll within the right column for the glowing dot
    const { scrollYProgress } = useScroll({
        target: rightColRef,
        offset: ["start start", "end end"]
    });
    const dotTop = useTransform(scrollYProgress, [0, 1], ["5%", "95%"]);

    const handleTabClick = (index) => {
        if (rightColRef.current) {
            const tabHeight = rightColRef.current.offsetHeight / tabs.length;
            const scrollTarget = rightColRef.current.offsetTop + (tabHeight * index);
            window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
        }
    };

    const updateActiveIndex = (index) => {
        if (index !== activeIndex) {
            setDirection(index > activeIndex ? 1 : -1);
            setActiveIndex(index);
        }
    };

    return (
        // Standard sticky sidebar pattern: no fixed height on section, flex row
        <section ref={containerRef} className="relative w-full bg-[#0A1628] text-[#EDEDED]">
            <div className="flex flex-col md:flex-row w-full">

                {/* ─── LEFT: Sticky panel ─── */}
                <div className="w-full md:w-1/2 md:sticky md:top-0 md:h-screen flex flex-col justify-center p-6 md:p-12 lg:p-24 lg:pr-12 pt-24 md:pt-0 z-10">

                    <span className="font-sans font-medium text-[#E8C96A] uppercase tracking-widest text-[10px] md:text-sm mb-4 md:mb-6 block">ABOUT US</span>

                    <h2 className="text-[1.85rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[4rem] tracking-tight leading-[1.1] md:leading-[1.05] text-[#EDEDED] mb-6 md:mb-10" style={{ fontFamily: 'sans-serif' }}>
                        Transform A Space for Work, Into A Space for Life
                    </h2>

                    {/* Tab Navigation */}
                    <div className="flex flex-row flex-wrap items-center gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-2 md:gap-y-4 mb-8 md:mb-12 relative overflow-x-auto no-scrollbar">
                        {tabs.map((tab, i) => {
                            const isActive = activeIndex === i;
                            return (
                                <div
                                    key={tab.id}
                                    className="flex items-center cursor-pointer group py-2"
                                    onClick={() => handleTabClick(i)}
                                >
                                    <div className={`transition-all duration-300 flex items-center overflow-hidden ${isActive ? 'w-2 md:w-3 mr-1 md:mr-2 opacity-100' : 'w-0 mr-0 opacity-0'}`}>
                                        <svg width="8" height="8" viewBox="0 0 24 24" className="min-w-[8px] md:min-w-[10px]">
                                            <polygon points="5 3 19 12 5 21 5 3" fill="#E8C96A" />
                                        </svg>
                                    </div>
                                    <span className={`font-sans transition-colors duration-300 whitespace-nowrap ${isActive ? 'text-[#E8C96A] font-bold text-base md:text-lg lg:text-xl' : 'text-[#8A98A5] font-semibold text-base md:text-lg lg:text-xl group-hover:text-[#EDEDED]'}`}>
                                        {tab.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Image (slides on tab change) */}
                    <div className="relative w-full aspect-[2/1] md:aspect-[16/9] lg:aspect-[21/9] rounded-3xl md:rounded-[4rem] overflow-hidden shadow-2xl bg-[#0A1628] mb-8 md:mb-0">
                        <AnimatePresence initial={false} custom={direction} mode="popLayout">
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                variants={{
                                    enter: (dir) => ({ y: dir > 0 ? '100%' : '-100%', opacity: 1 }),
                                    center: { y: 0, opacity: 1 },
                                    exit: (dir) => ({ y: dir > 0 ? '-100%' : '100%', opacity: 1 })
                                }}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <Image
                                    src={tabs[activeIndex].image}
                                    alt={tabs[activeIndex].label}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-[#0A1628]/20 mix-blend-multiply pointer-events-none z-20" />
                    </div>
                </div>

                {/* ─── RIGHT: Scrolling tab content ─── */}
                <div ref={rightColRef} className="w-full md:w-1/2 flex flex-col z-20 mt-12 md:mt-0 relative">

                    {/* Vertical Rail + Glowing Dot */}
                    <div className="absolute left-4 lg:left-12 top-0 bottom-0 w-[1px] bg-[#E8C96A]/30 z-30 hidden md:block">
                        <motion.div
                            className="absolute w-3 h-3 rounded-full bg-[#E8C96A] shadow-[0_0_15px_#E8C96A]"
                            style={{ left: "-5px", top: dotTop }}
                        />
                    </div>

                    {tabs.map((tab, index) => (
                        <motion.div
                            key={index}
                            onViewportEnter={() => updateActiveIndex(index)}
                            viewport={{ amount: 0.5 }}
                            className="w-full h-auto md:h-screen flex flex-col justify-center p-6 md:p-12 lg:p-24 lg:pl-20 xl:pl-32 mb-16 md:mb-0"
                        >
                            <motion.div
                                initial={{ opacity: 0.5, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="flex flex-col gap-12 w-full"
                            >
                                {tab.type === "stats" && (
                                    <div className="flex flex-col gap-6 md:gap-12 w-full">
                                        <span className="font-sans font-medium text-[#E8C96A] uppercase tracking-widest text-[10px] md:text-sm mb-2 md:mb-4">{tab.title}</span>
                                        {tab.stats.map((stat, i) => (
                                            <div key={i} className="flex flex-row items-center gap-6 md:gap-8 xl:gap-16 w-full">
                                                <span className="font-sans font-light text-[4rem] md:text-[6rem] xl:text-[7rem] text-[#E8C96A] tracking-tighter min-w-[100px] md:min-w-[150px] xl:min-w-[180px] leading-none">{stat.value}</span>
                                                <span className="font-sans font-medium text-base md:text-xl xl:text-2xl text-[#FFFFFF] leading-tight whitespace-pre-line uppercase tracking-wide">{stat.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {tab.type === "values" && (
                                    <div className="flex flex-col w-full max-w-2xl">
                                        <span className="font-sans font-medium text-[#E8C96A] uppercase tracking-widest text-[10px] md:text-sm mb-4 md:mb-8">{tab.title}</span>
                                        <div className="flex flex-col rounded-2xl md:rounded-[2rem] overflow-hidden border border-[#E8C96A]/20 shadow-2xl bg-[#0F1E38]/80 backdrop-blur-md">
                                            {tab.values.map((val, i) => (
                                                <div key={i} className="flex flex-row items-center justify-between p-6 md:p-8 xl:p-10 border-b border-[#E8C96A]/10 last:border-0 hover:bg-[#E8C96A]/5 transition-colors">
                                                    <div className="flex flex-col">
                                                        <span className="font-sans font-bold text-lg md:text-2xl mb-1 md:mb-3" style={{ color: "#E8C96A", opacity: 1 }}>{val.title}</span>
                                                        <span className="font-sans text-sm md:text-base text-[#EDEDED] whitespace-pre-line leading-relaxed opacity-80">{val.desc}</span>
                                                    </div>
                                                    <span className="font-sans font-light text-[3.5rem] md:text-[5rem] leading-none text-[#E8C96A] opacity-40 ml-4">{val.num}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {tab.type === "team" && (
                                    <div className="flex flex-col items-center justify-center w-full h-full relative">
                                        <h3 className="tracking-tighter z-0 leading-none whitespace-nowrap absolute top-[-3rem]" style={{ fontFamily: 'sans-serif', color: '#E8C96A', fontSize: '5rem' }}>{tab.title}</h3>
                                        <div className="relative w-full aspect-[4/3] xl:aspect-video z-10 mt-6 rounded-2xl overflow-hidden shadow-2xl border border-[#E8C96A]/20">
                                            <Image src={tab.teamImage} alt="Our Team" fill className="object-cover rounded-[2rem]" />
                                            <div className=" absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent opacity-60" />
                                        </div>
                                        <div className="mt-12 flex flex-col items-center text-center gap-4 z-20">
                                            {tab.roles.map((line, i) => (
                                                <p key={i} className="font-sans text-xs sm:text-sm xl:text-base tracking-[0.2em] text-[#EDEDED] font-bold uppercase opacity-90">{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {tab.type === "founders" && (
                                    <div className="flex flex-col sm:flex-row gap-8 w-full items-start">
                                        {/* Large portrait card */}
                                        <div className="flex flex-col relative w-full sm:w-[45%] flex-shrink-0 aspect-[3/4] group rounded-2xl overflow-hidden border border-[#E8C96A]/30 shadow-2xl bg-[#0F1E38]">
                                            {tab.founders.map((founder, i) => (
                                                <div key={i} className="relative w-full h-full">
                                                    <Image src={founder.image} alt={founder.name} fill className="object-cover opacity-90 grayscale group-hover:grayscale-0 transition-all duration-500" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-transparent to-transparent opacity-60" />
                                                    <span className="absolute bottom-4 left-0 right-0 text-center font-sans font-bold text-base text-[#EDEDED] px-2">{founder.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                        {/* Heading fills remaining space */}
                                        <div className="flex-1 flex items-end pb-4">
                                            <h3 className="text-[3rem] xl:text-[5rem] tracking-tighter text-[#E8C96A] leading-[0.9]" style={{ fontFamily: 'sans-serif' }}>{tab.title}</h3>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
