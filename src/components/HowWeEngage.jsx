"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { usePreloader } from "@/context/PreloaderContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const engagementData = [
  {
    index: "01",
    title: "Property Acquisition",
    subtitle: "Finding Opportunities Worth Owning",
    description:
      "Acquiring the right property requires more than access to listings. It requires insight, timing, and careful evaluation.\n\nOur advisory-led approach helps clients identify properties with strong potential and ensures every acquisition aligns with their financial and lifestyle goals.\n\nFrom opportunity discovery to final negotiation, we guide every step of the process with precision and discretion.",
    image: "/images/services/property-acquisition.jpg",
  },
  {
    index: "02",
    title: "Property Disposition",
    subtitle: "Maximizing the Value of Your Asset",
    description:
      "Selling a property is as much about strategy as it is about timing. Our team develops a tailored approach to position each property effectively in the market.\n\nThrough targeted outreach, qualified buyer networks, and careful transaction management, we ensure that every sale achieves optimal value and a seamless closing experience.",
    image: "/images/services/property-disposition.jpg",
  },
  {
    index: "03",
    title: "Leasing & Rental Advisory",
    subtitle: "Connecting the Right Spaces with the Right People",
    description:
      "Whether for residential or commercial assets, successful leasing requires understanding both market demand and tenant expectations.\n\nWe manage the entire leasing process, from positioning the property to negotiating agreements and ensuring long-term stability and value for property owners.",
    image: "/images/services/leasing-and-rental-advisory.jpg",
  },
  {
    index: "04",
    title: "Real Estate Portfolio Management",
    subtitle: "Managing Assets for Long-Term Performance",
    description:
      "Real estate portfolios require continuous oversight to maintain performance and value. HF Realtors provides strategic management designed to optimize asset potential while minimizing operational complexity.\n\nOur approach focuses on monitoring performance, identifying growth opportunities, and ensuring that every property contributes meaningfully to the broader portfolio.",
    image: "/images/services/real-estate-portfolio-management.jpg",
  },
  {
    index: "05",
    title: "Wealth & Investment Advisory",
    subtitle: "Turning Property Into a Strategic Asset",
    description:
      "Real estate plays a powerful role in long-term wealth creation. Our advisory services help clients evaluate opportunities through the lens of risk, return, and long-term investment strategy.\n\nBy combining market intelligence with a financial perspective, we guide clients toward investments that support sustainable growth and portfolio diversification.",
    image: "/images/services/wealth-and-investment-advisory.jpg",
  },
  {
    index: "06",
    title: "Concierge & Lifestyle Services",
    subtitle: "Beyond the Transaction",
    description:
      "Exceptional real estate experiences extend beyond acquiring a property. Our concierge services are designed to support clients through the transition into ownership or investment.\n\nFrom property setup to design coordination and lifestyle assistance, we ensure that every aspect of the experience is seamless and thoughtfully managed.",
    image: "/images/services/concierge-and-lifestyle-services.jpg",
  },
];

