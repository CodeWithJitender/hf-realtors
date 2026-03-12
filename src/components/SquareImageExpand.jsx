"use client";

import { useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

export default function SquareImageExpand() {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Animate clip-path from a tiny rectangle in the center to full screen
    // inset(top right bottom left)
    // Start: inset(48% 45% 48% 45%) -> a small 10% x 4% rectangle
    // End: inset(0% 0% 0% 0%) -> full screen
    const clipPath = useTransform(scrollYProgress, [0, 0.7], ["inset(48% 45% 48% 45%)", "inset(0% 0% 0% 0%)"]);

    // Background color fades if needed, but the mask itself is solid.
    
    // Bottom logo or text fades out
    const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

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
        <section ref={containerRef} className="relative w-full h-[300vh] bg-[#7A1315] z-20">
            {/* Sticky Container holds the layout for 200vh of scrolling */}
            <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#7A1315] z-10 flex flex-col justify-between">
                
                {/* Top Nav/Details in the mask (optional, from screenshot) */}
                <motion.div style={{ opacity: textOpacity }} className="absolute top-1/2 left-8 -translate-y-1/2 flex items-center gap-4 z-0 text-white font-sans text-xs tracking-widest font-bold">
                    [+] NAVIGATION
                </motion.div>
                <motion.div style={{ opacity: textOpacity }} className="absolute top-1/2 left-40 -translate-y-1/2 flex items-center gap-4 z-0 text-white font-sans text-xs tracking-widest font-bold">
                    RU
                </motion.div>
                <motion.div style={{ opacity: textOpacity }} className="absolute top-1/2 right-8 -translate-y-1/2 flex items-center gap-4 z-0 text-white font-sans text-xs tracking-widest font-bold">
                    LET'S DISCUSS ↗
                </motion.div>
                
                {/* Bottom Logo in the mask */}
                <motion.div 
                    style={{ opacity: textOpacity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center z-0"
                >
                    <h2 className="text-white text-4xl font-sans tracking-tighter" style={{ fontFamily: 'var(--font-futura), Futura, sans-serif', fontWeight: 'bold' }}>
                        HF
                    </h2>
                </motion.div>

                {/* 
                    The Reveal Layer (Video) 
                    This layer sits ON TOP of the red mask but is clipped into a tiny rectangle initially.
                    As we scroll, the rectangle expands out.
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
                        {/* Placeholder high quality real estate drone shot */}
                        <source src="https://player.vimeo.com/external/498305007.sd.mp4?s=d95e790ec378d38cbbeb2eafa0f379ae2c5f1111&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Subtle Video Overlay */}
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
