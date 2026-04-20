import React from 'react';
import LandingHeader from './LandingHeader';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import ServicesSection from './ServicesSection';
import ProcessSection from './ProcessSection';
import PropertyGrid from './PropertyGrid';
import LandingFooter from './LandingFooter';

export const metadata = {
  title: "HF Realtors | Exclusive Properties",
  description: "Your personal concierge to residential and commercial properties in Gurgaon. Over 4500 Cr transacted.",
};

export default function MasterLandingPage() {
  return (
    <main className="min-h-screen bg-[#293568] text-white">
      <LandingHeader />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <ProcessSection />
      <PropertyGrid />
      <LandingFooter />
    </main>
  );
}