export default function HowWeEngage() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const { isPreloaderDone } = usePreloader();

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      if (!isPreloaderDone) return;

      const cards = cardsRef.current.filter(Boolean);
      if (cards.length === 0) return;

      const totalCards = cards.length;
      // Disable scale on very short screens to preserve legibility
      const useScale = window.innerHeight >= 500;

      // Set initial states explicitly per card
      cards.forEach((card, i) => {
        gsap.set(card, {
          yPercent: i === 0 ? 0 : 100,
          scale: 1,
          opacity: 1,
          transformOrigin: "top center",
          willChange: "transform, opacity",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${(totalCards - 1) * 150}vh`,
          scrub: 2,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
        },
      });

      // Animate each card after card 0
      cards.forEach((card, i) => {
        if (i > 0) {
          const label = `step${i}`;
          tl.addLabel(label, i - 1)
            .to(card, { yPercent: 0, ease: "power3.inOut", duration: 1 }, label)
            .to(
              cards[i - 1],
              {
                scale: useScale ? 0.95 : 1,
                opacity: 0.35,
                ease: "power3.inOut",
                duration: 1,
              },
              label
            );
        }
      });
    },
    { scope: sectionRef, dependencies: [isPreloaderDone] }
  );

  return (
    <section
      id="all-services"
      className="w-full"
      style={{ backgroundColor: "#0A1628", overscrollBehavior: "contain" }}
    >
      {/* Section Header */}
      <div className="w-full text-center pt-[clamp(3rem,6vw,5rem)] pb-[clamp(2rem,4vw,3.5rem)] px-6">
        {/* <p className="text-[#E8C96A] text-xs tracking-[0.4em] uppercase 'Helvetica Neue', Helvetica, Arial, sans-serif mb-4 font-medium">
          Our Services
        </p> */}
        <h2
          className="text-[clamp(2.5rem,5vw,5rem)] font-bold uppercase tracking-tighter leading-tight"
          style={{ fontFamily: "var(--font-display)", color: "#E8C96A" }}
        >
          How We Engage
        </h2>
      </div>

      {/* Pinned stacking section */}
      <div
        ref={sectionRef}
        className="relative w-full"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <div className="relative w-full h-full px-[clamp(1rem,3vw,4rem)]">
          {engagementData.map((data, i) => (
            <div
              key={data.title}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="absolute inset-x-[clamp(1rem,3vw,4rem)] inset-y-0 flex items-center justify-center"
              style={{ zIndex: i + 1 }}
            >
              {/* Card shell — height auto but min-height controlled */}
              <div
                className="w-full rounded-[24px] overflow-hidden"
                style={{
                  minHeight: "min(80vh, 700px)",
                  height: "auto",
                  maxHeight: "90vh",
                  border: "1px solid rgba(232,201,106,0.15)",
                  borderRadius: "20px",
                  boxShadow: "0 -10px 60px rgba(0,0,0,0.4)",
                  willChange: "transform, opacity",
                }}
              >
                {/* 2-col on md+, single col on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-[40%_60%] h-full min-h-[inherit]">

                  {/* Left column — image BG */}
                  <div
                    className="relative flex flex-col justify-between overflow-hidden"
                    style={{
                      padding: "clamp(1.5rem, 5vh, 4rem)",
                      minHeight: "280px", // ensures Image fill has a parent height on mobile
                    }}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={data.image}
                        alt={data.title}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1f2d]/88 via-[#0A1628]/78 to-[#0d1f2d]/62" />
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E8C96A] to-transparent opacity-60" />
                    </div>

                    <span className="relative z-10 text-[#E8C96A] text-xs font-semibold tracking-[0.35em] uppercase" style={{ fontFamily: "var(--font-inter), 'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500 }}>
                      {data.index}
                    </span>

                    <div className="relative z-10">
                      <h3
                        className="font-bold uppercase leading-[0.95] tracking-tighter text-[#FFFFFF] mb-3"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(1.5rem, 4vw + 0.5rem, 3rem)",
                          textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                        }}
                      >
                        {data.title}
                      </h3>
                      <div className="h-px w-10 bg-[#E8C96A] mb-4" />
                      <p
                        className="text-white/75 font-light leading-snug"
                        style={{ fontFamily: "var(--font-inter), 'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)" }}
                      >
                        {data.subtitle}
                      </p>
                    </div>


                  </div>

                  {/* Right column — description */}
                  <div
                    className="flex flex-col justify-center"
                    style={{ padding: "clamp(1.5rem, 5vh, 4rem)", backgroundColor: "#0F1E38" }}
                  >
                    {/* Decorative quote mark */}
                    <div
                      className="text-[#E8C96A]/20 font-playfair leading-none mb-3 select-none"
                      style={{ fontSize: "clamp(3rem, 5vw, 6rem)", lineHeight: 1 }}
                      aria-hidden="true"
                    >
                      "
                    </div>
                    {data.description.split("\n\n").map((para, pi) => (
                      <p
                        key={pi}
                        className="leading-relaxed mb-4 last:mb-0"
                        style={{
                          color: "#fff",
                          fontFamily: "var(--font-body)",
                          fontWeight: 400,
                          fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)",
                          overflowWrap: "break-word",
                          wordBreak: "break-word",
                        }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
