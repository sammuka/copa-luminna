"use client";

import { useState } from "react";
import type { Match } from "@/app/types";
import {
  ROUND_OF_32_MATCHES,
  ROUND_OF_16_MATCHES,
  QUARTER_FINAL_MATCHES,
  SEMI_FINAL_MATCHES,
  THIRD_PLACE_MATCH,
  FINAL_MATCH,
} from "@/app/types/matches";
import MatchCard from "./MatchCard";
import type { BracketStage } from "./BracketColumn";

interface Phase {
  key: string;
  stage: BracketStage;
  title: string;
  matches: Match[];
  featured?: boolean;
}

const PHASES: Phase[] = [
  { key: "r32", stage: "R32", title: "Segunda Fase", matches: ROUND_OF_32_MATCHES },
  { key: "r16", stage: "R16", title: "Oitavas de Final", matches: ROUND_OF_16_MATCHES },
  { key: "qf",  stage: "QF",  title: "Quartas de Final", matches: QUARTER_FINAL_MATCHES },
  { key: "sf",  stage: "SF",  title: "Semifinais",       matches: SEMI_FINAL_MATCHES },
  { key: "3rd", stage: "3rd", title: "Disputa 3º Lugar", matches: [THIRD_PLACE_MATCH] },
  { key: "final", stage: "Final", title: "Final", matches: [FINAL_MATCH], featured: true },
];

export default function BracketMobile() {
  const [open, setOpen] = useState<string>("final");

  return (
    <div className="px-4 pb-20 pt-4 space-y-3 max-w-md mx-auto">
      {PHASES.slice().reverse().map((phase) => {
        const isOpen = open === phase.key;
        return (
          <section
            key={phase.key}
            className="rounded-lg border border-white/5 bg-slate-900/60 backdrop-blur overflow-hidden"
          >
            <button
              onClick={() => setOpen(isOpen ? "" : phase.key)}
              className="w-full flex items-center justify-between px-4 py-3"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`block w-2 h-2 rounded-full ${
                    phase.stage === "Final"
                      ? "bg-amber-400"
                      : phase.stage === "SF"
                      ? "bg-amber-300"
                      : phase.stage === "QF"
                      ? "bg-cyan-400"
                      : phase.stage === "R16"
                      ? "bg-sky-400"
                      : phase.stage === "3rd"
                      ? "bg-rose-400"
                      : "bg-slate-400"
                  }`}
                />
                <span className="font-display tracking-[0.28em] uppercase text-[11px] text-white/90">
                  {phase.title}
                </span>
                <span className="text-[10px] font-mono text-white/30">
                  {phase.matches.length} {phase.matches.length === 1 ? "jogo" : "jogos"}
                </span>
              </div>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                className={`text-white/50 transition-transform ${isOpen ? "rotate-180" : ""}`}
                aria-hidden
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-1 flex flex-col items-center gap-3">
                {phase.matches.map((m) => (
                  <MatchCard
                    key={m.id}
                    match={m}
                    stage={phase.stage}
                    featured={phase.featured}
                  />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
