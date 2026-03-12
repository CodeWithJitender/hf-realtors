"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TextRotator = ({ words, interval = 3000, className = "" }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <span className={`inline-grid relative ${className}`}>
        {/* Invisible longest word to reserve layout width */}
        <span className="invisible col-start-1 row-start-1 pointer-events-none" aria-hidden="true">
            {words.reduce((a, b) => a.length > b.length ? a : b)}
        </span>
        {/* Animated word — lives in same grid cell, overlapping the invisible sizing span */}
        <span
          className="col-start-1 row-start-1 h-full w-full flex items-center justify-start overflow-hidden"
          style={{ perspective: "800px" }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={words[index]}
              initial={{ y: "80%", opacity: 0, rotateX: -60, scale: 0.95 }}
              animate={{ y: "0%", opacity: 1, rotateX: 0, scale: 1 }}
              exit={{ y: "-80%", opacity: 0, rotateX: 60, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
              style={{ transformOrigin: "center center -10px", display: "block", willChange: "transform, opacity" }}
              className="whitespace-nowrap"
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </span>
    </span>
  );
};

export default TextRotator;
