"use client";

import { useRef, useEffect } from "react";

import { useScroll, useMotionValueEvent } from "framer-motion";
import RevealText from "@/components/RevealText";
import Button from "@/components/Button";

// 200 frames: ezgif-frame-001.jpg → ezgif-frame-200.jpg
const FRAME_COUNT = 200;

// Zero-padded frame path helper
function framePath(index) {
    const n = String(index + 1).padStart(3, "0");
    return `/frames/ezgif-frame-${n}.jpg`;
}

export default function Hero() {
    const wrapperRef = useRef(null); // outer scroll container (400vh)
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);   // preloaded Image objects
    const frameRef = useRef(0);    // current drawn frame index
    const rafRef = useRef(null); // requestAnimationFrame handle

    // Framer Motion scroll progress across the full 400vh wrapper
    const { scrollYProgress } = useScroll({
        target: wrapperRef,
        offset: ["start start", "end end"],
    });

    // ── Draw a specific frame onto the canvas ──────────────────────
    const drawFrame = (index) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const img = imagesRef.current[index];
        if (!img?.complete || !img.naturalWidth) return;

        const ctx = canvas.getContext("2d");

        // Use CSS pixel dimensions for drawing (matches the scaled context)
        const W = canvas.offsetWidth;
        const H = canvas.offsetHeight;

        // Cover-fit: fill canvas maintaining source aspect ratio
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = W / H;

        let sw, sh, sx, sy;
        if (imgRatio > canvasRatio) {
            sh = img.naturalHeight;
            sw = sh * canvasRatio;
            sx = (img.naturalWidth - sw) / 2;
            sy = 0;
        } else {
            sw = img.naturalWidth;
            sh = sw / canvasRatio;
            sx = 0;
            sy = (img.naturalHeight - sh) / 2;
        }

        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
    };

    // ── Preload all frames ─────────────────────────────────────────
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas resolution to device pixel ratio for sharpness
        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = canvas.offsetWidth * dpr;
            canvas.height = canvas.offsetHeight * dpr;
            const ctx = canvas.getContext("2d");
            ctx.scale(dpr, dpr);
            drawFrame(frameRef.current);
        };

        resize();
        window.addEventListener("resize", resize);

        // Load all frames, draw first on load
        const images = [];
        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            img.src = framePath(i);
            if (i === 0) {
                img.onload = () => drawFrame(0);
            }
            images.push(img);
        }
        imagesRef.current = images;

        return () => {
            window.removeEventListener("resize", resize);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Scroll → frame index ───────────────────────────────────────
    useMotionValueEvent(scrollYProgress, "change", (progress) => {
        const targetFrame = Math.min(
            Math.floor(progress * FRAME_COUNT),
            FRAME_COUNT - 1
        );

        if (targetFrame === frameRef.current) return;
        frameRef.current = targetFrame;

        // Use rAF to avoid drawing more than once per paint
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(targetFrame));
    });

    return (
        /* ── Outer wrapper: 120vh on mobile (no animation), 400vh on desktop ── */
        <div ref={wrapperRef} className="relative h-[120vh] lg:h-[400vh]">

            {/* ── Sticky viewport — true 100vw × 100vh ── */}
            <div className="sticky top-0 w-screen h-screen bg-[#0a1a28] 'Helvetica Neue', Helvetica, Arial, sans-serif overflow-hidden" style={{ willChange: "transform" }}>

                {/* Canvas — full-bleed, cover-fit frame display */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full z-0"
                    style={{ display: "block" }}
                />

                {/* Dark overlay — 25% keeps typography legible */}
                <div className="absolute inset-0 bg-black/25 z-[1]" />

                {/* Bottom gradient for heading contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-[2]" />

                {/* ── Cinematic Content ── */}
                <div className="absolute bottom-0 left-0 right-0 w-full px-fluid-container pb-[clamp(5rem,12vh,9rem)] z-10 mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">

                        {/* Left: Heading */}
                        <div className="lg:col-span-8 xl:col-span-7 flex flex-col justify-end">
                            <RevealText delay={0.4}>
                                <h1 className="tracking-tight text-[#FFFFFF] leading-[1] lg:leading-[0.9] pb-4 drop-shadow-xl">
                                    <span className="block font-bold" style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", fontFamily: "var(--font-display)" }}>Real Estate.</span>
                                    <span className="block font-light italic -mt-1" style={{ fontSize: "clamp(1.8rem, 4.5vw, 4.5rem)", fontFamily: "var(--font-display)", color: "#C5D6EE" }}>Managed end-to-end.</span>
                                </h1>
                            </RevealText>
                        </div>

                        {/* Right: Tagline + CTAs */}
                        <div className="lg:col-span-4 xl:col-span-5 flex flex-col justify-end lg:pb-6">
                            <RevealText delay={0.6} className="mb-10">
                                <p className="text-fluid-body font-normal leading-relaxed max-w-md xl:max-w-lg" style={{ color: "#C5D6EE" }}>
                                    From transactions to long-term portfolio and wealth management, we manage real estate with precision.
                                </p>
                            </RevealText>

                            <RevealText delay={0.8}>
                                <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 relative z-50">
                                    <Button variant="gold" href="#">
                                        Book A Consultation
                                    </Button>
                                    <Button variant="outlined">
                                        Discover Partner Design
                                    </Button>
                                </div>
                            </RevealText>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
