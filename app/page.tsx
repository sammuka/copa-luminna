"use client";

import { useCallback, useEffect, useState } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import Hero from './components/Hero';
import LoadingOverlay from './components/LoadingOverlay';
import PdfViewer from './components/PdfViewer';
import AudioPlayer from './components/AudioPlayer';
import ScrollVideoController from './components/ScrollVideoController';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleVideoReady = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => setVideoReady(true), 700);
  }, []);

  if (!mounted) {
    return <main className="relative z-10 min-h-screen bg-gray-900" />;
  }

  return (
    <>
      {!videoReady && <LoadingOverlay fadeOut={fadeOut} />}
      <AnimatedBackground />
      <AudioPlayer />
      <main className="relative z-10">
        <ScrollVideoController
          src="/assets/luminna-background.mp4"
          scrubVhMobile={350}
          onVideoReady={handleVideoReady}
        >
          <Hero />
        </ScrollVideoController>
        <PdfViewer src="/assets/tabelacopa-2026-ok.pdf" title="Tabela Copa do Mundo 2026" />
      </main>
    </>
  );
}
