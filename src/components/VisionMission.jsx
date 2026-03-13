"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Concentric-circles orbit SVG for Vision ─── */
function VisionSVG() {
  return (
    <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="vm-gold-v" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#CCA14D" />
          <stop offset="100%" stopColor="#EDEDED" />
        </linearGradient>
      </defs>

      {/* Outer rotating ring — animated via GSAP in parent */}
      <circle id="v-ring-outer" cx="90" cy="90" r="76" stroke="url(#vm-gold-v)" strokeWidth="1" strokeDasharray="8 6" opacity="0.5" />
      {/* Middle ring */}
      <circle id="v-ring-mid" cx="90" cy="90" r="54" stroke="url(#vm-gold-v)" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.7" />
      {/* Inner ring */}
      <circle id="v-ring-inner" cx="90" cy="90" r="34" stroke="#CCA14D" strokeWidth="1.5" opacity="0.9" />
      {/* Crosshairs */}
      <line x1="90" y1="8"  x2="90" y2="28"  stroke="#CCA14D" strokeWidth="1" opacity="0.5" />
      <line x1="90" y1="152" x2="90" y2="172" stroke="#CCA14D" strokeWidth="1" opacity="0.5" />
      <line x1="8"  y1="90" x2="28"  y2="90"  stroke="#CCA14D" strokeWidth="1" opacity="0.5" />
      <line x1="152" y1="90" x2="172" y2="90"  stroke="#CCA14D" strokeWidth="1" opacity="0.5" />
      {/* Orbiting planet dot */}
      <circle id="v-planet" cx="90" cy="16" r="6" fill="#CCA14D" />
      {/* Center dot */}
      <circle cx="90" cy="90" r="5" fill="#EDEDED" />
    </svg>
  );
}

/* ─── Ascending bars + trend arrow SVG for Mission ─── */
function MissionSVG() {
  return (
    <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="vm-gold-m" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#163548" />
          <stop offset="50%" stopColor="#CCA14D" />
          <stop offset="100%" stopColor="#EDEDED" />
        </linearGradient>
      </defs>

      {/* Base line */}
      <line x1="18" y1="152" x2="162" y2="152" stroke="#CCA14D" strokeWidth="1" opacity="0.4" />

      {/* Bar 1 */}
      <rect id="m-bar1" x="22"  y="122" width="20" height="30" rx="2" stroke="#CCA14D" strokeWidth="1.5" fill="rgba(204,161,77,0.06)" />
      {/* Bar 2 */}
      <rect id="m-bar2" x="52"  y="98"  width="20" height="54" rx="2" stroke="url(#vm-gold-m)" strokeWidth="1.5" fill="rgba(204,161,77,0.08)" />
      {/* Bar 3 */}
      <rect id="m-bar3" x="82"  y="70"  width="20" height="82" rx="2" stroke="url(#vm-gold-m)" strokeWidth="1.5" fill="rgba(204,161,77,0.1)" />
      {/* Bar 4 — tallest */}
      <rect id="m-bar4" x="112" y="34"  width="20" height="118" rx="2" stroke="#EDEDED" strokeWidth="2" fill="rgba(204,161,77,0.12)" />

      {/* Trend line */}
      <polyline id="m-trend" points="32,122 62,98 92,70 122,34" stroke="#CCA14D" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Arrow tip */}
      <polyline points="108,28 122,34 116,48" stroke="#CCA14D" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Floating dots on trend */}
      <circle id="m-dot1" cx="32"  cy="122" r="4" fill="#CCA14D" opacity="0.7" />
      <circle id="m-dot2" cx="62"  cy="98"  r="4" fill="#CCA14D" opacity="0.8" />
      <circle id="m-dot3" cx="92"  cy="70"  r="4" fill="#CCA14D" opacity="0.9" />
      <circle id="m-dot4" cx="122" cy="34"  r="5" fill="#EDEDED" />
    </svg>
  );
}

