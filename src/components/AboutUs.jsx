"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function AboutUs() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end end"]
    });

    // Animate the dot moving vertically down the 100% height line 
    const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    // Staggered reveal variants for the massive stats
    const statsContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const statItem = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <section ref={containerRef} className="relative w-full bg-[#0A1628] py-24 sm:py-32 overflow-visible text-[#EDEDED]">
            <div className="container mx-auto px-6 lg:px-12 xl:px-24">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative items-start">

                    {/* The Central Animated Timeline Divider */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#E8C96A]/30 hidden lg:block -translate-x-1/2 rounded-full">
                        <motion.div
                            style={{ y: dotY }}
                            className="absolute -left-[5.5px] w-3 h-3 bg-[#E8C96A] rounded-full shadow-[0_0_15px_#E8C96A] will-change-transform"
                        />
                    </div>

                    {/* Left Column (Sticky Content & Links) */}
                    <div className="sticky top-12 lg:top-24 flex flex-col justify-between order-2 lg:order-1 pt-8 lg:pt-0 h-auto lg:h-[calc(100vh-12rem)] z-10">
                        <div>
                            <h3 className="'Helvetica Neue', Helvetica, Arial, sans-serif font-bold text-[#E8C96A] uppercase tracking-widest text-sm mb-6">About Us</h3>

                            <h2 className="'Helvetica Neue', Helvetica, Arial, sans-serif font-medium text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem] leading-[1.1] mb-8 text-[#EDEDED] tracking-tight">
                                Transform A Space for Work, <br className="hidden xl:block" /> Into A Space for Life
                            </h2>

                            <p className="'Helvetica Neue', Helvetica, Arial, sans-serif text-lg text-[#EDEDED]/80 max-w-lg mb-12">
                                HF Realtors is a reliable architecture & real estate firm in the global market that provides integrated services for elite emotional acquisition.
                            </p>

                            {/* Nav Links */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 mb-16">
                                {["Who We Are", "Our Values", "Our Team", "Founders"].map((link) => (
                                    <div key={link} className="flex items-center gap-3 text-[#E8C96A] group cursor-pointer w-fit">
                                        <ArrowRight size={16} className="text-[#E8C96A] transition-transform duration-300 group-hover:translate-x-1" />
                                        <span className="'Helvetica Neue', Helvetica, Arial, sans-serif text-[#EDEDED] group-hover:text-[#E8C96A] transition-colors">{link}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Anchored Left Image */}
                        <div className="relative w-full h-[300px] sm:h-[400px] rounded-[2rem] overflow-hidden">
                            <Image
                                src="/images/interior.png"
                                alt="Modern Interior Space"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-[#0A1628]/30 mix-blend-multiply" />
                        </div>
                    </div>

                    {/* Right Column (Scrolling Massive Animated Statistics) */}
                    <div className="flex flex-col justify-start order-1 lg:order-2 pl-0 lg:pl-[10%] pt-8 lg:pt-[20vh] pb-8 lg:pb-[25vh] z-10">
                        <div className="mb-12">
                            <h4 className="'Helvetica Neue', Helvetica, Arial, sans-serif font-bold text-[#E8C96A] uppercase tracking-widest text-sm mb-6 lg:mb-16 ">Who We Are</h4>
                        </div>

                        <motion.div
                            variants={statsContainer}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-100px" }}
                            className="flex flex-col gap-24 lg:gap-[30vh]"
                        >
                            {/* Stat 1 */}
                            <motion.div variants={statItem} className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start xl:items-center justify-between xl:gap-8">
                                <span className="'Helvetica Neue', Helvetica, Arial, sans-serif font-light text-[6rem] sm:text-[8rem] lg:text-[7rem] xl:text-[9.5rem] leading-[0.8] text-[#E8C96A] tracking-tighter">
                                    18+
                                </span>
                                <span className="'Helvetica Neue', Helvetica, Arial, sans-serif text-xl text-[#E8C96A] text-left sm:text-right lg:text-left xl:text-right mt-4 sm:mt-8 lg:mt-4 xl:mt-8 xl:w-48 leading-snug">
                                    Years Of Experience
                                </span>
                            </motion.div>

                            {/* Stat 2 */}
                            <motion.div variants={statItem} className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start xl:items-center justify-between xl:gap-8">
                                <span className="'Helvetica Neue', Helvetica, Arial, sans-serif font-light text-[6rem] sm:text-[8rem] lg:text-[7rem] xl:text-[9.5rem] leading-[0.8] text-[#E8C96A] tracking-tighter">
                                    08
                                </span>
                                <span className="'Helvetica Neue', Helvetica, Arial, sans-serif text-xl text-[#E8C96A] text-left sm:text-right lg:text-left xl:text-right mt-4 sm:mt-8 lg:mt-4 xl:mt-8 xl:w-48 leading-snug">
                                    Sq. ft. transacted
                                </span>
                            </motion.div>

                            {/* Stat 3 */}
                            <motion.div variants={statItem} className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start xl:items-center justify-between xl:gap-8">
                                <span className="'Helvetica Neue', Helvetica, Arial, sans-serif font-light text-[6rem] sm:text-[8rem] lg:text-[7rem] xl:text-[9.5rem] leading-[0.8] text-[#E8C96A] tracking-tighter">
                                    3M
                                </span>
                                <span className="'Helvetica Neue', Helvetica, Arial, sans-serif text-xl text-[#E8C96A] text-left sm:text-right lg:text-left xl:text-right mt-4 sm:mt-8 lg:mt-4 xl:mt-8 xl:w-48 leading-snug">
                                    Closed Deals
                                </span>
                            </motion.div>
                        </motion.div>

                    </div>

                </div>
            </div>
        </section>
    );
}
