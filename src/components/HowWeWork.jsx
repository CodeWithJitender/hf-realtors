"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/RevealText";

const journeySteps = [
    {
        title: "Understand Your Vision",
        desc: "A deep dive into your financial aspirations, lifestyle preferences, and long-term vision. We align our strategy completely with your distinct reality before moving forward."
    },
    {
        title: "Strategic Asset Selection",
        desc: "Sourcing off-market, premium, and high-yield assets that perfectly match your established criteria through rigorous data analysis and exclusive network access."
    },
    {
        title: "Acquisition & Structuring",
        desc: "Optimizing the acquisition through strategic financing models and wealth building frameworks to ensure maximum leverage, security, and tax efficiency."
    },
    {
        title: "Architectural Enhancement",
        desc: "Leveraging our GlocalDesign.in partnership to elevate the asset’s intrinsic and aesthetic value through structural foresight and premium 3D design mapping."
    },
    {
        title: "Ongoing Yield Management",
        desc: "Proactive portfolio monitoring and seamless administrative oversight for sustained yield, appreciation, and absolute peace of mind for you and your family."
    }
];

export default function HowWeWork() {
    return (
        <section id="how-it-works" className="relative bg-[#0A1628] text-[#EDEDED] py-fluid-section min-h-screen 'Helvetica Neue', Helvetica, Arial, sans-serif border-t border-[#EDEDED]/5">
            <div className="max-w-[1920px] mx-auto w-full lg:flex lg:flex-row relative">

                {/* Mobile/Tablet Header (Only visible < lg) */}
                <div className="lg:hidden w-full px-8 py-12 md:py-20 text-center relative z-20 bg-[#0A1628]">
                    <RevealText delay={0.1} className="mb-4 text-[var(--accent)] font-bold tracking-widest uppercase text-xs">
                        <h2>The Journey</h2>
                    </RevealText>
                    <RevealText delay={0.2}>
                        <h3 className="text-4xl sm:text-5xl font-serif font-medium tracking-tight leading-tight text-[#EDEDED] drop-shadow-md">
                            Progressive <br /> Reveal.
                        </h3>
                    </RevealText>
                </div>

                {/* Left Column: Sticky Context (Desktop Only) */}
                <div className="hidden lg:flex lg:w-[45%] sticky top-0 h-screen flex-col items-center justify-center relative overflow-hidden border-r border-[#EDEDED]/5 bg-[#0A1628]/50">

                    {/* Sticky Context Headers */}
                    <div className="absolute top-1/3 left-16 z-20 transform -translate-y-1/2">
                        <RevealText delay={0.1} className="mb-4">
                            <h2 className="text-[#E8C96A] font-medium 'Helvetica Neue', Helvetica, Arial, sans-serif tracking-widest uppercase text-sm inline-block border border-[#E8C96A]/30 rounded-full py-2 px-6 bg-[#E8C96A]/10">
                                The Journey
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2} className="mt-6">
                            <h3 className="text-6xl xl:text-7xl font-serif font-medium tracking-tight text-[#EDEDED] leading-[1] drop-shadow-md">
                                Progressive <br /> Reveal.
                            </h3>
                        </RevealText>
                        <RevealText delay={0.3} className="mt-8">
                            <p className="text-[#EDEDED] text-lg sm:text-xl 'Helvetica Neue', Helvetica, Arial, sans-serif leading-relaxed max-w-lg">
                                Our 5-step methodology ensures absolute precision from conceptualization to execution, delivering unmatched wealth-tech service tailored to your distinct operational reality.
                            </p>
                        </RevealText>
                    </div>

                    {/* Subtle Background Glow instead of full graphic */}
                    <div className="absolute w-96 h-96 bg-[var(--accent)] rounded-full blur-[150px] opacity-10 animate-pulse pointer-events-none" />

                    {/* Bottom fade for the sticky column */}
                    <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0A1628] to-transparent z-10" />
                </div>

                {/* Right Column: Scrolling Timeline */}
                <div className="w-full lg:w-[55%] relative px-fluid-container py-16 lg:pt-[50vh] lg:pb-[50vh] bg-[#0A1628]">

                    {/* Continuous subtle background grid */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,black,rgba(0,0,0,0))] opacity-[0.05] pointer-events-none" />

                    <div className="relative z-10 max-w-2xl mx-auto lg:ml-0">
                        {journeySteps.map((step, i) => (
                            <div key={i} className="relative flex gap-6 md:gap-12 mb-24 md:mb-40 lg:mb-64 last:mb-0">

                                {/* Timeline Graphics Sidebar */}
                                <div className="w-8 md:w-12 flex-shrink-0 flex flex-col items-center relative pt-2">
                                    {/* Dashed Tracking Line (Connecting to next step) */}
                                    {i !== journeySteps.length - 1 && (
                                        <div className="absolute top-8 bottom-[-100%] lg:bottom-[-200px] w-px border-l-2 border-dashed border-[#EDEDED]/20" />
                                    )}

                                    {/* Active Step Indicator Dot */}
                                    <div className="relative w-4 h-4 rounded-full bg-[#0A1628] border-2 border-[#EDEDED]/40 flex items-center justify-center z-10">
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: false, amount: 0.8 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            className="absolute inset-0 rounded-full bg-[#E8C96A] shadow-[0_0_15px_#E8C96A] w-full h-full"
                                        />
                                    </div>
                                </div>

                                {/* Step Content (Progressive Reveal) */}
                                <div className="flex-grow pt-1">
                                    <RevealText delay={0.1} className="mb-3">
                                        <p className="text-[var(--accent)] font-bold tracking-widest uppercase text-xs sm:text-sm">
                                            Step {i + 1}
                                        </p>
                                    </RevealText>
                                    <RevealText delay={0.2} className="mb-6">
                                        <h4 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-[#E8C96A] leading-[1.1]">
                                            {step.title}
                                        </h4>
                                    </RevealText>
                                    <RevealText delay={0.3}>
                                        <p className="text-[#EDEDED] 'Helvetica Neue', Helvetica, Arial, sans-serif text-base sm:text-lg lg:text-xl leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </RevealText>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
}
