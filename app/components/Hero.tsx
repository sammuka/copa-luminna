'use client';

import Image from 'next/image';
import CountdownTimer from './CountdownTimer';

const TICKER_TEXT = 'USA · MEXICO · CANADA — JUNE 11 — JULY 19 — 48 TEAMS — 16 CITIES — 104 MATCHES';
const TICKER_CONTENT = `${TICKER_TEXT} — ${TICKER_TEXT} — ${TICKER_TEXT}`;

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 py-24">
      <div className="flex flex-col items-center gap-8 md:gap-12 w-full max-w-7xl">
        <div
          className="glass px-5 py-2 rounded-full text-xs md:text-sm uppercase tracking-[0.3em] text-cyan-accent animate-[fade-in-up_0.8s_ease-out]"
          style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
        >
          FIFA World Cup 26 · Experiência Imersiva
        </div>

        <div
          className="relative"
          style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full scale-110" />
          <Image
            src="/assets/luminna-horizontal-branca.png"
            alt="Luminna AI"
            width={360}
            height={90}
            priority
            className="relative z-10 drop-shadow-[0_0_30px_rgba(59,130,246,0.6)] animate-[float_6s_ease-in-out_infinite]"
          />
        </div>

        <div
          className="text-center space-y-2 animate-[fade-in-up_0.8s_ease-out]"
          style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <span className="block font-display font-black text-4xl md:text-7xl lg:text-8xl text-white leading-[0.95]">
            A COPA DO MUNDO
          </span>
          <span className="block font-display font-black text-4xl md:text-7xl lg:text-8xl text-gradient-blue leading-[0.95] animate-[gradient-shift_6s_ease_infinite] bg-[length:200%_auto]">
            ESTÁ CHEGANDO.
          </span>
        </div>

        <p
          className="max-w-2xl text-base md:text-xl text-blue-200/90 font-sans leading-relaxed text-center animate-[fade-in-up_0.8s_ease-out]"
          style={{ animationDelay: '0.7s', opacity: 0, animationFillMode: 'forwards' }}
        >
          Em breve, a experiência interativa mais imersiva para viver cada lance da{' '}
          <strong className="text-cyan-accent">Copa do Mundo 2026</strong>. Tabela oficial e muito mais — com a inteligência da Luminna AI.
        </p>

        <div
          className="animate-[fade-in-up_0.8s_ease-out]"
          style={{ animationDelay: '0.9s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <CountdownTimer targetDate="2026-06-11T20:00:00Z" />
        </div>

        <div
          className="w-full max-w-5xl overflow-hidden glass rounded-full py-4 border border-blue-400/20 animate-[fade-in-up_0.8s_ease-out]"
          style={{ animationDelay: '1.1s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <div className="whitespace-nowrap text-sm md:text-base font-display font-bold tracking-[0.15em] text-blue-300 animate-[ticker_30s_linear_infinite]">
            {TICKER_CONTENT}
          </div>
        </div>

        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
          style={{ animationDelay: '1.5s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <div className="text-xs uppercase tracking-[0.3em] text-blue-400/70">Scroll</div>
          <svg
            className="w-6 h-6 text-blue-400/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
