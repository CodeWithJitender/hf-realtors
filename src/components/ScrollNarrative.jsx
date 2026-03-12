"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────────────────
   ScrollNarrative
   - Full-screen aerial real-estate photo background
   - GSAP scrub timeline reveals heading → P1 → P2 → P3
   - ALL text stays visible once revealed (stacked)
   - Section stays PINNED until last paragraph is fully in view
───────────────────────────────────────────────────────── */
export default function ScrollNarrative() {
  const wrapRef    = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const p1Ref      = useRef(null);
  const p2Ref      = useRef(null);
  const p3Ref      = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const wrap    = wrapRef.current;
    const section = sectionRef.current;
    if (!wrap || !section) return;

    const ctx = gsap.context(() => {
      /* Start all text hidden & shifted down */
      gsap.set([headingRef.current, p1Ref.current, p2Ref.current, p3Ref.current], {
        opacity: 0,
        y: 48,
      });

      /*
        Timeline:  duration = 16 units total
          0  – 4  → heading fades / slides in
          4  – 8  → P1 fades / slides in   (heading still visible)
          8  – 12 → P2 fades / slides in   (heading + P1 still visible)
          12 – 16 → P3 fades / slides in   (all still visible)
        Section is pinned for 16 units of scroll travel (~500vh)
        Only unpins AFTER all four items are fully revealed.
      */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          pin: section,
          pinSpacing: true,
          scrub: 1.4,
          start: "top top",
          end: "+=500%",          // ≈ 5 × 100vh of scroll
        },
      });

      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 3.5, ease: "power2.out" }, 0.5);
      tl.to(p1Ref.current,      { opacity: 1, y: 0, duration: 3.5, ease: "power2.out" }, 4.5);
      tl.to(p2Ref.current,      { opacity: 1, y: 0, duration: 3.5, ease: "power2.out" }, 8.5);
      tl.to(p3Ref.current,      { opacity: 1, y: 0, duration: 3.5, ease: "power2.out" }, 12.5);
      tl.to({}, { duration: 1 }, 16); // hold at end before unpin

    }, wrap);

    return () => ctx.revert();
  }, []);

  /* shared body paragraph style */
  const body = {
    fontFamily: "var(--font-poppins), sans-serif",
    fontSize: "clamp(0.95rem, 1.55vw, 1.18rem)",
    fontWeight: 400,
    color: "rgba(237,237,237,0.88)",
    lineHeight: 1.85,
    textAlign: "center",
    maxWidth: "62ch",
    margin: "0 auto",
    textShadow: "0 2px 16px rgba(0,0,0,0.7)",
  };

  const gold = { color: "#CCA14D", fontWeight: 500 };

  return (
    <div ref={wrapRef} style={{ width: "100%", position: "relative" }}>
      <section
        ref={sectionRef}
        style={{
          width: "100vw",
          marginLeft: "calc((100% - 100vw) / 2)",
          height: "100vh",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* ── Aerial real-estate photo background ── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "url('/images/real_estate_aerial_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center 55%",
          backgroundRepeat: "no-repeat",
        }} />

        {/* ── Dark overlay layers ── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "rgba(5,10,18,0.52)",
        }} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(to bottom, rgba(5,10,18,0.72) 0%, transparent 30%, transparent 70%, rgba(5,10,18,0.78) 100%)",
        }} />
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "80%", height: "80%",
          background: "radial-gradient(ellipse, rgba(5,10,18,0.6) 0%, transparent 68%)",
          zIndex: 2, pointerEvents: "none",
        }} />

        {/* ── Gold hairlines top / bottom ── */}
        {["top", "bottom"].map(pos => (
          <div key={pos} style={{
            position: "absolute", [pos]: 0, left: 0, right: 0,
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(204,161,77,0.5), transparent)",
            zIndex: 8,
          }} />
        ))}

        {/* ─────────────────────────────────────
            TEXT BLOCK — all stacked, revealed progressively
           ───────────────────────────────────── */}
        <div style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(1.4rem, 2.8vh, 2.4rem)",
          padding: "clamp(2rem,4vh,3rem) 0",
        }}>

          {/* Eyebrow label */}
          <p style={{
            fontFamily: "var(--font-poppins), sans-serif",
            fontSize: "clamp(0.55rem, 0.8vw, 0.68rem)",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "#CCA14D",
            fontWeight: 600,
            margin: 0,
            opacity: 0.85,
          }}>
            HF Realtors &nbsp;·&nbsp; Our Story
          </p>

          {/* ── Stage 1: Main Heading ── */}
          <div ref={headingRef} style={{ willChange: "transform, opacity", textAlign: "center" }}>
            <h2 style={{
              fontFamily: "var(--font-poppins), sans-serif",
              fontSize: "clamp(2.4rem, 5.8vw, 5.2rem)",
              fontWeight: 700,
              color: "#EDEDED",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              textTransform: "uppercase",
              margin: 0,
              textShadow: "0 4px 40px rgba(0,0,0,0.8), 0 0 60px rgba(204,161,77,0.15)",
            }}>
              Building &amp; Managing<br />
              <span style={{ color: "#CCA14D", textShadow: "0 0 40px rgba(204,161,77,0.5)" }}>
                Real Estate Value
              </span>
            </h2>
          </div>

          {/* Gold divider */}
          <div style={{
            width: "clamp(50px, 7vw, 90px)",
            height: "1px",
            background: "linear-gradient(to right, transparent, #CCA14D, transparent)",
            opacity: 0.5,
          }} />

          {/* ── Stage 2: Paragraph 1 ── */}
          <p ref={p1Ref} style={{ ...body, willChange: "transform, opacity" }}>
            HF Realtors is an independent real estate advisory firm focused on helping clients
            build, manage, and optimize property investments with{" "}
            <span style={gold}>clarity and confidence.</span>
          </p>

          {/* ── Stage 3: Paragraph 2 ── */}
          <p ref={p2Ref} style={{ ...body, willChange: "transform, opacity" }}>
            We work closely with individuals and investors to identify opportunities in
            residential and commercial real estate — guided by{" "}
            <span style={gold}>market insight, transparency, and long-term value creation.</span>
          </p>

          {/* ── Stage 4: Paragraph 3 ── */}
          <p ref={p3Ref} style={{ ...body, willChange: "transform, opacity" }}>
            As the market evolves, we continue to refine our approach, delivering{" "}
            <span style={gold}>thoughtful advisory and sustainable outcomes</span>{" "}
            for every client we serve.
          </p>

        </div>
      </section>
    </div>
  );
}
