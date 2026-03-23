"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Button from "./Button";

const locations = [
  {
    id: "dubai",
    city: "Sector 57",
    title: "Sector 57 Office B-73, Block B Noida",
    // description: "THE OFFICE IN OPUS TOWER SYMBOLIZES NOT ONLY OUR SUCCESS, BUT ALSO OUR HIGH STATUS IN THE MARKET. IT IS A PLACE WHERE WORLD-CLASS DEALS ARE CREATED AND EVERY ELEMENT SURROUNDS OUR CLIENTS WITH LUXURY AND COMFORT.",
    bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop",
    mapLink: "https://maps.app.goo.gl/xKD2DmjAMfifYppC7",
    images: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "bangkok",
    city: "Sector 58",
    title: "Sector 58 Office 108, Block A Noida",
    // description: "AN ARCHITECTURAL MASTERPIECE IN THE HEART OF BANGKOK, DESIGNED TO REFLECT PRESTIGE AND INNOVATION. EXPERIENCE OUR PREMIUM REAL ESTATE SERVICES IN A SETTING THAT REDEFINES CORPORATE LUXURY.",
    bgImage: "https://images.unsplash.com/photo-1565008576549-57569a49371d?q=80&w=2940&auto=format&fit=crop",
    mapLink: "https://maps.app.goo.gl/JbwBNekmHtPV5mwq5",
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1497215840924-11885fcedae8?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "london",
    city: "Sector 59",
    title: "Sector 59 Office B-8, B Block Noida",
    // description: "AN ICONIC PRESENCE IN THE HEART OF LONDON. OUR OFFICE IN THE SHARD OFFERS UNPARALLELED VIEWS AND WORLD-CLASS AMENITIES, REFLECTING OUR COMMITMENT TO EXCELLENCE AND GLOBAL REACH.",
    bgImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2940&auto=format&fit=crop",
    mapLink: "https://maps.app.goo.gl/f6NKG1CFWtuWmjit5",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
    ]
  }
];

export default function AgencyOffice() {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Track scroll correctly so that the tab changes when we are observing different image blocks
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = 0;
    // We have 3 blocks. 0 to 0.33, 0.33 to 0.66, 0.66 to 1.0
    // Shifting the thresholds slightly to allow transition right when the scroll is halfway into the next block.
    if (latest >= 0.66) {
      index = 2;
    } else if (latest >= 0.33) {
      index = 1;
    } else {
      index = 0;
    }

    if (activeTab !== index) setActiveTab(index);
  });

  const loc = locations[activeTab];

  // Optional: Clicking a tab scrolls to the corresponding percentage value.
  const handleTabClick = (index) => {
    setActiveTab(index);
    if (!containerRef.current) return;
    const windowHeight = window.innerHeight;
    const offsetTop = containerRef.current.offsetTop;
    // Entire container height is composed of 3 blocks roughly
    const sectionScrollHeight = containerRef.current.offsetHeight - windowHeight;
    let targetScrollProgress = 0;
    if (index === 1) targetScrollProgress = 0.4;
    else if (index === 2) targetScrollProgress = 0.8;

    window.scrollTo({
      top: offsetTop + sectionScrollHeight * targetScrollProgress,
      behavior: 'smooth'
    });
  };

  return (
    <section ref={containerRef} className="relative w-full bg-[#0A1628]">

      {/* 
        ========================================
        STICKY BACKGROUND TRACK
        ========================================
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={loc.id}
              src={loc.bgImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover grayscale-[30%] contrast-125"
              alt={`${loc.city} Background`}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-black/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[#0A1628] opacity-40 mix-blend-multiply" />
        </div>
      </div>

      {/* 
        ========================================
        CONTENT WRAPPER (Determines scroll height)
        ========================================
      */}
      <div className="relative z-10 w-full px-8 md:px-12 lg:px-24 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column (Sticky Interactive Content) */}
        <div className="lg:col-span-6 sticky top-0 h-screen flex flex-col justify-center py-24 z-20 pointer-events-none">
          <div className="pointer-events-auto flex flex-col items-start w-full">

            {/* Navigation Tabs */}
            <div className="flex items-center gap-6 mb-8 mt-[-10vh]">
              {locations.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(idx)}
                  className={`font-bold tracking-widest text-[13px] uppercase transition-colors duration-300 ${activeTab === idx ? "text-[#EDEDED]" : "text-gray-500 hover:text-gray-300"
                    }`}
                  style={{ fontFamily: "var(--font-inter), 'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500 }}
                >
                  {item.city}
                </button>
              ))}
            </div>

            {/* Dynamic Animated Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-start"
              >
                  <h2
                  className="'Helvetica Neue', Helvetica, Arial, sans-serif font-extrabold text-fluid-h1 tracking-tighter leading-[1.05] uppercase mb-6"
                  style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", color: "#EDEDED" }}
                >
                  {loc.title.split('\n').map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </h2>

                <p className="'Helvetica Neue', Helvetica, Arial, sans-serif text-gray-300 text-fluid-body leading-[1.8] tracking-widest uppercase max-w-[400px] mb-8 font-semibold">
                  {loc.description}
                </p>

                <Button variant="gold" href={loc.mapLink} target="_blank">
                  <span style={{ fontFamily: "var(--font-inter), 'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 700 }}>SHOW ON MAP</span>
                </Button>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

        {/* Right Column (Native Scroll Track) */}
        {/* On mobile, we keep the track invisible to prevent overlap but MUST keep its height to drive the scroll-linked tabs and pinning */}
        <div className="lg:col-span-4 lg:col-start-8 flex flex-col gap-0 w-full max-w-[400px] mx-auto lg:mx-0 pt-[5vh] pb-[5vh] lg:pt-[40vh] lg:pb-[40vh] z-10 opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto">
          {locations.map((locationBlock, blockIdx) => (
            <div key={blockIdx} className="flex flex-col">
              {/* Mobile: single fixed-height spacer per sector (no images) */}
              <div className="block lg:hidden h-[65vh] shrink-0" />
              {/* Desktop: original image grid */}
              {locationBlock.images.map((imgSrc, i) => (
                <div key={`${blockIdx}-${i}`} className="hidden lg:block w-full lg:aspect-[4/5] bg-[#111] overflow-hidden relative border border-white/5 shrink-0">
                  <img src={imgSrc} alt={`${locationBlock.city} detail ${i}`} className="w-full h-full object-cover transition-opacity hover:opacity-100" />
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
