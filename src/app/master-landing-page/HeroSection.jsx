"use client";

import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Image from 'next/image';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const EMAILJS_SERVICE_ID = "service_5ukbpwr";
const EMAILJS_TEMPLATE_ID = "template_zvqhzrw";
const EMAILJS_PUBLIC_KEY = "QpkBmnT4LJ4PGyWTX";

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
      className="relative rounded-[4rem] inline-flex items-center justify-center cursor-pointer isolate disabled:opacity-60 bg-[#182046]"
    >
      <svg style={{ visibility: "hidden", position: "absolute" }} width="0" height="0">
        <defs>
          <filter id="goo-master">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Gold Border overlay */}
      <div className="absolute inset-0 rounded-[4rem] z-[-1] pointer-events-none p-[1px] bg-[#E8C96A]"
        style={{
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      >
        <div className="w-full h-full rounded-[calc(4rem-1px)] bg-transparent" />
      </div>

      <div
        className="absolute inset-[1px] rounded-[calc(4rem-1px)] z-0 pointer-events-none overflow-hidden"
        style={{ filter: "url(#goo-master)" }}
      >
        <motion.div
           initial={{ scale: 0, opacity: 0 }}
           animate={{ scale: isHovered ? 35 : 0, opacity: isHovered ? 1 : 0 }}
           transition={{ type: "spring", stiffness: 150, damping: 20 }}
           style={{ left: fillCoords.x, top: fillCoords.y, background: "#E8C96A", width: "30px", height: "30px" }}
           className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[1]"
        />
      </div>

      <span
        className="relative z-10 flex items-center justify-center gap-2 font-bold text-sm tracking-widest pointer-events-none whitespace-nowrap px-10 py-3 transition-colors duration-500"
        style={{ color: isHovered ? "#0A1628" : "#E8C96A" }}
      >
        {loading ? "Submitting…" : "Submit"}
      </span>
    </motion.button>
  );
}

export default function HeroSection() {
  const [formData, setFormData] = useState({ 
    name: "", 
    phone: "", 
    email: "", 
    propertyType: "", 
    budget: "", 
    intent: "Buying",
    requirements: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.name || !formData.phone || !formData.email) {
      setError("Please fill out Name, Phone, and Email.");
      setLoading(false);
      return;
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          property_type: formData.propertyType,
          budget: formData.budget,
          intent: formData.intent,
          requirements: formData.requirements
        },
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
      setFormData({ name: "", phone: "", email: "", propertyType: "", budget: "", intent: "Buying", requirements: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full bg-[#182046] border border-[#E8C96A]/60 focus:border-[#E8C96A] py-4 px-5 text-[#E8C96A] placeholder-[#E8C96A]/60 outline-none transition-colors rounded-xl font-light text-sm shadow-md";

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-16 px-6 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/master-landing-page/hero.jpg"
          alt="Gurgaon Skyline"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center pl-0">
        {/* Left Content */}
        <div className="flex flex-col gap-10 w-full lg:w-1/2 text-center lg:text-left">
          <h1 
            className="font-semibold leading-tight bg-gradient-to-b from-[#E8C96A] to-[#B8913A] text-transparent bg-clip-text"
            style={{ 
              fontFamily: "'Poppins', sans-serif", 
              fontSize: "clamp(32px, 5vw, 40px)",
              maxWidth: "616px",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Your personal concierge to extraordinary residential and commercial properties in Delhi NCR
          </h1>
          
          <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
            <a href="#property-grid" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#182046] text-[#D9D9D9] border border-[#E8C96A] hover:bg-[#E8C96A] hover:text-[#0A1628] transition-colors text-sm font-light tracking-wide gap-2">
              Explore Opportunities &rarr;
            </a>
            <a href="tel:9999991036" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#182046] text-[#D9D9D9] border border-[#E8C96A] hover:bg-[#E8C96A] hover:text-[#0A1628] transition-colors text-sm font-light tracking-wide gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Speak to an Advisor
            </a>
          </div>
        </div>

        {/* Right Form */}
        <div className="w-full lg:w-1/2 max-w-[500px] ml-auto">
          {submitted ? (
             <div className="bg-[#182046] border border-[#E8C96A] rounded-2xl p-10 text-center shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-[#E8C96A]/20 flex items-center justify-center mx-auto mb-4 text-[#E8C96A]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h4 className="text-2xl font-bold text-[#E8C96A] mb-2">Request Received</h4>
                <p className="text-[#D9D9D9] text-sm">Our experts will contact you shortly.</p>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[14px]">
              <input 
                type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange}
                className={inputStyle} required
              />
              <input 
                type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
                className={inputStyle} required
              />
              <input 
                type="tel" name="phone" placeholder="Phone No." value={formData.phone} onChange={handleChange}
                className={inputStyle} required
              />
              
              <div className="relative">
                <select name="propertyType" value={formData.propertyType} onChange={handleChange} className={`${inputStyle} appearance-none`}>
                  <option value="" disabled className="text-[#E8C96A]/60">Property type</option>
                  <option value="Residential" className="bg-[#161F48]">Residential</option>
                  <option value="Commercial" className="bg-[#161F48]">Commercial</option>
                  <option value="Retail" className="bg-[#161F48]">Retail</option>
                </select>
                <div className="absolute right-5 top-[50%] -translate-y-1/2 pointer-events-none text-[#E8C96A]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>

              <div className="relative">
                <select name="budget" value={formData.budget} onChange={handleChange} className={`${inputStyle} appearance-none`}>
                  <option value="" disabled className="text-[#E8C96A]/60">Estimated Budget</option>
                  <option value="5-8 Lac" className="bg-[#161F48]">5-8 Lac</option>
                  <option value="8-10 Lac" className="bg-[#161F48]">8-10 Lac</option>
                  <option value="10 Lac+" className="bg-[#161F48]">10+ Lac</option>
                </select>
                <div className="absolute right-5 top-[50%] -translate-y-1/2 pointer-events-none text-[#E8C96A]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>

              {/* Buying / Leasing Radio Buttons */}
              <div className="flex items-center gap-10 py-1 pl-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative w-[22px] h-[22px] rounded-full border-[1.5px] border-[#E8C96A] flex items-center justify-center bg-transparent">
                    {formData.intent === "Buying" && (
                      <div className="w-[12px] h-[12px] bg-[#E8C96A] rounded-full transition-transform" />
                    )}
                  </div>
                  <input type="radio" name="intent" value="Buying" onChange={handleChange} className="hidden" />
                  <span className="text-[#E8C96A] font-medium text-sm">Buying</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative w-[22px] h-[22px] rounded-full border-[1.5px] border-[#E8C96A] flex items-center justify-center bg-transparent">
                    {formData.intent === "Leasing" && (
                      <div className="w-[12px] h-[12px] bg-[#E8C96A] rounded-full transition-transform" />
                    )}
                  </div>
                  <input type="radio" name="intent" value="Leasing" onChange={handleChange} className="hidden" />
                  <span className="text-[#E8C96A] font-medium text-sm">Leasing</span>
                </label>
              </div>

              <textarea 
                name="requirements" 
                rows="4" 
                placeholder="Fill in your requirements" 
                value={formData.requirements} 
                onChange={handleChange}
                className={`${inputStyle} resize-none mt-2`}
              />

              {error && <span className="text-red-400 text-sm text-center font-light">{error}</span>}

              <div className="flex justify-center mt-4">
                 <SubmitButton loading={loading} />
              </div>

            </form>
          )}
        </div>
      </div>
    </section>
  );
}
