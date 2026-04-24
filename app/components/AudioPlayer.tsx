"use client";

import { useEffect, useRef, useState } from "react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.7;
    audio.loop = true;
    audio.muted = true;
    audio.play().catch(() => {});
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    setMuted(next);
    audio.muted = next;
    if (!next && audio.paused) audio.play().catch(() => {});
  }

  return (
    <>
      <audio ref={audioRef} src="/assets/musica_copa.mpeg" preload="none" />

      <button
        onClick={toggle}
        title={muted ? "Ligar som" : "Desligar som"}
        className={`fixed bottom-5 left-5 z-50 flex items-center gap-2 px-3 h-11 rounded-full${muted ? " animate-pulse" : ""}`}
        style={{
          background: muted ? "rgba(220,50,50,0.75)" : "rgba(0,0,0,0.55)",
          border: "1.5px solid rgba(255,255,255,0.25)",
          backdropFilter: "blur(8px)",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {muted ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
            <span style={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>Ligar som</span>
          </>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>
    </>
  );
}
