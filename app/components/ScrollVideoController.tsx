'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

/**
 * Controla um vídeo pelo scroll com interpolação (lerp) para movimento fluido.
 *  1. Hero (children) visível no topo.
 *  2. Conforme rola: Hero desaparece e o vídeo entra.
 *  3. Scroll controla video.currentTime com easing entre frames (suave).
 *  4. Ao chegar no fim, o vídeo congela no último frame.
 *  5. Depois o scroll libera e as próximas seções aparecem.
 */

interface ScrollVideoControllerProps {
  src: string;
  children: ReactNode;
  /** Altura extra em vh (quanto maior, mais fluido o scrub) */
  scrubVh?: number;
  scrubVhMobile?: number;
  /** Fator de easing 0..1 — menor = mais suave/lento */
  ease?: number;
  /** Velocidade do auto-scroll em px/frame (~60fps). Ex: 4 = ~240px/s. 0 = desabilitado */
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

    const onPlay = () => video.pause();
    video.addEventListener('play', onPlay);

    const HERO_END = 0.22;
    const VIDEO_START = 0.15;
    const VIDEO_END = 0.95;

    const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    const rangeP = (p: number, a: number, b: number) =>
      b <= a ? 0 : clamp01((p - a) / (b - a));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const getProgress = () => {
      const vh = window.innerHeight;
      const range = container.offsetHeight - vh;
      if (range <= 0) return 0;
      const top = container.getBoundingClientRect().top;
      return clamp01(-top / range);
    };

    // Valor "alvo" (direto do scroll) e "atual" (interpolado)
    let targetTime = 0;
    let currentTime = 0;
    let targetHero = 0;
    let currentHero = 0;
    let running = true;

    const tick = () => {
      if (!running) return;

      // Interpola hero e time do vídeo suavemente
      currentHero = lerp(currentHero, targetHero, ease);
      currentTime = lerp(currentTime, targetTime, ease);

      // Snap quando muito próximo (evita loop infinito com números minúsculos)
      if (Math.abs(currentHero - targetHero) < 0.0005) currentHero = targetHero;
      if (Math.abs(currentTime - targetTime) < 0.001) currentTime = targetTime;

      // Aplica transformações visuais
      heroWrap.style.opacity = String(1 - currentHero);
      heroWrap.style.transform = `translate3d(0, ${-currentHero * 80}px, 0)`;
      video.style.opacity = String(currentHero);
      overlay.style.opacity = String(1 - currentHero);

      // Scrub do vídeo: fastSeek é mais fluido (aceita keyframe próximo)
      if (Number.isFinite(video.duration) && video.duration > 0) {
        const now = video.currentTime || 0;
        if (Math.abs(now - currentTime) > 0.008) {
          try {
            if (typeof video.fastSeek === 'function') {
              video.fastSeek(currentTime);
            } else {
              video.currentTime = currentTime;
            }
          } catch {
            /* ignore */
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    let rafId = requestAnimationFrame(tick);

    const updateTarget = () => {
      const p = getProgress();
      targetHero = rangeP(p, 0, HERO_END);
      const videoP = rangeP(p, VIDEO_START, VIDEO_END);
      const d = video.duration;
      if (Number.isFinite(d) && d > 0) {
        targetTime = videoP * d;
      }
    };

    updateTarget();

    // --- Auto-scroll a partir do topo ---
    let isAutoScrolling = false;
    let autoRafId: number | null = null;

    const cancelAutoScroll = () => {
      isAutoScrolling = false;
      if (autoRafId !== null) {
        cancelAnimationFrame(autoRafId);
        autoRafId = null;
      }
    };

    const startAutoScroll = () => {
      if (autoScrollSpeed <= 0 || isAutoScrolling) return;
      isAutoScrolling = true;

      const scrollLoop = () => {
        if (!isAutoScrolling) return;
        const containerBottom = container.getBoundingClientRect().bottom;
        if (containerBottom <= window.innerHeight) {
          cancelAutoScroll();
          return;
        }
        window.scrollBy(0, autoScrollSpeed);
        autoRafId = requestAnimationFrame(scrollLoop);
      };
      autoRafId = requestAnimationFrame(scrollLoop);
    };

    // Disparado pelo usuário ao usar wheel ou touch estando no topo
    const onScrollFromTop = () => {
      if (window.scrollY === 0) {
        startAutoScroll();
      }
    };

    // Interrompe o auto-scroll se o usuário interagir manualmente durante ele
    const onUserInterrupt = () => {
      if (isAutoScrolling) cancelAutoScroll();
    };

    const opts: AddEventListenerOptions = { passive: true };
    window.addEventListener('scroll', updateTarget, opts);
    window.addEventListener('resize', updateTarget);
    window.addEventListener('wheel', updateTarget, opts);
    window.addEventListener('touchmove', updateTarget, opts);

    // wheel e touchstart disparam o auto-scroll (se no topo) e o interrompem (se já rolando)
    window.addEventListener('wheel', onScrollFromTop, opts);
    window.addEventListener('touchmove', onScrollFromTop, opts);
    window.addEventListener('touchstart', onUserInterrupt, opts);

    const onMeta = () => updateTarget();
    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('durationchange', onMeta);
    video.addEventListener('canplay', onMeta);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      cancelAutoScroll();
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);
      window.removeEventListener('wheel', updateTarget);
      window.removeEventListener('touchmove', updateTarget);
      window.removeEventListener('wheel', onScrollFromTop);
      window.removeEventListener('touchmove', onScrollFromTop);
      window.removeEventListener('touchstart', onUserInterrupt);
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('durationchange', onMeta);
      video.removeEventListener('canplay', onMeta);
      video.removeEventListener('play', onPlay);
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
          className="absolute inset-0 w-full h-full object-cover object-top"
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
