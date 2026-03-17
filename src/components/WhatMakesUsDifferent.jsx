"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Card data ─── */
const CARDS = [
  {
    number: "01",
    title: "Advisory,\nNot Just Brokerage",
    body: "We focus on informed decision-making and long-term value, not just closing transactions. Every recommendation is backed by research tailored to your goals.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="19" stroke="url(#g1)" strokeWidth="1.4" />
        <path d="M12 26 L20 13 L28 26" stroke="#CCA14D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="16" y1="26" x2="24" y2="26" stroke="#CCA14D" strokeWidth="1.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#CCA14D" /><stop offset="1" stopColor="#7A5C1E" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Access\nThat Matters",
    body: "Through our network and deep market insights, we uncover opportunities well beyond standard listings — giving you an edge before the market moves.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="19" stroke="#CCA14D" strokeWidth="1.4" opacity="0.6" />
        <circle cx="17" cy="18" r="6" stroke="#CCA14D" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="22" y1="23" x2="30" y2="31" stroke="#CCA14D" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Design +\nInvestment Thinking",
    body: "We evaluate properties not only for their current value but for their potential — aesthetically and financially — ensuring each acquisition compounds over time.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="19" stroke="#CCA14D" strokeWidth="1.4" opacity="0.6" />
        <rect x="10" y="13" width="20" height="14" rx="2" stroke="#CCA14D" strokeWidth="1.5" />
        <line x1="15" y1="13" x2="15" y2="27" stroke="#CCA14D" strokeWidth="1" opacity="0.55" />
        <line x1="20" y1="13" x2="20" y2="27" stroke="#CCA14D" strokeWidth="1" opacity="0.55" />
        <line x1="10" y1="20" x2="30" y2="20" stroke="#CCA14D" strokeWidth="1" opacity="0.55" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Precision\n& Discretion",
    body: "Every mandate is handled with structured processes, complete confidentiality, and a client-first mindset. Your trust is our most valued asset.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="19" stroke="#CCA14D" strokeWidth="1.4" opacity="0.6" />
        <path d="M20 10 L27 14 L27 22 C27 27 20 31 20 31 C20 31 13 27 13 22 L13 14 Z" stroke="#CCA14D" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M16 21 L18.5 23.5 L24 17" stroke="#CCA14D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* ─── Card component ─── */
function DiffCard({ card, cardRef }) {
  return (
    <div
      ref={cardRef}
      style={{
        flex: "0 0 clamp(300px, 33vw, 430px)",
        height: "clamp(380px, 56vh, 500px)",
        background: "linear-gradient(145deg, #1D3E5A 0%, #163548 55%, #11293A 100%)",
        border: "1px solid rgba(204,161,77,0.38)",
        borderTop: "2px solid rgba(204,161,77,0.65)",
        borderRadius: "18px",
        padding: "clamp(2rem, 3.5vw, 2.8rem)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 12px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(204,161,77,0.10), inset 0 1px 0 rgba(204,161,77,0.14)",
        willChange: "transform",
      }}
    >
      {/* Top-right glow */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "120px", height: "120px",
        background: "radial-gradient(circle at top right, rgba(204,161,77,0.18) 0%, transparent 65%)",
        borderRadius: "0 18px 0 0",
        pointerEvents: "none",
      }} />
      {/* Bottom gold shimmer line */}
      <div style={{
        position: "absolute", bottom: 0, left: "10%", right: "10%",
        height: "1px",
        background: "linear-gradient(to right, transparent, rgba(204,161,77,0.5), transparent)",
      }} />

      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{
          fontFamily: "var(--font-futura), Futura, sans-serif",
          fontSize: "clamp(0.62rem, 0.85vw, 0.75rem)",
          fontWeight: 700,
          letterSpacing: "0.35em",
          color: "#CCA14D",
          opacity: 0.8,
        }}>{card.number}</span>
        {card.icon}
      </div>

      {/* Title block */}
      <div>
        <div style={{
          width: "36px", height: "2px",
          background: "linear-gradient(to right, #CCA14D, transparent)",
          marginBottom: "clamp(0.7rem,1.4vh,1.1rem)",
          borderRadius: "2px",
        }} />
        <h3 style={{
          fontFamily: "var(--font-futura), Futura, sans-serif",
          fontSize: "clamp(1.45rem, 2.3vw, 1.95rem)",
          fontWeight: 700,
          color: "#EDEDED",
          lineHeight: 1.16,
          letterSpacing: "-0.02em",
          margin: 0,
          whiteSpace: "pre-line",
          textShadow: "0 2px 24px rgba(204,161,77,0.2)",
        }}>{card.title}</h3>
      </div>

      {/* Body */}
      <p style={{
        fontFamily: "var(--font-futura), Futura, sans-serif",
        fontSize: "clamp(0.8rem, 1.15vw, 0.92rem)",
        fontWeight: 400,
        color: "rgba(237,237,237,0.62)",
        lineHeight: 1.8,
        margin: 0,
      }}>{card.body}</p>
    </div>
  );
}

/* ─── Main export ─── */
export default function WhatMakesUsDifferent() {
  const wrapRef = useRef(null);
  const sectionRef = useRef(null);
  const perspRef = useRef(null);

  /* split-word heading refs */
  const word0 = useRef(null); // WHAT
  const word1 = useRef(null); // MAKES
  const word2 = useRef(null); // US
  const word3 = useRef(null); // DIFFERENT
  const subRef = useRef(null);

  const trackRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const wrap = wrapRef.current;
    const section = sectionRef.current;
    if (!wrap || !section) return;

    const words = [word0.current, word1.current, word2.current, word3.current];

    const ctx = gsap.context(() => {

      /* ── Initial states ── */
      gsap.set(words, {
        opacity: 0,
        y: 90,
        rotateX: -95,
        z: -400,
        transformOrigin: "center bottom -60px",
      });
      gsap.set(subRef.current, { opacity: 0, y: 24 });
      gsap.set(trackRef.current, { x: "105vw" });
      gsap.set(cardRefs.current, {
        rotateZ: (i) => i % 2 === 0 ? 14 : -14,
        rotateX: 18,
        opacity: 0,
      });

      /*
        MASTER SCRUB TIMELINE — 400vh
        0   – 4   : words slam in one by one (3D pop, staggered)
        3   – 4   : subline fades in
        4   – 5.5 : hold
        5.5 – 8.5 : heading + sub scale/fly away forward
        8.5 – 20  : horizontal card track slides in + cards settle from shake
      */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          pin: section,
          pinSpacing: true,
          scrub: 1.0,
          start: "top top",
          end: "+=400%",
        },
      });

      /* Stage 1: word-by-word 3D slam */
      words.forEach((w, i) => {
        tl.to(w, {
          opacity: 1, y: 0, rotateX: 0, z: 0,
          duration: 1.6,
          ease: "back.out(1.6)",
        }, i * 0.55);
      });

      tl.to(subRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, 2.0);

      /* Stage 2: heading flies forward + fades */
      tl.to([...words, subRef.current], {
        opacity: 0,
        scale: 2.2,
        z: 500,
        rotateX: 30,
        duration: 3,
        ease: "power2.in",
        stagger: 0.1,
      }, 5.5);

      /* Stage 3: cards slide in from right, each settling from shake */
      tl.to(trackRef.current, {
        x: () => {
          const trackW = trackRef.current.scrollWidth;
          const viewW = window.innerWidth;
          const pad = Math.max(56, viewW * 0.06);
          return -(trackW - viewW + pad);
        },
        duration: 12,
        ease: "none",
      }, 8.5);

      /* Cards: settle from shake as they enter */
      cardRefs.current.forEach((card, i) => {
        tl.to(card, {
          opacity: 1,
          rotateZ: 0,
          rotateX: 0,
          duration: 2.5,
          ease: "elastic.out(1, 0.6)",
        }, 8.5 + i * 0.8);

        /* Each card gets a gentle continuous sway once settled */
        tl.to(card, {
          rotateZ: i % 2 === 0 ? 2.5 : -2.5,
          rotateX: 3,
          duration: 3,
          yoyo: true,
          repeat: 2,
          ease: "sine.inOut",
        }, 10 + i * 0.6);
      });

    }, wrap);

    return () => ctx.revert();
  }, []);

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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          /* Rich warm-dark gold-tinted background */
          background: "#163548",
        }}
      >
        {/* ── Large ambient gold radial glow ── */}
        <div aria-hidden style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "90vw", height: "90vh",
          background: "radial-gradient(ellipse, rgba(204,161,77,0.13) 0%, rgba(204,161,77,0.06) 40%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }} />

        {/* ── Diagonal ruled lines texture ── */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 48px,
              rgba(204,161,77,0.03) 48px,
              rgba(204,161,77,0.03) 49px
            )
          `,
        }} />

        {/* ── Large ghost watermark text ── */}
        <div aria-hidden style={{
          position: "absolute",
          bottom: "-8%", left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-futura), Futura, sans-serif",
          fontSize: "clamp(7rem, 20vw, 18rem)",
          fontWeight: 900,
          letterSpacing: "-0.06em",
          textTransform: "uppercase",
          color: "rgba(204,161,77,0.04)",
          whiteSpace: "nowrap",
          userSelect: "none",
          zIndex: 0,
          lineHeight: 1,
        }}>DIFFERENT</div>



        {/* ════════════════════════════════════
            3D WORD-POP HEADING — perspective container
           ════════════════════════════════════ */}
        <div
          ref={perspRef}
          style={{
            position: "absolute", inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            perspective: "1100px",
            perspectiveOrigin: "50% 45%",
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          {/* Sub-label */}
          {/* <p ref={subRef} style={{
            fontFamily: "var(--font-futura), Futura, sans-serif",
            fontSize: "clamp(0.55rem, 0.82vw, 0.7rem)",
            letterSpacing: "0.46em",
            textTransform: "uppercase",
            color: "#CCA14D",
            fontWeight: 600,
            margin: "0 0 clamp(1.2rem,2.4vh,2rem)",
            padding: "0.38em 1.1em",
            border: "1px solid rgba(204,161,77,0.38)",
            borderRadius: "2px",
            background: "rgba(204,161,77,0.07)",
            willChange: "transform, opacity",
          }}>
            HF Realtors &nbsp;·&nbsp; Our Edge
          </p> */}

          {/* Word row 1 */}
          <div style={{ display: "flex", gap: "clamp(0.5rem,1.5vw,1.8rem)", lineHeight: 1 }}>
            <span ref={word0} style={wordStyle("#EDEDED")}>WHAT</span>
            <span ref={word1} style={wordStyle("#EDEDED")}>MAKES</span>
          </div>
          {/* Word row 2 */}
          <div style={{ display: "flex", gap: "clamp(0.5rem,1.5vw,1.8rem)", lineHeight: 1, marginTop: "0.06em" }}>
            <span ref={word2} style={wordStyle("#EDEDED")}>US</span>
            <span ref={word3} style={wordStyle("#CCA14D", true)}>DIFFERENT</span>
          </div>
        </div>

        {/* ════════════════════════════════════
            HORIZONTAL CARD TRACK
           ════════════════════════════════════ */}
        <div
          ref={trackRef}
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: "clamp(52px, 6vw, 110px)",
            display: "flex",
            alignItems: "center",
            gap: "clamp(20px, 2.8vw, 36px)",
            zIndex: 4,
            willChange: "transform",
            touchAction: "pan-x",
            perspective: "900px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {CARDS.map((card, i) => (
            <DiffCard
              key={i}
              card={card}
              cardRef={el => { if (el) cardRefs.current[i] = el; }}
            />
          ))}
          <div style={{ flex: "0 0 clamp(52px,6vw,110px)" }} />
        </div>

        {/* ── Gold hairlines ── */}
        {["top", "bottom"].map(pos => (
          <div key={pos} style={{
            position: "absolute", [pos]: 0, left: 0, right: 0,
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(204,161,77,0.55), transparent)",
            zIndex: 8,
          }} />
        ))}
      </section>
    </div>
  );
}

/* Shared word span style */
function wordStyle(color, glow = false) {
  return {
    fontFamily: "var(--font-futura), Futura, sans-serif",
    fontSize: "clamp(3rem, 9vw, 9.5rem)",
    fontWeight: 900,
    letterSpacing: "-0.035em",
    textTransform: "uppercase",
    color,
    lineHeight: 1,
    willChange: "transform, opacity",
    display: "inline-block",
    textShadow: glow
      ? "0 0 60px rgba(204,161,77,0.55), 0 0 120px rgba(204,161,77,0.25)"
      : "0 4px 40px rgba(0,0,0,0.5)",
  };
}
