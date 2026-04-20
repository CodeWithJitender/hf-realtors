"use client";

import React from 'react';

export default function StatsSection() {
  const stats = [
    { value: "4500+", label: "Cr. Transacted" },
    { value: "250+", label: "Happy Families" },
    { value: "30+", label: "Top Developers" },
    { value: "25+", label: "Cities Presence" }
  ];

  return (
    <section className="w-full py-16 bg-[#293568] border-y border-[#E8C96A]/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-[#E8C96A]/10">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center text-center px-4">
            <h3 className="text-4xl md:text-5xl font-bold text-[#E8C96A] mb-2">{stat.value}</h3>
            <p className="text-sm md:text-base text-[#D9D9D9] uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
