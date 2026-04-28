"use client";

import React, { useCallback, useEffect, useState } from "react";

interface ScoreInputProps {
  matchId: number;
  side: "home" | "away";
}

const STORAGE_NS = "lumina-copa:bracket";

function ScoreInput({ matchId, side }: ScoreInputProps) {
  const key = `${STORAGE_NS}:${matchId}:${side}:score`;
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored !== null) setValue(stored);
  }, [key]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, "").slice(0, 2);
      setValue(raw);
      if (raw === "") localStorage.removeItem(key);
      else localStorage.setItem(key, raw);
    },
    [key]
  );

  return (
    <input
      type="text"
      inputMode="numeric"
      value={value}
      onChange={onChange}
      onClick={(e) => e.currentTarget.select()}
      placeholder="–"
      aria-label={`Placar ${side}`}
      className="w-7 h-7 shrink-0 text-center font-display text-sm tabular-nums
                 bg-black/30 border border-white/10 rounded
                 text-white placeholder:text-white/20
                 outline-none focus:border-amber-400/60 focus:bg-black/50
                 transition-colors"
    />
  );
}

export default React.memo(ScoreInput);
