import React from 'react';
import Script from 'next/script';
import LandingHeader from './LandingHeader';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import ServicesSection from './ServicesSection';
import ConciergeSection from './ConciergeSection';
import ProcessSection from './ProcessSection';
import PropertyGrid from './PropertyGrid';
import LandingFooter from './LandingFooter';
import SiteFooter from './SiteFooter';

export const metadata = {
  title: "HF Realtors | Exclusive Properties",
  description: "Your personal concierge to residential and commercial properties in Gurgaon. Over 4500 Cr transacted.",
};

export default function MasterLandingPage() {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '3074002362990770');
          fbq('track', 'PageView');
        `}
      </Script>
      <main className="min-h-screen bg-[#161F48] text-white">
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=3074002362990770&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <LandingHeader />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <ConciergeSection />
      <ProcessSection />
      <PropertyGrid />
      <LandingFooter />
      <SiteFooter />
    </main>
    </>
  );
}
