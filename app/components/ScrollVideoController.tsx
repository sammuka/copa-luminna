'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

interface ScrollVideoControllerProps {
  src: string;
  children: ReactNode;
  scrubVh?: number;
  scrubVhMobile?: number;
  ease?: number;
  autoScrollSpeed?: number;
  onVideoReady?: () => void;
}

type VideoWithFastSeek = HTMLVideoElement & { fastSeek?: (t: number) => void };

export default function ScrollVideoController({
  src,
  children,
  scrubVh = 600,
  scrubVhMobile = 380,
  ease = 0.12,
  autoScrollSpeed = 8,
  onVideoReady,
}: ScrollVideoControllerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const heroWrapRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current as VideoWithFastSeek | null;
    const overlay = overlayRef.current;
    const heroWrap = heroWrapRef.current;
    if (!container || !video || !overlay || !heroWrap) return;

    video.muted = true;
    video.loop = false;
    video.autoplay = false;
    video.pause();

    const handleCanPlayThrough = () => onVideoReady?.();
    video.addEventListener('canplaythrough', handleCanPlayThrough, { once: true });

    const HERO_END = 0.22;
    const VIDEO_START = 0.15;
    const VIDEO_END = 0.95;
    const VIDEO_RANGE = VIDEO_END - VIDEO_START;

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const rangeP = (p: number, a: number, b: number) =>
      b <= a ? 0 : clamp01((p - a) / (b - a));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const getProgress = () => {
      const range = container.offsetHeight - window.innerHeight;
      if (range <= 0) return 0;
      return clamp01(-container.getBoundingClientRect().top / range);
    };

    const scrollHint = scrollHintRef.current;

    let currentHero = 0;
    let lastSeekedTime = -1;
    let isAutoScrolling = false;
    let running = true;
    let rafId: number;

    // Seek throttled a ~30fps — apenas quando o alvo mudou o suficiente
    const seekTo = (time: number) => {
      const d = video.duration;
      if (!Number.isFinite(d) || d <= 0) return;
      const clamped = clamp01(time / d) * d;
      if (Math.abs(clamped - lastSeekedTime) < 1 / 30) return;
      try {
        if (typeof video.fastSeek === 'function') {
          video.fastSeek(clamped);
        } else {
          video.currentTime = clamped;
        }
        lastSeekedTime = clamped;
      } catch { /* ignore */ }
    };

    // Auto-scroll: play com playbackRate calculado para sincronia perfeita
    const calcPlaybackRate = () => {
      const d = video.duration;
      if (!Number.isFinite(d) || d <= 0) return 1;
      const scrollRange = container.offsetHeight - window.innerHeight;
      if (scrollRange <= 0) return 1;
      const videoPxRange = scrollRange * VIDEO_RANGE;
      const scrollSecs = videoPxRange / (autoScrollSpeed * 60);
      return d / scrollSecs;
    };

    const startVideoPlay = () => {
      const rate = calcPlaybackRate();
      video.playbackRate = Math.max(0.0625, Math.min(16, rate));
      video.play().catch(() => {});
    };

    const stopVideoPlay = () => {
      video.pause();
      lastSeekedTime = -1;
      const p = getProgress();
      const d = video.duration;
      if (Number.isFinite(d) && d > 0) {
        seekTo(rangeP(p, VIDEO_START, VIDEO_END) * d);
      }
    };

    const masterLoop = () => {
      if (!running) return;

      // Auto-scroll: avança o scroll e verifica fim
      if (isAutoScrolling) {
        if (container.getBoundingClientRect().bottom <= window.innerHeight) {
          isAutoScrolling = false;
          stopVideoPlay();
        } else {
          window.scrollBy(0, autoScrollSpeed);
        }
      } else {
        // Scroll manual (desktop e mobile): seek position-based
        const p = getProgress();
        const d = video.duration;
        if (Number.isFinite(d) && d > 0) {
          seekTo(rangeP(p, VIDEO_START, VIDEO_END) * d);
        }
      }

      // Visuais do hero com lerp
      const p = getProgress();
      const targetHero = rangeP(p, 0, HERO_END);
      currentHero = lerp(currentHero, targetHero, ease);
      if (Math.abs(currentHero - targetHero) < 0.0005) currentHero = targetHero;

      heroWrap.style.opacity = String(1 - currentHero);
      heroWrap.style.transform = `translate3d(0, ${-currentHero * 80}px, 0)`;
      video.style.opacity = String(currentHero);
      overlay.style.opacity = String(1 - currentHero);

      // Show scroll hint only near end of section (p > 0.75)
      if (scrollHint) {
        const hintOpacity = clamp01((p - 0.75) / 0.15);
        scrollHint.style.opacity = String(hintOpacity);
      }

      rafId = requestAnimationFrame(masterLoop);
    };

    rafId = requestAnimationFrame(masterLoop);

    const opts: AddEventListenerOptions = { passive: true };

    const onScrollFromTop = () => {
      if ((window.scrollY >=0 && window.scrollY <= 100) && autoScrollSpeed > 0 && !isAutoScrolling) {
        isAutoScrolling = true;
        startVideoPlay();
      }
    };

    const onUserInterrupt = () => {
      if (isAutoScrolling) {
        isAutoScrolling = false;
        stopVideoPlay();
      }
    };

    window.addEventListener('wheel', onScrollFromTop, opts);
    window.addEventListener('touchmove', onScrollFromTop, opts);
    window.addEventListener('touchstart', onUserInterrupt, opts);
    window.addEventListener('pointerdown', onUserInterrupt, opts);
    window.addEventListener('keydown', onUserInterrupt, opts);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      video.pause();
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      window.removeEventListener('wheel', onScrollFromTop);
      window.removeEventListener('touchmove', onScrollFromTop);
      window.removeEventListener('touchstart', onUserInterrupt);
      window.removeEventListener('pointerdown', onUserInterrupt);
      window.removeEventListener('keydown', onUserInterrupt);
    };
  }, [ease, autoScrollSpeed, onVideoReady]);

  const totalVh = 100 + (isMobile ? scrubVhMobile : scrubVh);

  const mobileMask = {
    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 60%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
    WebkitMaskComposite: 'destination-in',
    maskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 60%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
    maskComposite: 'intersect',
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${totalVh}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          playsInline
          muted
          preload="auto"
          className={`absolute inset-0 w-full h-full ${isMobile ? 'object-contain' : 'object-cover object-top'}`}
          style={{ zIndex: 0, opacity: 0, ...(isMobile ? mobileMask : {}) }}
        />

        <div
          ref={overlayRef}
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1, backgroundColor: '#020617', opacity: 1 }}
        />

        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background:
              'linear-gradient(180deg, rgba(2,6,23,0.35) 0%, rgba(2,6,23,0) 40%, rgba(2,6,23,0) 60%, rgba(2,6,23,0.55) 100%)',
          }}
        />

        <div
          ref={heroWrapRef}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 10, willChange: 'opacity, transform' }}
        >
          {children}
        </div>

        {/* Bottom fade gradient blending into #051b3a */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 w-full pointer-events-none"
          style={{
            zIndex: 20,
            height: '220px',
            background: 'linear-gradient(to bottom, transparent 0%, #051b3a 100%)',
          }}
        />

        {/* Scroll hint — appears near end of scroll section */}
        <div
          ref={scrollHintRef}
          aria-hidden
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none"
          style={{ zIndex: 25, opacity: 0, transition: 'opacity 0.4s ease' }}
        >
          <span className="text-blue-300/90 text-xs tracking-widest uppercase font-light">role para ver a tabela</span>
          <svg
            width="20" height="28" viewBox="0 0 20 28" fill="none"
            className="animate-bounce"
          >
            <rect x="1" y="1" width="18" height="22" rx="9" stroke="rgba(147,197,253,0.4)" strokeWidth="1.5" />
            <rect x="8.5" y="5" width="3" height="6" rx="1.5" fill="rgba(147,197,253,0.6)">
              <animate attributeName="y" values="5;10;5" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0;1" dur="1.6s" repeatCount="indefinite" />
            </rect>
          </svg>
        </div>
      </div>
    </div>
  );
}
