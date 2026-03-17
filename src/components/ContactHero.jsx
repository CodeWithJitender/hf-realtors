"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Button from "./Button";
import { usePreloader } from "@/context/PreloaderContext";

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
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const EmailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function ContactHero() {
  const pageRef = useRef(null);
  const { isPreloaderDone } = usePreloader();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen w-full flex flex-col items-center overflow-hidden"
      style={{ backgroundColor: "#E8E3DC" }}
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
              fontFamily: "'Futura-Bold', 'Futura', sans-serif",
              fontSize: "clamp(3.5rem, 13vw, 10rem)",
              color: "#163548",
              opacity: 0,
            }}
          >
            CONTACT US
          </h1>
        </div>

        <p
          className="anim-tagline italic text-center mt-5 leading-snug"
          style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)", color: "#163548", opacity: 0, fontFamily: "var(--font-poppins), Poppins, sans-serif" }}
        >
          Let's build your legacy together.
        </p>

        <p
          className="anim-sub text-center mt-3 font-normal"
          style={{
            fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
            color: "rgba(22,53,72,0.6)",
            maxWidth: "46ch",
            margin: "0.75rem auto 0",
            opacity: 0,
            fontFamily: "var(--font-poppins), Poppins, sans-serif",
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
            style={{ background: "#163548", border: "1px solid rgba(204,161,77,0.2)" }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
              style={{ background: "rgba(204,161,77,0.1)", border: "1px solid rgba(204,161,77,0.3)" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CCA14D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3 className="font-semibold text-xl mb-2 text-[#EDEDED]" style={{ fontFamily: "var(--font-futura), Futura, sans-serif" }}>
              Message Received
            </h3>
            <p className="text-[#EDEDED]/40 text-sm">We'll be in touch with you shortly.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full rounded-[20px] overflow-hidden"
            style={{
              background: "#163548",
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
              <Field label="Phone Number" name="phone" type="tel" placeholder="+1 (000) 000-0000" value={formData.phone} onChange={handleChange} />
              {/* Select */}
              <div className="flex flex-col py-5 border-b border-[#CCA14D]/20 focus-within:border-[#CCA14D] transition-colors duration-300 mb-1">
                <label className="text-[13px] tracking-wide text-[#EDEDED]/55 mb-2 font-medium" style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}>
                  Service Type
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="bg-transparent focus:outline-none appearance-none cursor-pointer"
                  style={{
                    color: formData.service ? "#EDEDED" : "rgba(237,237,237,0.4)",
                    fontSize: "1.05rem",
                    fontFamily: "var(--font-poppins), Poppins, sans-serif",
                  }}
                >
                  <option value="" disabled style={{ background: "#163548" }}>Select a service…</option>
                  {serviceOptions.map((o) => (
                    <option key={o} value={o} style={{ background: "#163548" }}>{o}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message textarea */}
            <div className="flex flex-col py-5 border-b border-[#CCA14D]/20 focus-within:border-[#CCA14D] transition-colors duration-300 mb-8">
              <label className="text-[13px] tracking-wide text-[#EDEDED]/55 mb-2 font-medium" style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}>
                Your Message
              </label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder={`Hello HF Realtors,\n\nI'm interested in discussing...`}
                className="bg-transparent focus:outline-none resize-none font-normal leading-relaxed placeholder:text-[#EDEDED]/25"
                style={{ color: "#EDEDED", fontSize: "1.05rem", caretColor: "#CCA14D", fontFamily: "var(--font-poppins), Poppins, sans-serif" }}
              />
            </div>

            {/* Submit — site's magnetic Button */}
            <Button type="submit" variant="solid">
              Send Message
            </Button>
          </form>
        )}
      </div>

      {/* Contact links */}
      <div className="w-full flex flex-wrap justify-center gap-x-10 gap-y-4 mb-16 px-6">
        {[
          { icon: <PhoneIcon />, label: "+1 (800) 123-4567", href: "tel:+18001234567" },
          { icon: <EmailIcon />, label: "office@hfrealtors.com", href: "mailto:office@hfrealtors.com" },
          { icon: <InstagramIcon />, label: "@hfrealtors", href: "https://instagram.com/hfrealtors" },
          { icon: <LinkedInIcon />, label: "LinkedIn", href: "https://linkedin.com/company/hfrealtors" },
        ].map(({ icon, label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="anim-contact inline-flex items-center gap-2 hover:opacity-100 transition-colors duration-200"
            style={{ color: "rgba(22,53,72,0.65)", fontSize: "clamp(0.8rem, 1.1vw, 0.95rem)", opacity: 0, fontFamily: "var(--font-poppins), 'Poppins', sans-serif", fontWeight: 600 }}
          >
            <span style={{ color: "#CCA14D" }}>{icon}</span>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

function Field({ label, name, type, placeholder, value, onChange }) {
  return (
    <div className="flex flex-col py-5 border-b border-[#CCA14D]/20 focus-within:border-[#CCA14D] transition-colors duration-300 mb-1">
      <label
        htmlFor={name}
        className="text-[13px] tracking-wide text-[#EDEDED]/55 mb-2 font-medium"
        style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}
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
        style={{ color: "#EDEDED", fontSize: "1.05rem", caretColor: "#CCA14D", fontFamily: "var(--font-poppins), Poppins, sans-serif" }}
      />
    </div>
  );
}
