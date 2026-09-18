"use client";

import React from "react";

export default function HeroDataFlowBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* ── Soft Ambient Light Blooms ── */}
      <div className="absolute -top-20 -left-16 w-[480px] h-[480px] bg-[#38BDF8]/10 rounded-full blur-[140px]" />
      <div className="absolute top-1/4 right-10 w-[520px] h-[520px] bg-[#0284C7]/8 rounded-full blur-[150px]" />
      <div className="absolute -bottom-10 left-1/3 w-[420px] h-[420px] bg-[#6BC1E0]/8 rounded-full blur-[130px]" />

      {/* ── Soft Clean Gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EAF3FB]/85 via-white/60 to-[#F4F9FD]" />

      {/* ── Fully Responsive Continuous Dataflow Splines & Distributed Barcodes ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1400 650"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Cyan Glow Gradients */}
          <linearGradient id="df-grad-primary" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.05" />
            <stop offset="20%" stopColor="#00D2FF" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#38BDF8" stopOpacity="0.6" />
            <stop offset="85%" stopColor="#00D2FF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1B4A75" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="df-grad-secondary" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.05" />
            <stop offset="35%" stopColor="#00D2FF" stopOpacity="0.4" />
            <stop offset="75%" stopColor="#38BDF8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.05" />
          </linearGradient>

          {/* Badge Drop Shadow */}
          <filter id="badge-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#00D2FF" floodOpacity="0.22" />
            <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#13355A" floodOpacity="0.08" />
          </filter>

          {/* Keyframe animations */}
          <style>{`
            @keyframes dfStreamFlow {
              from { stroke-dashoffset: 0; }
              to { stroke-dashoffset: -28; }
            }
            @keyframes dfFloat1 {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-4px); }
            }
            @keyframes dfFloat2 {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(4px); }
            }
            @keyframes dfFloat3 {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3.5px); }
            }
            @keyframes dfPulse {
              0%, 100% { opacity: 0.4; transform: scale(0.95); }
              50% { opacity: 0.9; transform: scale(1.05); }
            }
            .stream-dash {
              animation: dfStreamFlow 2.6s linear infinite;
            }
            .node-f1 { animation: dfFloat1 5s ease-in-out infinite; }
            .node-f2 { animation: dfFloat2 5.8s ease-in-out infinite 0.8s; }
            .node-f3 { animation: dfFloat3 5.4s ease-in-out infinite 1.6s; }
            .node-f4 { animation: dfFloat1 6.2s ease-in-out infinite 0.4s; }
            .dot-pulse {
              transform-origin: center;
              animation: dfPulse 3s ease-in-out infinite;
            }
          `}</style>

          {/* Tracks for Light Particles */}
          <path
            id="trackUpper"
            d="M -50 320 C 140 260, 320 180, 520 130 C 720 80, 920 90, 1100 160 C 1240 220, 1340 300, 1450 330"
          />
          <path
            id="trackLower"
            d="M -50 540 C 180 520, 380 440, 640 400 C 880 360, 1100 420, 1280 480 C 1360 510, 1420 540, 1480 540"
          />
        </defs>

        {/* ── 1. Upper Dataflow Stream (Flows gracefully across upper area) ── */}
        <path
          d="M -50 320 C 140 260, 320 180, 520 130 C 720 80, 920 90, 1100 160 C 1240 220, 1340 300, 1450 330"
          stroke="url(#df-grad-primary)"
          strokeWidth="1.2"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M -50 320 C 140 260, 320 180, 520 130 C 720 80, 920 90, 1100 160 C 1240 220, 1340 300, 1450 330"
          stroke="#00D2FF"
          strokeWidth="1"
          strokeDasharray="6 14"
          fill="none"
          className="stream-dash"
          opacity="0.5"
        />

        {/* ── 2. Mid-Lower Dataflow Stream ── */}
        <path
          d="M -50 540 C 180 520, 380 440, 640 400 C 880 360, 1100 420, 1280 480 C 1360 510, 1420 540, 1480 540"
          stroke="url(#df-grad-secondary)"
          strokeWidth="1"
          fill="none"
          opacity="0.45"
        />
        <path
          d="M -50 540 C 180 520, 380 440, 640 400 C 880 360, 1100 420, 1280 480 C 1360 510, 1420 540, 1480 540"
          stroke="#38BDF8"
          strokeWidth="0.9"
          strokeDasharray="5 12"
          fill="none"
          className="stream-dash"
          opacity="0.4"
        />

        {/* ── 3. Gliding Light Particles ── */}
        <circle r="2" fill="#00D2FF" opacity="0.75">
          <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
            <mpath href="#trackUpper" />
          </animateMotion>
        </circle>
        <circle r="1.6" fill="#38BDF8" opacity="0.65">
          <animateMotion dur="11s" repeatCount="indefinite" rotate="auto">
            <mpath href="#trackLower" />
          </animateMotion>
        </circle>

        {/* Waypoint Glowing Dots */}
        <g transform="translate(320, 180)">
          <circle cx="0" cy="0" r="2" fill="#00D2FF" opacity="0.8" />
          <circle cx="0" cy="0" r="5" fill="#00D2FF" opacity="0.2" className="dot-pulse" />
        </g>
        <g transform="translate(760, 85)">
          <circle cx="0" cy="0" r="2" fill="#00D2FF" opacity="0.8" />
          <circle cx="0" cy="0" r="5" fill="#00D2FF" opacity="0.2" className="dot-pulse" />
        </g>
        <g transform="translate(1100, 160)">
          <circle cx="0" cy="0" r="2" fill="#38BDF8" opacity="0.7" />
          <circle cx="0" cy="0" r="5" fill="#38BDF8" opacity="0.2" className="dot-pulse" />
        </g>
        <g transform="translate(480, 425)">
          <circle cx="0" cy="0" r="1.8" fill="#00D2FF" opacity="0.7" />
          <circle cx="0" cy="0" r="4.5" fill="#00D2FF" opacity="0.2" className="dot-pulse" />
        </g>

        {/* ════════════════════════════════════════════════════════════════
            DISTRIBUTED, FULLY VISIBLE RETICLE BARCODES (4 Nodes)
           ════════════════════════════════════════════════════════════════ */}

        {/* ── Node 1: Top Left (Upper Arc near badge) ── */}
        <g transform="translate(180, 195)">
          <g className="node-f1">
          <rect
            x="0"
            y="0"
            width="46"
            height="28"
            rx="6"
            fill="white"
            fillOpacity="0.92"
            stroke="#00D2FF"
            strokeWidth="1"
            strokeOpacity="0.5"
            filter="url(#badge-shadow)"
          />
          <g stroke="#00D2FF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M 3 7 V 3 H 7" />
            <path d="M 39 3 H 43 V 7" />
            <path d="M 3 21 V 25 H 7" />
            <path d="M 39 25 H 43 V 21" />
          </g>
          <g fill="#13355A" transform="translate(7, 7)">
            <rect x="0" y="0" width="1.6" height="14" />
            <rect x="2.8" y="0" width="0.8" height="14" />
            <rect x="4.8" y="0" width="2" height="14" />
            <rect x="8" y="0" width="0.8" height="14" />
            <rect x="10" y="0" width="1.2" height="14" />
            <rect x="12.5" y="0" width="2.2" height="14" />
            <rect x="16" y="0" width="0.8" height="14" />
            <rect x="18.5" y="0" width="1.8" height="14" />
            <rect x="21.5" y="0" width="0.8" height="14" />
            <rect x="23.5" y="0" width="2.2" height="14" />
            <rect x="27" y="0" width="1" height="14" />
            <rect x="29.5" y="0" width="2" height="14" />
          </g>
          </g>
        </g>

        {/* ── Node 2: Center-Top (Above Worker & Shelves) ── */}
        <g transform="translate(680, 80)">
          <g className="node-f2">
          <rect
            x="0"
            y="0"
            width="46"
            height="28"
            rx="6"
            fill="white"
            fillOpacity="0.92"
            stroke="#00D2FF"
            strokeWidth="1"
            strokeOpacity="0.5"
            filter="url(#badge-shadow)"
          />
          <g stroke="#00D2FF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M 3 7 V 3 H 7" />
            <path d="M 39 3 H 43 V 7" />
            <path d="M 3 21 V 25 H 7" />
            <path d="M 39 25 H 43 V 21" />
          </g>
          <g fill="#13355A" transform="translate(7, 7)">
            <rect x="0" y="0" width="1.6" height="14" />
            <rect x="3" y="0" width="0.8" height="14" />
            <rect x="5.2" y="0" width="2.2" height="14" />
            <rect x="8.5" y="0" width="0.9" height="14" />
            <rect x="11" y="0" width="1.6" height="14" />
            <rect x="14" y="0" width="0.8" height="14" />
            <rect x="16.5" y="0" width="2.2" height="14" />
            <rect x="20" y="0" width="0.8" height="14" />
            <rect x="22.5" y="0" width="1.8" height="14" />
            <rect x="25.5" y="0" width="1" height="14" />
            <rect x="28" y="0" width="2" height="14" />
            <rect x="31" y="0" width="1.4" height="14" />
          </g>
          </g>
        </g>

        {/* ── Node 3: Center-Left (Near Description Text, on Mid Spline) ── */}
        <g transform="translate(420, 395)">
          <g className="node-f3">
          <rect
            x="0"
            y="0"
            width="46"
            height="28"
            rx="6"
            fill="white"
            fillOpacity="0.92"
            stroke="#00D2FF"
            strokeWidth="1"
            strokeOpacity="0.5"
            filter="url(#badge-shadow)"
          />
          <g stroke="#00D2FF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M 3 7 V 3 H 7" />
            <path d="M 39 3 H 43 V 7" />
            <path d="M 3 21 V 25 H 7" />
            <path d="M 39 25 H 43 V 21" />
          </g>
          <g fill="#13355A" transform="translate(7, 7)">
            <rect x="0" y="0" width="1.6" height="14" />
            <rect x="2.8" y="0" width="0.8" height="14" />
            <rect x="4.8" y="0" width="2" height="14" />
            <rect x="8" y="0" width="0.8" height="14" />
            <rect x="10.5" y="0" width="1.4" height="14" />
            <rect x="13" y="0" width="2" height="14" />
            <rect x="16.5" y="0" width="0.8" height="14" />
            <rect x="19" y="0" width="1.8" height="14" />
            <rect x="22" y="0" width="0.8" height="14" />
            <rect x="24.5" y="0" width="2.2" height="14" />
            <rect x="28" y="0" width="1.2" height="14" />
            <rect x="30.5" y="0" width="1.8" height="14" />
          </g>
          </g>
        </g>

        {/* ── Node 4: Upper Right (Beyond Worker / Above Phone) ── */}
        <g transform="translate(1180, 185)">
          <g className="node-f4">
          <rect
            x="0"
            y="0"
            width="48"
            height="30"
            rx="6"
            fill="white"
            fillOpacity="0.92"
            stroke="#00D2FF"
            strokeWidth="1.1"
            strokeOpacity="0.5"
            filter="url(#badge-shadow)"
          />
          <g stroke="#00D2FF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M 3 8 V 3 H 8" />
            <path d="M 40 3 H 45 V 8" />
            <path d="M 3 22 V 27 H 8" />
            <path d="M 40 27 H 45 V 22" />
          </g>
          <g fill="#13355A" transform="translate(8, 8)">
            <rect x="0" y="0" width="1.8" height="14" />
            <rect x="3" y="0" width="0.9" height="14" />
            <rect x="5.5" y="0" width="2.2" height="14" />
            <rect x="9" y="0" width="0.9" height="14" />
            <rect x="11.5" y="0" width="1.4" height="14" />
            <rect x="14.5" y="0" width="2.4" height="14" />
            <rect x="18" y="0" width="0.9" height="14" />
            <rect x="20.5" y="0" width="1.8" height="14" />
            <rect x="23.5" y="0" width="0.9" height="14" />
            <rect x="25.5" y="0" width="2.2" height="14" />
            <rect x="29" y="0" width="1.2" height="14" />
            <rect x="31.5" y="0" width="1.8" height="14" />
          </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
