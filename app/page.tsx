"use client";

import { useEffect, useState } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import Hero from './components/Hero';
import PdfViewer from './components/PdfViewer';
import AudioPlayer from './components/AudioPlayer';
import ScrollVideoController from './components/ScrollVideoController';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <main className="relative z-10 min-h-screen bg-gray-900" />;
  }

  return (
    <>
      <AnimatedBackground />
      <AudioPlayer />
      <main className="relative z-10">
        <ScrollVideoController src="/assets/luminna-background.mp4">
          <Hero />
        </ScrollVideoController>
        <PdfViewer src="/assets/tabelacopa-2026-ok.pdf" title="Tabela Copa do Mundo 2026" />
      </main>
    </>
  );
}
