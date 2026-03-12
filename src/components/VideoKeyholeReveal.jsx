"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function VideoKeyholeReveal() {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // 1. Keyhole Expansion
    // Scales the circle clip-path from a small keyhole (10vw) to fully revealing the screen (150vw minimum safely covers most modern displays diagonally).
    const clipPathSize = useTransform(scrollYProgress, [0, 0.7], ["10vw", "150vw"]);
    const clipPath = useTransform(clipPathSize, size => `circle(${size} at center)`);

    // 2. Text Fade Out
    // Fades the text out quickly as soon as the keyhole begins to expand substantially.
    const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolume = () => {
        setIsMuted(!isMuted);
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
        }
    };

    return (
        <section ref={containerRef} className="relative w-full h-[300vh] bg-[#163548] z-20">
            {/* Sticky Container holds the layout for 200vh of scrolling */}
            <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#163548] z-10">
                
                {/* 
                    Background layer: Deep Navy mask.
                    We put the mask underneath as the default color, and the video on top dynamically clipped.
                */}
                <div className="absolute inset-0 bg-[#163548] z-0 flex items-center justify-center">
                    {/* The Typography overlays the Navy mask, centered in the 'keyhole' initially. */}
                    <motion.h2 
                        style={{ opacity: textOpacity }}
                        className="font-sans font-bold uppercase text-[#EDEDED] text-center w-full px-4 text-[clamp(2rem,6vw,5rem)] leading-tight tracking-wide mix-blend-difference pointer-events-none"
                    >
                        We Are Building <br />
                        The Future Of <br />
                        Real Estate
                    </motion.h2>
                </div>

                {/* 
                    The Reveal Layer (Video) 
                    This layer sits ON TOP of the Navy mask but is clipped into a tiny circle initially.
                    As we scroll, the circle expands out.
                */}
                <motion.div 
                    className="absolute inset-0 z-20 w-full h-full"
                    style={{ clipPath }}
                >
                    {/* Video Element */}
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        onLoadedData={() => setIsLoaded(true)}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    >
                        {/* Placeholder high quality real estate drone shot from a reliable CDN */}
                        <source src="https://player.vimeo.com/external/498305007.sd.mp4?s=d95e790ec378d38cbbeb2eafa0f379ae2c5f1111&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Subtle Video Overlay (Optional: helps contrast if video is too bright) */}
                    <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                    
                    {/* Video Controls (Visible only after significant expansion) */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ margin: "-50% 0px -50% 0px", once: false }}
                        transition={{ duration: 0.5 }}
                        className="absolute bottom-12 right-12 z-20 flex items-center gap-4 hidden md:flex"
                    >
                        <button 
                            onClick={handleVolume}
                            className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors border border-white/20"
                            aria-label={isMuted ? "Unmute video" : "Mute video"}
                        >
                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                        <button 
                            onClick={handlePlayPause}
                            className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors border border-white/20"
                            aria-label={isPlaying ? "Pause video" : "Play video"}
                        >
                            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
