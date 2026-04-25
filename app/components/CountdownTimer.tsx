'use client';

import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string;
}

function computeTimeLeft(targetDateStr: string): TimeLeft | null {
  const target = new Date(targetDateStr).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return null;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null | undefined>(undefined);

  useEffect(() => {
    setTimeLeft(computeTimeLeft(targetDate));

    const interval = setInterval(() => {
      setTimeLeft(computeTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft === undefined) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-5xl">
        {['DIAS', 'HORAS', 'MINUTOS', 'SEGUNDOS'].map((label, idx) => (
          <div key={label} className="relative">
            <div className="glass rounded-2xl p-4 md:p-8 border border-blue-400/30 shadow-[0_0_40px_rgba(59,130,246,0.3)] animate-[pulse-glow_3s_ease-in-out_infinite] flex flex-col items-center justify-center">
              <div className="font-display font-black text-4xl md:text-7xl text-gradient-blue tabular-nums">
                --
              </div>
              <div className="text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-blue-300 mt-2 md:mt-3">
                {label}
              </div>
            </div>
            {idx < 3 && (
              <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 font-display font-black text-4xl text-blue-400/50 animate-pulse">
                :
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (timeLeft === null) {
    return (
      <div className="glass rounded-2xl p-12 md:p-16 border border-cyan-400/50 shadow-[0_0_60px_rgba(34,211,238,0.5)] animate-[pulse-glow_2s_ease-in-out_infinite] max-w-3xl">
        <div className="font-display font-black text-4xl md:text-6xl text-gradient-blue text-center">
          ESTÁ NO AR!
        </div>
        <div className="text-lg md:text-xl text-cyan-accent text-center mt-4 uppercase tracking-[0.2em]">
          A Copa começou
        </div>
      </div>
    );
  }

  const units: Array<{ value: number; label: string }> = [
    { value: timeLeft.days, label: 'DIAS' },
    { value: timeLeft.hours, label: 'HORAS' },
    { value: timeLeft.minutes, label: 'MINUTOS' },
    { value: timeLeft.seconds, label: 'SEGUNDOS' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-5xl">
      {units.map((unit, idx) => (
        <div key={unit.label} className="relative">
          <div className="glass rounded-2xl p-4 md:p-8 border border-blue-400/30 shadow-[0_0_40px_rgba(59,130,246,0.3)] animate-[pulse-glow_3s_ease-in-out_infinite] flex flex-col items-center justify-center">
            <div className="font-display font-black text-4xl md:text-7xl text-gradient-blue tabular-nums">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-blue-300 mt-2 md:mt-3">
              {unit.label}
            </div>
          </div>
          {idx < 3 && (
            <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 font-display font-black text-4xl text-blue-400/50 animate-pulse">
              :
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