/* ─── Main Section ─── */
export default function VisionMission() {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);
  const card1Ref    = useRef(null);
  const card2Ref    = useRef(null);
  const dividerRef  = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* ── 1. Heading: slides down from above on scroll ── */
      gsap.fromTo(headingRef.current,
        { y: -60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none none" },
        }
      );

      /* ── 2. Divider line scales in ── */
      gsap.fromTo(dividerRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1, opacity: 1, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 70%", toggleActions: "play none none none" },
        }
      );

      /* ── 3. Cards slide up with stagger ── */
      gsap.fromTo([card1Ref.current, card2Ref.current],
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.0, ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: { trigger: section, start: "top 65%", toggleActions: "play none none none" },
        }
      );

      /* ── 4. Vision: outer dashed ring rotates continuously — PAUSED initially ── */
      const rotOuter = gsap.to("#v-ring-outer", {
        rotation: 360,
        transformOrigin: "90px 90px",
        duration: 18,
        ease: "none",
        repeat: -1,
        paused: true,
      });

      /* ── 5. Vision: middle ring counter-rotates — PAUSED initially ── */
      const rotMid = gsap.to("#v-ring-mid", {
        rotation: -360,
        transformOrigin: "90px 90px",
        duration: 12,
        ease: "none",
        repeat: -1,
        paused: true,
      });

      /* ── 6. Vision: planet orbits using x/y trig — PAUSED initially ── */
      const orbitRadius = 74;
      const center = { x: 90, y: 90 };
      let orbitProgress = 0;
      const orbitTween = gsap.to({ t: 0 }, {
        t: 1,
        duration: 8,
        ease: "none",
        repeat: -1,
        paused: true,
        onUpdate: function () {
          orbitProgress = this.targets()[0].t;
          const angle = orbitProgress * Math.PI * 2 - Math.PI / 2;
          const x = center.x + orbitRadius * Math.cos(angle);
          const y = center.y + orbitRadius * Math.sin(angle);
          const el = document.querySelector("#v-planet");
          if (el) {
            el.setAttribute("cx", x.toString());
            el.setAttribute("cy", y.toString());
          }
        },
      });

      /* ── 7. Mission: bars breathe — PAUSED initially ── */
      const barTweens = ["#m-bar1", "#m-bar2", "#m-bar3", "#m-bar4"].map((id, i) =>
        gsap.to(id, {
          y: -6,
          duration: 1.4 + i * 0.3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.2,
          paused: true,
        })
      );

      /* ── 8. Mission: trend dots pulse — PAUSED initially ── */
      const dotTweens = ["#m-dot1", "#m-dot2", "#m-dot3", "#m-dot4"].map((id, i) =>
        gsap.to(id, {
          scale: 1.6,
          opacity: 1,
          transformOrigin: "center center",
          duration: 0.9,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.25,
          paused: true,
        })
      );

      /* ── 9. Single ScrollTrigger to play/pause all loops based on visibility ── */
      ScrollTrigger.create({
        trigger: section,
        start: "top 90%",
        end: "bottom 10%",
        onEnter: () => {
          rotOuter.play();
          rotMid.play();
          orbitTween.play();
          barTweens.forEach(t => t.play());
          dotTweens.forEach(t => t.play());
        },
        onLeave: () => {
          rotOuter.pause();
          rotMid.pause();
          orbitTween.pause();
          barTweens.forEach(t => t.pause());
          dotTweens.forEach(t => t.pause());
        },
        onEnterBack: () => {
          rotOuter.play();
          rotMid.play();
          orbitTween.play();
          barTweens.forEach(t => t.play());
          dotTweens.forEach(t => t.play());
        },
        onLeaveBack: () => {
          rotOuter.pause();
          rotMid.pause();
          orbitTween.pause();
          barTweens.forEach(t => t.pause());
          dotTweens.forEach(t => t.pause());
        },
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        width: "100vw",
        marginLeft: "calc((100% - 100vw) / 2)",
        background: "linear-gradient(160deg, #0D1E2B 0%, #0A0A0A 50%, #0D1E2B 100%)",
        padding: "clamp(5rem,10vh,9rem) clamp(1.5rem,6vw,7rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow — top left */}
      <div style={{
        position: "absolute", top: "-10%", left: "-5%",
        width: "45vw", height: "45vw", maxWidth: 700,
        background: "radial-gradient(circle, rgba(204,161,77,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Ambient glow — bottom right */}
      <div style={{
        position: "absolute", bottom: "-10%", right: "-5%",
        width: "40vw", height: "40vw", maxWidth: 600,
        background: "radial-gradient(circle, rgba(22,53,72,0.5) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── HEADING ── */}
      <div ref={headingRef} className="text-center mb-[clamp(3.5rem,6vw,6rem)] relative z-10">
        <p style={{
          fontFamily: "var(--font-futura), Futura, sans-serif",
          fontSize: "clamp(0.65rem, 1vw, 0.78rem)",
          letterSpacing: "0.38em",
          textTransform: "uppercase",
          color: "#CCA14D",
          fontWeight: 500,
          marginBottom: "1rem",
        }}>
          HF Realtors
        </p>
        <h2 style={{
          fontFamily: "var(--font-futura), Futura, sans-serif",
          fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
          fontWeight: 700,
          color: "#EDEDED",
          lineHeight: 1.05,
          textTransform: "uppercase",
          letterSpacing: "-0.02em",
        }}>
          Our Vision<br />
          <span style={{ color: "#CCA14D" }}>&amp; Mission</span>
        </h2>
      </div>

      {/* ── GOLD DIVIDER ── */}
      <div ref={dividerRef} style={{
        height: "1px",
        background: "linear-gradient(to right, transparent, #CCA14D, transparent)",
        marginBottom: "clamp(3rem,5vw,4.5rem)",
        transformOrigin: "center",
      }} />

      {/* ── CARDS ── */}
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "clamp(1rem,2.5vw,2rem)",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
        className="flex-col md:flex-row"
      >
        {/* VISION CARD */}
        <div
          ref={card1Ref}
          style={{
            flex: 1,
            background: "linear-gradient(145deg, rgba(22,53,72,0.6) 0%, rgba(13,30,43,0.8) 100%)",
            border: "1px solid rgba(204,161,77,0.22)",
            borderRadius: "24px",
            padding: "clamp(2rem,4vw,3.5rem)",
            backdropFilter: "blur(12px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Corner accent */}
          <div style={{
            position: "absolute", top: 0, right: 0,
            width: 80, height: 80,
            background: "radial-gradient(circle at top right, rgba(204,161,77,0.15), transparent 70%)",
          }} />

          <p style={{
            fontFamily: "var(--font-futura), Futura, sans-serif",
            fontSize: "clamp(0.7rem, 1vw, 0.8rem)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#CCA14D",
            fontWeight: 600,
            marginBottom: "clamp(1.5rem,3vw,2.5rem)",
          }}>
            01 — Vision
          </p>

          {/* SVG container */}
          <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: "clamp(2rem,3.5vw,3rem)",
          }}>
            <div style={{ width: "clamp(130px,16vw,190px)", height: "clamp(130px,16vw,190px)" }}>
              <VisionSVG />
            </div>
          </div>

          <div style={{ height: "1px", background: "rgba(204,161,77,0.15)", marginBottom: "clamp(1.5rem,3vw,2rem)" }} />

          <h3 style={{
            fontFamily: "var(--font-futura), Futura, sans-serif",
            fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
            fontWeight: 600,
            color: "#EDEDED",
            marginBottom: "0.8rem",
          }}>
            Strategic Foresight
          </h3>
          <p style={{
            fontFamily: "var(--font-futura), Futura, sans-serif",
            fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
            color: "rgba(237,237,237,0.65)",
            lineHeight: 1.78,
            fontWeight: 400,
          }}>
            To redefine the real estate experience through transparency, strategic insight, and long-term value creation.
          </p>
        </div>

        {/* MISSION CARD */}
        <div
          ref={card2Ref}
          style={{
            flex: 1,
            background: "linear-gradient(145deg, rgba(10,10,10,0.9) 0%, rgba(22,53,72,0.4) 100%)",
            border: "1px solid rgba(204,161,77,0.14)",
            borderRadius: "24px",
            padding: "clamp(2rem,4vw,3.5rem)",
            backdropFilter: "blur(12px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Corner accent */}
          <div style={{
            position: "absolute", bottom: 0, left: 0,
            width: 80, height: 80,
            background: "radial-gradient(circle at bottom left, rgba(22,53,72,0.5), transparent 70%)",
          }} />

          <p style={{
            fontFamily: "var(--font-futura), Futura, sans-serif",
            fontSize: "clamp(0.7rem, 1vw, 0.8rem)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#CCA14D",
            fontWeight: 600,
            marginBottom: "clamp(1.5rem,3vw,2.5rem)",
          }}>
            02 — Mission
          </p>

          {/* SVG container */}
          <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: "clamp(2rem,3.5vw,3rem)",
          }}>
            <div style={{ width: "clamp(130px,16vw,190px)", height: "clamp(130px,16vw,190px)" }}>
              <MissionSVG />
            </div>
          </div>

          <div style={{ height: "1px", background: "rgba(204,161,77,0.15)", marginBottom: "clamp(1.5rem,3vw,2rem)" }} />

          <h3 style={{
            fontFamily: "var(--font-futura), Futura, sans-serif",
            fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
            fontWeight: 600,
            color: "#EDEDED",
            marginBottom: "0.8rem",
          }}>
            Guided Growth
          </h3>
          <p style={{
            fontFamily: "var(--font-futura), Futura, sans-serif",
            fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
            color: "rgba(237,237,237,0.65)",
            lineHeight: 1.78,
            fontWeight: 400,
          }}>
            To help individuals and investors navigate the property market with confidence, clarity, and expert guidance.
          </p>
        </div>
      </div>
    </section>
  );
}
