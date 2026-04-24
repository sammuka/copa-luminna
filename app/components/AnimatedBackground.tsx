'use client';

import { useMemo } from 'react';

const PARTICLES = Array.from({ length: 60 }, (_, i) => {
  const seed = (i * 2654435761) % 2147483648;
  return {
    id: i,
    left: ((seed % 10000) / 100).toFixed(2),
    top: ((Math.abs(seed * 1.1) % 10000) / 100).toFixed(2),
    size: (seed % 3) + 1,
    duration: ((seed % 4000) / 1000 + 2).toFixed(1),
    color: seed % 2 === 0 ? 'bg-white' : 'bg-blue-300',
  };
});

export default function AnimatedBackground() {
  const particles = useMemo(() => PARTICLES, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-radial from-blue-700/40 via-navy-900 to-navy-deep" />

      <div className="absolute inset-0">
        <div
          className="absolute w-[800px] h-[1200px] top-[-400px] left-[-200px] opacity-30"
          style={{
            background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.4) 0%, transparent 70%)',
            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            animation: 'spotlight-sweep 40s ease-in-out infinite',
            transformOrigin: 'top center',
          }}
        />
        <div
          className="absolute w-[700px] h-[1100px] top-[-300px] right-[-100px] opacity-25"
          style={{
            background: 'linear-gradient(225deg, rgba(56, 189, 248, 0.35) 0%, transparent 70%)',
            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            animation: 'spotlight-sweep 55s ease-in-out infinite',
            animationDelay: '5s',
            transformOrigin: 'top center',
          }}
        />
        <div
          className="absolute w-[900px] h-[1400px] bottom-[-600px] left-1/2 -translate-x-1/2 opacity-20"
          style={{
            background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            animation: 'spotlight-sweep 70s ease-in-out infinite',
            animationDelay: '12s',
            transformOrigin: 'top center',
          }}
        />
      </div>

      <div className="absolute inset-0 opacity-[0.08]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="stadium-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stadium-grid)" />
        </svg>
      </div>

      <div className="absolute inset-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className={`absolute rounded-full ${p.color}`}
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `star-twinkle ${p.duration}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-[float_12s_ease-in-out_infinite]" />
      <div className="absolute top-[60%] right-[10%] w-[600px] h-[600px] bg-cyan-400/15 rounded-full blur-3xl animate-[float_15s_ease-in-out_infinite_reverse]" />
      <div className="absolute bottom-[5%] left-[40%] w-[450px] h-[450px] bg-blue-600/25 rounded-full blur-3xl animate-[float_18s_ease-in-out_infinite]" />
      <div className="absolute top-[30%] right-[35%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl animate-[float_20s_ease-in-out_infinite_reverse]" />
    </div>
  );
}
