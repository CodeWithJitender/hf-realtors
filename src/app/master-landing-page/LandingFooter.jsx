"use client";

import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useRouter } from 'next/navigation';
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
      className="relative rounded-[4rem] inline-flex items-center justify-center cursor-pointer isolate disabled:opacity-60 bg-transparent min-w-[200px]"
    >
      <svg style={{ visibility: "hidden", position: "absolute" }} width="0" height="0">
        <defs>
          <filter id="goo-footer">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Gold Border overlay */}
      <div className="absolute inset-0 rounded-[4rem] z-[-1] pointer-events-none p-[1.5px] bg-[#E8C96A]"
        style={{
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      >
        <div className="w-full h-full rounded-[calc(4rem-1.5px)] bg-transparent" />
      </div>

      <div
        className="absolute inset-[1.5px] rounded-[calc(4rem-1.5px)] z-0 pointer-events-none overflow-hidden"
        style={{ filter: "url(#goo-footer)" }}
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
        className="relative z-10 flex items-center justify-center gap-2 font-bold text-sm tracking-widest pointer-events-none whitespace-nowrap px-10 py-[14px] transition-colors duration-500"
        style={{ color: isHovered ? "#0A1628" : "#E8C96A" }}
      >
        {loading ? "Submitting…" : "Submit"}
      </span>
    </motion.button>
  );
}

