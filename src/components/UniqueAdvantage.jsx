"use client";

import { motion } from "framer-motion";

export default function UniqueAdvantage() {
    // The massive text broken down for staggered clip reveals
    const textLines = [
        { text: "LET’S FIND", hasIcon: false },
        { text: "THE RIGHT ", hasIcon: true },
        { text: "PROPERTY ", hasIcon: false },
        { text: "FOR YOU!", hasIcon: true },
    ];

    const iconVariants = {
        hidden: { scale: 0.5, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 1,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <section className="relative w-full min-h-screen py-fluid-section px-fluid-container flex flex-col items-center justify-center bg-[#163548]">

            {/* The Zentry-style Eyebrow Label */}
            {/* <div className="text-center mb-16 md:mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.2, 0.65, 0.3, 0.9] }}
                >
                    <p className="text-[10px] md:text-xs font-semibold tracking-[0.3em] text-[#FFED7E]/70 uppercase">
                        Who We Are
                    </p>
                </motion.div>
            </div> */}

            {/* Massive Clip-Reveal Typography Block */}
            <div className="flex flex-col items-center justify-center w-full">
                {textLines.map((line, index) => (
                    <div key={index} className="flex items-center gap-4 md:gap-8 pt-2 pb-1">

                        {/* Decorative Icon Before Specific Lines */}
                        {/* {line.hasIcon && (
                            <motion.div variants={iconVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center justify-center">
                                Abstract Zentry-style blob/shape
                                <div className="w-4 h-4 md:w-8 md:h-8 lg:w-12 lg:h-12 bg-[#CCA14D] rounded-sm rotate-45" />
                            </motion.div>
                        )} */}

                        <h2 className="text-[14vw] md:text-[11vw] leading-[0.8] font-serif font-medium tracking-tight text-[#EDEDED] text-center flex-shrink-0 drop-shadow-md flex flex-wrap justify-center overflow-hidden">
                            {line.text.split(" ").map((word, wordIndex) => (
                                <motion.span
                                    key={wordIndex}
                                    className="inline-block mr-[2vw]" // spacing between words
                                    initial={{ opacity: 0, y: "100%" }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.1 * index + wordIndex * 0.1, // stagger by line then by word
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </h2>

                        {/* Decorative Icon After Specific Lines (Alternate) */}
                        {!line.hasIcon && index % 2 !== 0 && (
                            <motion.div
                                variants={iconVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                className="flex items-center justify-center"
                            >
                                <div className="w-3 h-3 md:w-6 md:h-6 lg:w-10 lg:h-10 bg-[#CCA14D]/80 rounded-full" />
                            </motion.div>
                        )}

                    </div>
                ))}
            </div>

            {/* Brief descriptive text below the massive block */}
            <div className="mt-20 max-w-xl text-center mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }}
                >
                    <p className="text-[#EDEDED] font-sans text-sm md:text-base leading-relaxed">
                        Partner with the only real estate firm providing complimentary premium architectural redesign. We transform spaces before you even hold the keys.
                    </p>
                </motion.div>
            </div>

        </section>
    );
}
