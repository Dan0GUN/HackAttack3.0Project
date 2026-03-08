import React, { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1200),
      setTimeout(() => setPhase(2), 3500),
      setTimeout(() => setPhase(3), 6200),
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 8200),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className={`beach-loader phase-${phase}`}>
      <style>{`
        :root {
          --sand-1: #F7D9BC;
          --sand-2: #f3d3b2;
          --foam: rgba(255,255,255,0.85);
          --water-1: #BCF7F0;
          --water-2: #BCD8F7;
          --water-3: #8fd8e7;
          --water-4: #6fc9d6;
          --ocean: #415B78;
          --coral: #ef7d67;
          --deep: #31465e;
        }

        * {
          box-sizing: border-box;
        }

        .beach-loader {
          position: fixed;
          inset: 0;
          overflow: hidden;
          background:
            radial-gradient(circle at 20% 18%, rgba(255,255,255,0.22), transparent 18%),
            radial-gradient(circle at 78% 12%, rgba(255,255,255,0.14), transparent 22%),
            linear-gradient(180deg, #fff7ef 0%, #fde7d2 38%, #f7d9bc 100%);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          transition: background 1.2s ease;
        }

        .phase-3.beach-loader {
          background:
            radial-gradient(circle at 30% 20%, rgba(255,255,255,0.12), transparent 24%),
            linear-gradient(180deg, #a8ece7 0%, #7fd6ea 38%, #415B78 100%);
        }

        .sun-glow {
          position: absolute;
          top: 7%;
          left: 50%;
          width: 280px;
          height: 280px;
          transform: translateX(-50%);
          border-radius: 42% 58% 61% 39% / 46% 39% 61% 54%;
          background:
            radial-gradient(circle, rgba(255, 248, 220, 0.95) 0%, rgba(255, 228, 180, 0.35) 38%, rgba(255,255,255,0) 72%);
          filter: blur(8px);
          animation: blobGlow 7s ease-in-out infinite alternate;
          opacity: 0.95;
          transition: opacity 0.8s ease;
        }

        .phase-3 .sun-glow {
          opacity: 0.15;
        }

        @keyframes blobGlow {
          0% {
            transform: translateX(-50%) scale(1);
            border-radius: 42% 58% 61% 39% / 46% 39% 61% 54%;
          }
          50% {
            transform: translateX(-50%) scale(1.06) rotate(3deg);
            border-radius: 54% 46% 38% 62% / 42% 58% 42% 58%;
          }
          100% {
            transform: translateX(-50%) scale(0.98) rotate(-2deg);
            border-radius: 63% 37% 59% 41% / 35% 56% 44% 65%;
          }
        }

        .sand {
          position: absolute;
          inset: auto 0 0 0;
          height: 55%;
          background:
            radial-gradient(circle at 10% 20%, rgba(255,255,255,0.15) 0 2px, transparent 3px),
            radial-gradient(circle at 60% 70%, rgba(255,255,255,0.12) 0 1.5px, transparent 2.5px),
            radial-gradient(circle at 75% 25%, rgba(255,255,255,0.1) 0 1px, transparent 2px),
            radial-gradient(circle at 25% 80%, rgba(0,0,0,0.05) 0 1px, transparent 2px),
            linear-gradient(180deg, var(--sand-1), var(--sand-2));
          transition: opacity 0.9s ease;
        }

        .phase-3 .sand {
          opacity: 0;
        }

        .sand::before,
        .sand::after {
          content: "";
          position: absolute;
          left: -10%;
          width: 120%;
          height: 110px;
          opacity: 0.25;
          background-repeat: repeat-x;
          background-size: 800px 100%;
        }

        .sand::before {
          top: 24%;
          background-image: url("data:image/svg+xml;utf8,\
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 120' preserveAspectRatio='none'>\
            <path d='M0 60 C 40 30, 90 95, 150 60 S 260 25, 330 58 S 450 96, 520 60 S 630 25, 700 56 S 760 90, 800 60' fill='none' stroke='rgba(255,255,255,0.75)' stroke-width='4' stroke-linecap='round'/>\
          </svg>");
          animation: driftSlow 14s linear infinite;
        }

        .sand::after {
          top: 41%;
          opacity: 0.18;
          background-image: url("data:image/svg+xml;utf8,\
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 120' preserveAspectRatio='none'>\
            <path d='M0 62 C 55 100, 115 18, 180 64 S 300 100, 380 58 S 505 18, 590 62 S 720 100, 800 60' fill='none' stroke='rgba(255,255,255,0.65)' stroke-width='3' stroke-linecap='round'/>\
          </svg>");
          animation: driftReverse 18s linear infinite;
        }

        @keyframes driftSlow {
          from { transform: translateX(0); }
          to { transform: translateX(-120px); }
        }

        @keyframes driftReverse {
          from { transform: translateX(-80px); }
          to { transform: translateX(40px); }
        }

        .shimmer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.08) 40%, transparent 60%);
          animation: shimmerSweep 5s linear infinite;
          mix-blend-mode: screen;
        }

        @keyframes shimmerSweep {
          0%   { transform: translateX(-35%); }
          100% { transform: translateX(35%); }
        }

        .foam-field {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .bubble {
          position: absolute;
          bottom: -40px;
          background: radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95), rgba(255,255,255,0.35) 58%, rgba(255,255,255,0.05) 100%);
          opacity: 0.45;
          animation: floatUp linear infinite;
          filter: blur(0.2px);
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0.7) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.35;
          }
          60% {
            opacity: 0.55;
          }
          100% {
            transform: translateY(-110vh) scale(1.15) rotate(180deg);
            opacity: 0;
          }
        }

        .wave-stack {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .wave {
          position: absolute;
          left: -10%;
          width: 120%;
          transition:
            transform 2.3s cubic-bezier(.22,1,.36,1),
            opacity 1.2s ease;
          will-change: transform;
        }

        .wave svg {
          display: block;
          width: 100%;
          height: 100%;
        }

        /* MUCH taller waves */
        .wave-1 {
          bottom: -55%;
          height: 135%;
          opacity: 0.97;
          animation: waveDrift1 9s ease-in-out infinite alternate;
        }

        .wave-2 {
          bottom: -65%;
          height: 150%;
          opacity: 0.95;
          animation: waveDrift2 11s ease-in-out infinite alternate;
        }

        .wave-3 {
          bottom: -78%;
          height: 170%;
          opacity: 0.93;
          animation: waveDrift3 13s ease-in-out infinite alternate;
        }

        @keyframes waveDrift1 {
          0%   { left: -10%; }
          100% { left: -12%; }
        }

        @keyframes waveDrift2 {
          0%   { left: -10%; }
          100% { left: -8%; }
        }

        @keyframes waveDrift3 {
          0%   { left: -10%; }
          100% { left: -11%; }
        }

        .phase-0 .wave-1 { transform: translateY(24%); }
        .phase-0 .wave-2 { transform: translateY(30%); }
        .phase-0 .wave-3 { transform: translateY(36%); }

        .phase-1 .wave-1 { transform: translateY(2%); }
        .phase-1 .wave-2 { transform: translateY(8%); }
        .phase-1 .wave-3 { transform: translateY(14%); }

        .phase-2 .wave-1 { transform: translateY(22%); }
        .phase-2 .wave-2 { transform: translateY(26%); }
        .phase-2 .wave-3 { transform: translateY(30%); }

        /* Final surge goes fully past the viewport */
        .phase-3 .wave-1 { transform: translateY(-145%); }
        .phase-3 .wave-2 { transform: translateY(-138%); }
        .phase-3 .wave-3 { transform: translateY(-132%); }

        .centerpiece {
          position: absolute;
          top: 48%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 5;
          transition: opacity 1s ease, transform 1s ease;
        }

        .phase-0 .centerpiece {
          opacity: 0;
          transform: translate(-50%, -40%);
        }

        .phase-1 .centerpiece {
          opacity: 0;
          transform: translate(-50%, -35%);
        }

        .phase-2 .centerpiece,
        .phase-3 .centerpiece {
          opacity: 1;
          transform: translate(-50%, -50%);
        }

        .phase-3 .centerpiece {
          opacity: 0;
          transform: translate(-50%, -62%);
        }

        .compass-wrap {
          position: relative;
          width: 132px;
          height: 132px;
          display: grid;
          place-items: center;
          margin-bottom: 20px;
        }

        .compass-ring {
          position: absolute;
          inset: 0;
          border: 1.5px solid rgba(65, 91, 120, 0.18);
          border-radius: 44% 56% 51% 49% / 43% 48% 52% 57%;
          background:
            radial-gradient(circle at 30% 30%, rgba(255,255,255,0.65), rgba(255,255,255,0.08) 65%, transparent 100%);
          box-shadow:
            inset 0 0 0 8px rgba(255,255,255,0.06),
            0 20px 40px rgba(49, 70, 94, 0.12);
          animation: compassBlob 6s ease-in-out infinite alternate;
          backdrop-filter: blur(4px);
        }

        .compass-ring::before {
          content: "";
          position: absolute;
          inset: 10px;
          border: 1px dashed rgba(65, 91, 120, 0.25);
          border-radius: 57% 43% 45% 55% / 45% 60% 40% 55%;
          animation: slowSpin 12s linear infinite;
        }

        @keyframes compassBlob {
          0% {
            border-radius: 44% 56% 51% 49% / 43% 48% 52% 57%;
            transform: rotate(0deg);
          }
          100% {
            border-radius: 57% 43% 39% 61% / 58% 42% 58% 42%;
            transform: rotate(8deg);
          }
        }

        .compass {
          position: relative;
          width: 84px;
          height: 84px;
          border-radius: 50%;
          background: rgba(255,255,255,0.28);
          border: 1px solid rgba(255,255,255,0.42);
          box-shadow:
            inset 0 0 20px rgba(255,255,255,0.25),
            0 8px 20px rgba(49, 70, 94, 0.08);
          display: grid;
          place-items: center;
          animation: slowSpin 9s linear infinite;
          backdrop-filter: blur(6px);
        }

        @keyframes slowSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .needle {
          position: relative;
          width: 10px;
          height: 58px;
          animation: needleWobble 2.8s ease-in-out infinite;
        }

        .needle::before,
        .needle::after {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
        }

        .needle::before {
          top: 0;
          width: 10px;
          height: 29px;
          background: linear-gradient(180deg, var(--coral), #ff9c87);
        }

        .needle::after {
          bottom: 0;
          width: 10px;
          height: 29px;
          background: linear-gradient(180deg, #6ca7ff, var(--ocean));
          transform: translateX(-50%) rotate(180deg);
        }

        @keyframes needleWobble {
          0%, 100% { transform: rotate(-10deg); }
          50%      { transform: rotate(10deg); }
        }

        .needle-dot {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 0 0 4px rgba(255,255,255,0.18);
        }

        .mark {
          position: absolute;
          color: rgba(65, 91, 120, 0.72);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .mark.n { top: 8px; left: 50%; transform: translateX(-50%); }
        .mark.s { bottom: 8px; left: 50%; transform: translateX(-50%); }
        .mark.e { right: 8px; top: 50%; transform: translateY(-50%); }
        .mark.w { left: 8px; top: 50%; transform: translateY(-50%); }

        .loading-text {
          color: var(--deep);
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.92;
          text-shadow: 0 2px 12px rgba(255,255,255,0.25);
        }

        .dots::after {
          content: "";
          display: inline-block;
          width: 1.4em;
          text-align: left;
          animation: dots 1.4s steps(4, end) infinite;
        }

        @keyframes dots {
          0%   { content: ""; }
          25%  { content: "."; }
          50%  { content: ".."; }
          75%  { content: "..."; }
          100% { content: ""; }
        }

        .transition-wave {
          position: absolute;
          inset: 0;
          z-index: 8;
          pointer-events: none;
          opacity: 0;
          transform: translateY(100%);
          transition: transform 1.4s cubic-bezier(.22,1,.36,1), opacity 0.8s ease;
        }

        .transition-wave svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .phase-3 .transition-wave {
          opacity: 1;
          transform: translateY(0);
        }

        .phase-3 {
          animation: finalFade 1.5s ease forwards;
          animation-delay: 1.2s;
        }

        @keyframes finalFade {
          to {
            opacity: 0;
          }
        }

        @media (max-width: 640px) {
          .compass-wrap {
            width: 112px;
            height: 112px;
          }

          .compass {
            width: 72px;
            height: 72px;
          }

          .loading-text {
            font-size: 0.88rem;
          }

          .sun-glow {
            width: 220px;
            height: 220px;
          }
        }
      `}</style>

      <div className="sun-glow" />
      <div className="shimmer" />

      <div className="sand" />

      <div className="foam-field">
        {Array.from({ length: 22 }).map((_, i) => {
          const size = 6 + (i % 5) * 4;
          const left = (i * 17) % 100;
          const duration = 6 + (i % 7);
          const delay = (i % 8) * 0.6;
          const radiusSet = [
            "50% 50% 40% 60% / 60% 40% 60% 40%",
            "56% 44% 58% 42% / 42% 62% 38% 58%",
            "42% 58% 44% 56% / 55% 42% 58% 45%",
          ];
          return (
            <span
              key={i}
              className="bubble"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                borderRadius: radiusSet[i % radiusSet.length],
              }}
            />
          );
        })}
      </div>

      <div className="wave-stack">
        <div className="wave wave-3">
          <svg viewBox="0 0 1440 500" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveDeep" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#7ec7d5" />
                <stop offset="100%" stopColor="#415B78" />
              </linearGradient>
            </defs>
            <path
              d="M0,250
                 C100,180 170,320 280,250
                 C390,180 490,120 610,220
                 C710,300 840,320 960,235
                 C1075,155 1180,150 1290,225
                 C1360,275 1410,290 1440,270
                 L1440,500 L0,500 Z"
              fill="url(#waveDeep)"
            />
          </svg>
        </div>

        <div className="wave wave-2">
          <svg viewBox="0 0 1440 420" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveMid" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#BCD8F7" />
                <stop offset="100%" stopColor="#77d8df" />
              </linearGradient>
            </defs>
            <path
              d="M0,220
                 C120,150 220,290 340,220
                 C460,150 570,100 700,190
                 C820,270 930,285 1040,215
                 C1165,140 1260,155 1360,205
                 C1400,225 1425,235 1440,228
                 L1440,420 L0,420 Z"
              fill="url(#waveMid)"
            />
            <path
              d="M0,230
                 C130,160 210,300 345,225
                 C450,170 565,120 700,198
                 C820,265 920,285 1045,220
                 C1160,160 1260,162 1365,210
                 C1410,230 1428,235 1440,230"
              fill="none"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="wave wave-1">
          <svg viewBox="0 0 1440 360" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveTop" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#BCF7F0" />
                <stop offset="100%" stopColor="#9ce7e5" />
              </linearGradient>
            </defs>
            <path
              d="M0,180
                 C95,120 190,250 310,180
                 C430,110 535,78 660,155
                 C780,230 900,250 1020,185
                 C1145,118 1260,118 1370,170
                 C1408,188 1430,195 1440,188
                 L1440,360 L0,360 Z"
              fill="url(#waveTop)"
            />
            <path
              d="M0,185
                 C100,125 190,255 310,185
                 C430,115 535,82 660,160
                 C780,235 900,255 1020,190
                 C1145,123 1260,123 1370,175
                 C1410,193 1430,198 1440,191"
              fill="none"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <div className="centerpiece">
        <div className="compass-wrap">
          <div className="compass-ring" />
          <div className="compass">
            <span className="mark n">N</span>
            <span className="mark e">E</span>
            <span className="mark s">S</span>
            <span className="mark w">W</span>
            <div className="needle" />
            <div className="needle-dot" />
          </div>
        </div>

        <div className="loading-text">
          Starting up<span className="dots" />
        </div>
      </div>

      <div className="transition-wave">
        <svg viewBox="0 0 1440 1024" preserveAspectRatio="none">
          <defs>
            <linearGradient id="finalSweep" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#BCF7F0" />
              <stop offset="35%" stopColor="#9ee4ee" />
              <stop offset="65%" stopColor="#78cfe5" />
              <stop offset="100%" stopColor="#415B78" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="1440" height="1024" fill="url(#finalSweep)" />
          <path
            d="M0,760
               C130,640 235,840 390,730
               C510,640 620,520 790,620
               C950,715 1080,760 1220,680
               C1325,620 1390,610 1440,640
               L1440,1024 L0,1024 Z"
            fill="rgba(255,255,255,0.08)"
          />
          <path
            d="M0,754
               C130,635 235,835 390,725
               C510,635 620,515 790,615
               C950,710 1080,755 1220,675
               C1325,615 1390,605 1440,635"
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}