export default function LandingFooter() {
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
  const [error, setError] = useState("");
  const router = useRouter();

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
      setFormData({ name: "", phone: "", email: "", propertyType: "", budget: "", intent: "Buying", requirements: "" });
      router.push('/thank-you');
    } catch (err) {
      console.error(err);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full bg-transparent border border-[#E8C96A]/60 focus:border-[#E8C96A] py-4 px-5 text-[#D9D9D9] placeholder-[#E8C96A]/70 outline-none transition-colors rounded-[14px] font-light text-[14px] shadow-sm";

  return (
    <section className="relative w-full bg-[#161F48] overflow-hidden pt-16 lg:pt-24 pb-8">
      
      {/* 
        SKYLINE & HEADERS BLOCK
      */}
      <div className="relative w-full px-4 lg:px-16 overflow-hidden">
        <div 
          className="absolute inset-x-0 bottom-0 h-[100%] md:h-[130%] w-full pointer-events-none opacity-60 mix-blend-screen"
          style={{
            backgroundImage: "url('/images/master-landing-page/seventh-sec-bottom-bg.png')",
            backgroundSize: "contain",
            backgroundPosition: "bottom center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-20">
          
          {/* UPPER SECTION: Bordered Notification Box */}
          <div className="w-full relative border border-[#E8C96A] rounded-[3rem] py-12 px-6 md:px-16 flex flex-col-reverse md:flex-row items-center bg-[#161F48]/30 backdrop-blur-md shadow-2xl min-h-[240px] md:min-h-[280px]">
            {/* Star Image */}
            <div className="relative md:absolute bottom-0 md:left-12 w-48 h-56 md:w-56 md:h-[280px] flex-shrink-0 flex items-end justify-center pointer-events-none mt-8 md:mt-0 self-center md:self-auto -mb-12 md:mb-0">
               <img 
                 src="/images/master-landing-page/star-balloon.png" 
                 alt="Star Balloon" 
                 className="object-contain h-full drop-shadow-xl"
                 onError={(e) => { e.target.style.display = 'none'; }}
               />
            </div>
            
            {/* Centered Text */}
            <div className="flex-1 text-center flex justify-center md:ml-[180px] relative z-10 w-full mb-0 md:mb-16">
               <p className="text-white text-xl sm:text-2xl md:text-[34px] leading-relaxed font-light italic tracking-wide">
                 Because the right property is not about where <br className="hidden lg:block" />
                 everyone is buying.<br />
                 <span className="opacity-100 font-normal not-italic text-2xl md:text-[36px] block mt-4">It is about where it makes sense for you</span>
               </p>
            </div>
          </div>

          {/* BOTTOM SECTION: Headers and Navigation CTAs */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-8 relative pb-20">
            {/* Left Column: Heading */}
            <div className="md:w-1/2">
              <h2 
                className="font-bold tracking-wide bg-gradient-to-b from-[#E8C96A] to-[#B8913A] text-transparent bg-clip-text inline-block pb-2"
                style={{ 
                  fontFamily: "'Poppins', sans-serif", 
                  fontSize: "clamp(28px, 5vw, 44px)",
                  lineHeight: "1.3",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Access to premium<br />
                developments across<br />
                NCR
              </h2>
            </div>

            {/* Right Column: Text & CTAs */}
            <div className="md:w-1/2 flex flex-col items-start md:items-end w-full pb-4">
              <p className="text-white/90 text-sm md:text-lg italic leading-snug text-left md:text-right md:-mb-10 lg:-mb-12">
                Whether you are buying, investing, or <br className="hidden md:block" />
                leasing, clarity changes the outcome.
              </p>

              {/* Base Navigational CTAs returned to their original position aligned perfectly */}
              <div className="flex flex-col sm:flex-row justify-start md:justify-end items-start sm:items-center w-full gap-4 md:gap-6 mt-12 sm:mt-24 pointer-events-auto">
                <a href="#property-grid" className="w-full sm:w-auto min-w-[200px] py-3.5 px-6 rounded-full border border-[#E8C96A] text-[#D9D9D9] hover:bg-[#E8C96A] hover:text-[#161F48] transition-colors text-sm font-light tracking-wide text-center">
                  Explore Opportunities &rarr;
                </a>
                
                <a href="tel:9999991036" className="w-full sm:w-auto min-w-[200px] py-3.5 px-6 rounded-full border border-[#E8C96A] bg-transparent text-[#D9D9D9] hover:bg-[#E8C96A] hover:text-[#161F48] transition-colors text-sm font-light tracking-wide flex items-center justify-center gap-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  Speak to an Advisor
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* 
        DEDICATED FORM BLOCK
      */}
      <div className="relative w-full bg-[#161F48] z-20 px-4 lg:px-16 overflow-hidden">
         {/* Proper vertical spacing for the section */}
         <form onSubmit={handleSubmit} className="w-full relative flex flex-col py-20 md:py-32 max-w-5xl mx-auto">
            <h2 
              className="text-4xl md:text-[50px] font-semibold text-center bg-gradient-to-b from-[#E8C96A] to-[#B8913A] text-transparent bg-clip-text mb-12 md:mb-20 tracking-wide self-center"
              style={{ 
                fontFamily: "'Poppins', sans-serif",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Connect with us
            </h2>
            <div className="flex flex-col md:flex-row gap-6 lg:gap-10 w-full mb-6 relative">
              
              {/* Form Left Column */}
              <div className="flex-1 flex flex-col gap-6">
                <input 
                  type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange}
                  className={inputStyle} required
                />
                <input 
                  type="tel" name="phone" placeholder="Phone No." value={formData.phone} onChange={handleChange}
                  className={inputStyle} required
                />
                <div className="relative">
                  {/* Select strictly bound to dynamic inline property coloring */}
                  <select 
                    name="budget" 
                    value={formData.budget} 
                    onChange={handleChange} 
                    className={`${inputStyle} appearance-none`}
                    style={{ color: !formData.budget ? 'rgba(232, 201, 106, 0.7)' : '#D9D9D9' }}
                  >
                    <option value="" disabled>Budget</option>
                    <option value="5-8 Lac" style={{color: '#D9D9D9', background: '#161F48'}}>5-8 Lac</option>
                    <option value="8-10 Lac" style={{color: '#D9D9D9', background: '#161F48'}}>8-10 Lac</option>
                    <option value="10 Lac+" style={{color: '#D9D9D9', background: '#161F48'}}>10+ Lac</option>
                  </select>
                  <div className="absolute right-5 top-[50%] -translate-y-1/2 pointer-events-none text-[#E8C96A]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
                
                {/* Radio Buttons (Buying / Leasing) */}
                <div className="flex items-center gap-12 py-3 pl-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative w-5 h-5 rounded-full border-[1.5px] border-[#E8C96A]/80 flex items-center justify-center bg-transparent group-hover:border-[#E8C96A] transition-colors">
                      {formData.intent === "Buying" && (
                        <div className="w-[10px] h-[10px] bg-[#D9D9D9] rounded-full transition-transform" />
                      )}
                    </div>
                    <input type="radio" name="intent" value="Buying" onChange={handleChange} className="hidden" />
                    <span className="text-[#E8C96A] text-[15px] font-medium tracking-wide">Buying</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative w-5 h-5 rounded-full border-[1.5px] border-[#E8C96A]/80 flex items-center justify-center bg-transparent group-hover:border-[#E8C96A] transition-colors">
                      {formData.intent === "Leasing" && (
                        <div className="w-[10px] h-[10px] bg-[#D9D9D9] rounded-full transition-transform" />
                      )}
                    </div>
                    <input type="radio" name="intent" value="Leasing" onChange={handleChange} className="hidden" />
                    <span className="text-[#E8C96A] text-[15px] font-medium tracking-wide">Leasing</span>
                  </label>
                </div>
              </div>

              {/* Form Right Column */}
              <div className="flex-1 flex flex-col gap-6">
                <input 
                  type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
                  className={inputStyle} required
                />
                <div className="relative">
                  {/* Select strictly bound to dynamic inline property coloring */}
                  <select 
                    name="propertyType" 
                    value={formData.propertyType} 
                    onChange={handleChange} 
                    className={`${inputStyle} appearance-none`}
                    style={{ color: !formData.propertyType ? 'rgba(232, 201, 106, 0.7)' : '#D9D9D9' }}
                  >
                    <option value="" disabled>Property type</option>
                    <option value="Residential" style={{color: '#D9D9D9', background: '#161F48'}}>Residential</option>
                    <option value="Commercial" style={{color: '#D9D9D9', background: '#161F48'}}>Commercial</option>
                    <option value="Retail" style={{color: '#D9D9D9', background: '#161F48'}}>Retail</option>
                  </select>
                  <div className="absolute right-5 top-[50%] -translate-y-1/2 pointer-events-none text-[#E8C96A]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
                <textarea 
                  name="requirements" 
                  placeholder="Fill in your requirements" 
                  value={formData.requirements} 
                  onChange={handleChange}
                  className={`${inputStyle} flex-1 resize-none h-full min-h-[140px]`}
                />
              </div>
            </div>
            
            {error && <span className="text-red-400 text-sm font-light mt-2 mb-4 block text-center">{error}</span>}

            {/* Extra Submit Button generated matching identical animations to Hero form */}
            <div className="flex justify-center w-full relative z-[100] mt-4 md:mt-8">
               <SubmitButton loading={loading} />
            </div>
              
          </form>
      </div>

    </section>
  );
}
