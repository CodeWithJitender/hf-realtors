"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { usePreloader } from "@/context/PreloaderContext";

// ── Magnetic gooey submit button (mirrors Button.jsx) ─────────────────
function SubmitButton({ loading }) {
  const btnRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { damping: 20, stiffness: 150, mass: 0.1 });
  const smoothY = useSpring(y, { damping: 20, stiffness: 150, mass: 0.1 });
  const [isHovered, setIsHovered] = useState(false);
  const [fillCoords, setFillCoords] = useState({ x: "50%", y: "50%" });

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const rawX = e.clientX - (left + width / 2);
    const rawY = e.clientY - (top + height / 2);
    const dist = Math.sqrt(rawX * rawX + rawY * rawY);
    const r = 60;
    x.set(dist > r ? (rawX / dist) * r / 2 : rawX / 2);
    y.set(dist > r ? (rawY / dist) * r / 2 : rawY / 2);
    if (!isHovered) {
      setFillCoords({ x: `${((e.clientX - left) / width) * 100}%`, y: `${((e.clientY - top) / height) * 100}%` });
    }
  };

  return (
    <motion.button
      ref={btnRef}
      type="submit"
      disabled={loading}
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => { setIsHovered(true); handleMouseMove(e); }}
      onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); }}
      style={{ x: smoothX, y: smoothY }}
      animate={{ scale: isHovered ? 1.03 : 1 }}
      whileTap={{ scale: 0.97 }}
      className="relative rounded-[4rem] inline-flex items-center justify-center cursor-pointer isolate disabled:opacity-60"
    >
      {/* SVG gooey filter */}
      <svg style={{ visibility: "hidden", position: "absolute" }} width="0" height="0">
        <defs>
          <filter id="goo-submit">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Gold gradient border */}
      <div
        className="absolute inset-0 rounded-[4rem] z-[-1] pointer-events-none bg-[linear-gradient(to_right,#E8C96A,#E8C96A)] p-[2px]"
        style={{
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      >
        <div className="w-full h-full rounded-[calc(4rem-2px)] bg-transparent" />
      </div>

      {/* Gooey liquid fill */}
      <div
        className="absolute inset-[2px] rounded-[calc(4rem-2px)] z-0 pointer-events-none overflow-hidden"
        style={{ filter: "url(#goo-submit)" }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isHovered ? 35 : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          style={{ left: fillCoords.x, top: fillCoords.y, background: "#EDEDED", width: "30px", height: "30px" }}
          className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[1]"
        />
      </div>

      {/* Label */}
      <span
        className="relative z-10 flex items-center justify-center gap-2 font-bold text-[13px] md:text-sm tracking-widest pointer-events-none whitespace-nowrap uppercase px-8 py-4 transition-colors duration-500"
        style={{ color: isHovered ? "#0A1628" : "#EDEDED", fontFamily: "'Futura', var(--font-inter), sans-serif", fontWeight: 700 }}
      >
        {loading ? "Sending…" : "Send Message"}
      </span>
    </motion.button>
  );
}

const EMAILJS_SERVICE_ID = "service_5ukbpwr";
const EMAILJS_TEMPLATE_ID = "template_94wuhub";
const EMAILJS_PUBLIC_KEY = "QpkBmnT4LJ4PGyWTX";

const serviceOptions = [
  "Property Acquisition",
  "Property Disposition",
  "Leasing & Rental Advisory",
  "Real Estate Portfolio Management",
  "Wealth & Investment Advisory",
  "Concierge & Lifestyle Services",
];

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);
const EmailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="2,4 12,13 22,4" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ContactHero() {
  const pageRef = useRef(null);
  const router = useRouter();
  const { isPreloaderDone } = usePreloader();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Init EmailJS once
  useEffect(() => { emailjs.init(EMAILJS_PUBLIC_KEY); }, []);

  useEffect(() => {
    if (!pageRef.current || !isPreloaderDone) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".anim-heading", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, duration: 1.1, stagger: 0.04 })
        .fromTo(".anim-tagline", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
        .fromTo(".anim-sub", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
        .fromTo(".anim-card", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .fromTo(".anim-contact", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, "-=0.5");
    }, pageRef);
    return () => ctx.revert();
  }, [isPreloaderDone]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.service || !formData.message.trim()) {
      setError("Please fill out all fields.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,       // matches {{name}} in From Name field
          from_name: formData.name,       // matches {{from_name}} in template body
          from_email: formData.email,      // matches {{from_email}}
          phone: formData.phone,      // matches {{phone}}
          service: formData.service,    // matches {{service}}
          message: formData.message,    // matches {{message}}
        },
        EMAILJS_PUBLIC_KEY                 // pass key explicitly for reliability
      );
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      router.push("/thank-you");
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen w-full flex flex-col items-center overflow-hidden"
      style={{ backgroundColor: "#0A1628" }}
    >
      {/* Subtle noise grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />

      {/* Massive heading */}
      <div className="w-full text-center pt-[clamp(7rem,15vh,12rem)] pb-[clamp(1.5rem,3vh,3rem)] px-6 overflow-hidden">
        <div className="overflow-hidden">
          <h1
            className="anim-heading font-bold uppercase leading-[0.88] tracking-tight"
            style={{
              fontFamily: "'Helvetica Neue', 'Helvetica', Arial, sans-serif",
              fontSize: "clamp(3.5rem, 13vw, 10rem)",
              color: "#E8C96A",
              opacity: 0,
            }}
          >
            CONTACT US
          </h1>
        </div>

        <p
          className="anim-tagline italic text-center mt-5 leading-snug"
          style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)", color: "#C5D6EE", opacity: 0, fontFamily: "'Helvetica Neue', 'Helvetica', Arial, sans-serif" }}
        >
          Let's build your legacy together.
        </p>

        <p
          className="anim-sub text-center mt-3 font-normal"
          style={{
            fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
            color: "#7A8FAB",
            maxWidth: "46ch",
            margin: "0.75rem auto 0",
            opacity: 0,
            fontFamily: "'Helvetica Neue', 'Helvetica', Arial, sans-serif",
          }}
        >
          Whether you're acquiring a property, managing a portfolio, or planning generational wealth — we'd love to hear from you.
        </p>
      </div>

      {/* SINGLE form card */}
      <div
        className="anim-card w-full px-[clamp(1.5rem,5vw,5rem)] pb-[clamp(3rem,6vh,6rem)]"
        style={{ maxWidth: "1060px", opacity: 0 }}
      >
        {submitted ? (
          <div
            className="w-full rounded-[20px] flex flex-col items-center justify-center text-center py-20"
            style={{ background: "#0A1628", border: "1px solid rgba(204,161,77,0.2)" }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
              style={{ background: "rgba(204,161,77,0.1)", border: "1px solid rgba(204,161,77,0.3)" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8C96A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-semibold text-xl mb-2 text-[#EDEDED]" style={{ fontFamily: "var(--font-futura), 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
              Message Received
            </h3>
            <p className="text-[#EDEDED]/40 text-sm">We'll be in touch with you shortly.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full rounded-[20px] overflow-hidden"
            style={{
              background: "#0A1628",
              border: "1px solid rgba(204,161,77,0.18)",
              boxShadow: "0 24px 60px rgba(22,53,72,0.18)",
              padding: "clamp(2.5rem,5vw,4.5rem)",
            }}
            noValidate
          >
            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <Field label="Full Name *" name="name" type="text" placeholder="John Anderson" value={formData.name} onChange={handleChange} />
              <Field label="Email Address *" name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} />
            </div>

            {/* Row 2: Phone + Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <Field label="Phone Number *" name="phone" type="tel" placeholder="+1 (000) 000-0000" value={formData.phone} onChange={handleChange} />
              {/* Select */}
              <div className="flex flex-col py-5 border-b border-[#E8C96A]/20 focus-within:border-[#E8C96A] transition-colors duration-300 mb-1">
                <label className="text-[13px] tracking-wide text-[#EDEDED]/55 mb-2 font-medium" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                  Service Type *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="bg-transparent focus:outline-none appearance-none cursor-pointer"
                  style={{
                    color: formData.service ? "#EDEDED" : "rgba(237,237,237,0.4)",
                    fontSize: "1.05rem",
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                  }}
                >
                  <option value="" disabled style={{ background: "#0A1628" }}>Select a service…</option>
                  {serviceOptions.map((o) => (
                    <option key={o} value={o} style={{ background: "#0A1628" }}>{o}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message textarea */}
            <div className="flex flex-col py-5 border-b border-[#E8C96A]/20 focus-within:border-[#E8C96A] transition-colors duration-300 mb-8">
              <label className="text-[13px] tracking-wide text-[#EDEDED]/55 mb-2 font-medium" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                Please Describe The Type Of Service You Are Interested In *
              </label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder={`E.g., I am looking for guidance regarding...`}
                className="bg-transparent focus:outline-none resize-none font-normal leading-relaxed placeholder:text-[#EDEDED]/25"
                style={{ color: "#EDEDED", fontSize: "1.05rem", caretColor: "#E8C96A", fontFamily: "var(--font-inter), Inter, sans-serif" }}
              />
            </div>

            {/* Error message */}
            {/* error message already above, add Turnstile here */}
            {error && (
              <p className="mb-4 text-sm text-red-400" style={{ fontFamily: "var(--font-inter), 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                {error}
              </p>
            )}

            {/* Submit button — real <button> so type="submit" works */}
            <SubmitButton loading={loading} />
          </form>
        )}
      </div>

      {/* Contact links */}
      <div className="w-full flex flex-wrap justify-center gap-x-10 gap-y-4 mb-16 px-6">
        {[
          { icon: <PhoneIcon />, label: "+91 99999 91036", href: "tel:+919999991036" },
          { icon: <EmailIcon />, label: "ankit@hfrealtors.com", href: "mailto:ankit@hfrealtors.com" },
          { icon: <InstagramIcon />, label: "@hfrealtors", href: "https://instagram.com/hfrealtors" },
          { icon: <LinkedInIcon />, label: "LinkedIn", href: "https://linkedin.com/company/hfrealtors" },
        ].map(({ icon, label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="anim-contact inline-flex items-center gap-2 hover:opacity-100 transition-colors duration-200"
            style={{ color: "#fff", fontSize: "clamp(0.8rem, 1.1vw, 0.95rem)", opacity: 0, fontFamily: "var(--font-inter), 'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 600 }}
          >
            <span style={{ color: "#E8C96A" }}>{icon}</span>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

function Field({ label, name, type, placeholder, value, onChange }) {
  return (
    <div className="flex flex-col py-5 border-b border-[#E8C96A]/20 focus-within:border-[#E8C96A] transition-colors duration-300 mb-1">
      <label
        htmlFor={name}
        className="text-[13px] tracking-wide text-[#EDEDED]/55 mb-2 font-medium"
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-transparent focus:outline-none font-normal placeholder:text-[#EDEDED]/25"
        style={{ color: "#EDEDED", fontSize: "1.05rem", caretColor: "#E8C96A", fontFamily: "var(--font-inter), Inter, sans-serif" }}
      />
    </div>
  );
}
