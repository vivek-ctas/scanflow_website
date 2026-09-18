"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHoveredWa, setIsHoveredWa] = useState(false);
  const [isHoveredTop, setIsHoveredTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
        setScrollProgress(progress);
      }

      if (currentScroll > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG circle calculation: radius 22, circumference = 2 * π * 22 ≈ 138.23
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {/* ── Left Bottom: WhatsApp Floating Button ── */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center group">
        <a
          href="https://wa.me/917948993409?text=Hello%20ScanFlow%20Team%2C%20I%20am%20interested%20in%20learning%20more%20about%20ScanFlow%20Barcode%20Scanner."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          onMouseEnter={() => setIsHoveredWa(true)}
          onMouseLeave={() => setIsHoveredWa(false)}
          className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-[0_6px_24px_rgba(37,211,102,0.45)] hover:bg-[#20BD5A] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
        >
          {/* Subtle pulsating wave */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />

          {/* WhatsApp SVG Icon */}
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 fill-current relative z-10"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.954 1.18-.175.201-.351.226-.652.075-.301-.15-1.272-.469-2.424-1.496-.895-.798-1.5-1.783-1.675-2.084-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.238-.244-.588-.493-.509-.678-.518-.176-.009-.376-.01-.577-.01-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.511c0 1.481 1.079 2.91 1.23 3.111.15.201 2.122 3.24 5.141 4.544.718.31 1.279.496 1.716.635.722.23 1.378.197 1.897.12.578-.087 1.782-.728 2.033-1.431.25-.703.25-1.305.175-1.43-.075-.126-.276-.201-.577-.351zm-5.461 7.429c-1.849 0-3.66-.497-5.247-1.442l-.376-.223-3.902 1.023 1.042-3.805-.245-.39a10.009 10.009 0 0 1-1.533-5.35c0-5.528 4.502-10.027 10.035-10.027 2.68 0 5.197 1.044 7.089 2.937a9.98 9.98 0 0 1 2.94 7.088c0 5.531-4.499 10.029-10.028 10.029zm8.502-18.529A11.942 11.942 0 0 0 12.011 0C5.385 0 0 5.387 0 12.016c0 2.115.553 4.18 1.603 6.002L0 24l6.166-1.618a11.967 11.967 0 0 0 5.845 1.517h.005c6.626 0 12.013-5.388 12.013-12.018 0-3.21-1.25-6.227-3.516-8.498z" />
          </svg>
        </a>

        {/* Floating Tooltip Pill */}
        <AnimatePresence>
          {isHoveredWa && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="hidden sm:flex items-center ml-3 px-3.5 py-1.5 bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold rounded-full shadow-lg pointer-events-none"
            >
              <span>Chat on WhatsApp</span>
              <span className="w-2 h-2 ml-2 rounded-full bg-[#25D366] animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Right Bottom: Ultra-Stylish Scroll To Top with Circular Progress ── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 flex items-center flex-row-reverse"
          >
            <button
              onClick={scrollToTop}
              onMouseEnter={() => setIsHoveredTop(true)}
              onMouseLeave={() => setIsHoveredTop(false)}
              aria-label="Scroll to top"
              className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white/95 backdrop-blur-md text-primary shadow-[0_8px_30px_rgba(19,53,90,0.18)] hover:shadow-[0_12px_36px_rgba(60,154,196,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-secondary/30 cursor-pointer overflow-visible"
            >
              {/* SVG Circular Progress Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1" viewBox="0 0 52 52">
                {/* Track Circle */}
                <circle
                  cx="26"
                  cy="26"
                  r={radius}
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="2.5"
                />
                {/* Active Progress Circle with Cyan Gradient */}
                <circle
                  cx="26"
                  cy="26"
                  r={radius}
                  fill="none"
                  stroke="url(#top-progress-grad)"
                  strokeWidth="2.8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-[stroke-dashoffset] duration-150 ease-out"
                />
                <defs>
                  <linearGradient id="top-progress-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3C9AC4" />
                    <stop offset="100%" stopColor="#13355A" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Inner Button Circle with Icon */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-50 group-hover:bg-gradient-to-tr group-hover:from-primary group-hover:to-secondary group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs">
                <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:text-white group-hover:-translate-y-0.5 transition-all duration-200" />
              </div>
            </button>

            {/* Hover Tooltip with Percentage */}
            <AnimatePresence>
              {isHoveredTop && (
                <motion.div
                  initial={{ opacity: 0, x: 10, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="hidden sm:flex items-center mr-3 px-3.5 py-1.5 bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold rounded-full shadow-lg pointer-events-none"
                >
                  <span>Back to top</span>
                  <span className="ml-2 font-mono text-[11px] text-[#8FE7FF]">{Math.round(scrollProgress)}%</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
