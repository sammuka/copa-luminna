'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

interface ScrollVideoControllerProps {
  src: string;
  children: ReactNode;
  scrubVh?: number;
  scrubVhMobile?: number;
  ease?: number;
  autoScrollSpeed?: number;
}

type VideoWithFastSeek = HTMLVideoElement & { fastSeek?: (t: number) => void };

export default function ScrollVideoController({
  src,
  children,
  scrubVh = 600,
  scrubVhMobile = 380,
  ease = 0.12,
  autoScrollSpeed = 8,
}: ScrollVideoControllerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const heroWrapRef = useRef<HTMLDivElement>(null);

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

    let currentHero = 0;
    let lastSeekedTime = -1;
    let isAutoScrolling = false;
    let running = true;
    let rafId: number;

    // Calcula a taxa de playback para que o vídeo termine exatamente
    // quando o auto-scroll terminar a região VIDEO_START → VIDEO_END
    const calcPlaybackRate = () => {
      const d = video.duration;
      if (!Number.isFinite(d) || d <= 0) return 1;
      const scrollRange = container.offsetHeight - window.innerHeight;
      if (scrollRange <= 0) return 1;
      // px que o auto-scroll percorre na faixa do vídeo
      const videoPxRange = scrollRange * VIDEO_RANGE;
      // segundos de scroll para atravessar essa faixa a autoScrollSpeed px/frame ~60fps
      const scrollSecs = videoPxRange / (autoScrollSpeed * 60);
      return d / scrollSecs;
    };

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

    const startVideoPlay = () => {
      const rate = calcPlaybackRate();
      video.playbackRate = Math.max(0.0625, Math.min(16, rate));
      video.play().catch(() => {});
    };

    const stopVideoPlay = () => {
      video.pause();
      // Seek para sincronizar exatamente com a posição do scroll
      const p = getProgress();
      const videoP = rangeP(p, VIDEO_START, VIDEO_END);
      const d = video.duration;
      if (Number.isFinite(d) && d > 0) {
        lastSeekedTime = -1; // força o seek
        seekTo(videoP * d);
      }
    };

    // Scroll manual com play: detecta direção e velocidade do scroll para controlar playbackRate
    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();
    let scrollVelocity = 0; // px/ms
    let manualPlayTimeout: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      const now = performance.now();
      const dy = window.scrollY - lastScrollY;
      const dt = now - lastScrollTime;
      if (dt > 0) scrollVelocity = dy / dt;
      lastScrollY = window.scrollY;
      lastScrollTime = now;

      if (isAutoScrolling) return;

      const d = video.duration;
      if (!Number.isFinite(d) || d <= 0) return;

      const scrollRange = container.offsetHeight - window.innerHeight;
      if (scrollRange <= 0) return;

      // Converte velocidade de scroll (px/ms) para playbackRate do vídeo
      // scrollRange px corresponde a d segundos de vídeo
      const pxPerSecVideo = scrollRange / d;
      const rate = (scrollVelocity * 1000) / pxPerSecVideo; // px/ms → px/s → videoRate

      if (Math.abs(rate) > 0.05) {
        video.playbackRate = Math.max(0.0625, Math.min(16, Math.abs(rate)));
        if (rate > 0 && video.paused) video.play().catch(() => {});
        if (rate < 0) {
          // Retroceder: seek direto (browsers não suportam playbackRate negativo)
          video.pause();
          seekTo(rangeP(getProgress(), VIDEO_START, VIDEO_END) * d);
        }
        // Para o play depois que o scroll parar
        if (manualPlayTimeout) clearTimeout(manualPlayTimeout);
        manualPlayTimeout = setTimeout(() => {
          video.pause();
          // Seek final para sincronizar exatamente com a posição do scroll
          lastSeekedTime = -1;
          seekTo(rangeP(getProgress(), VIDEO_START, VIDEO_END) * d);
        }, 150);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const masterLoop = () => {
      if (!running) return;

      if (isAutoScrolling) {
        if (container.getBoundingClientRect().bottom <= window.innerHeight) {
          isAutoScrolling = false;
          stopVideoPlay();
        } else {
          window.scrollBy(0, autoScrollSpeed);
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

      rafId = requestAnimationFrame(masterLoop);
    };

    rafId = requestAnimationFrame(masterLoop);

    const opts: AddEventListenerOptions = { passive: true };

    const onScrollFromTop = () => {
      if (window.scrollY === 0 && autoScrollSpeed > 0 && !isAutoScrolling) {
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
    // Clique ou tecla também interrompem o auto-scroll
    window.addEventListener('pointerdown', onUserInterrupt, opts);
    window.addEventListener('keydown', onUserInterrupt, opts);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      video.pause();
      if (manualPlayTimeout) clearTimeout(manualPlayTimeout);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onScrollFromTop);
      window.removeEventListener('touchmove', onScrollFromTop);
      window.removeEventListener('touchstart', onUserInterrupt);
      window.removeEventListener('pointerdown', onUserInterrupt);
      window.removeEventListener('keydown', onUserInterrupt);
    };
  }, [ease, autoScrollSpeed]);

  const totalVh = 100 + (isMobile ? scrubVhMobile : scrubVh);

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
          style={{ zIndex: 0, opacity: 0 }}
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
      </div>
    </div>
  );
}
