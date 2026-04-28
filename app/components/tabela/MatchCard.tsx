"use client";

import React from "react";
import { resolveMatchTeam } from "@/app/types/teams";
import type { Match } from "@/app/types";
import EditableSlot from "./EditableSlot";
import ScoreInput from "./ScoreInput";

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" }).format(
    new Date(iso + "T00:00:00")
  );
}

type Stage = "R32" | "R16" | "QF" | "SF" | "3rd" | "Final";

const STAGE_ACCENT: Record<Stage, { bar: string; glow: string; chip: string }> = {
  R32:   { bar: "bg-slate-400/40",       glow: "hover:shadow-[0_0_28px_-8px_rgba(148,163,184,0.6)]", chip: "text-slate-300/70" },
  R16:   { bar: "bg-sky-400/60",         glow: "hover:shadow-[0_0_28px_-8px_rgba(56,189,248,0.55)]", chip: "text-sky-300/80" },
  QF:    { bar: "bg-cyan-400/70",        glow: "hover:shadow-[0_0_32px_-8px_rgba(34,211,238,0.6)]",  chip: "text-cyan-300/80" },
  SF:    { bar: "bg-amber-400/80",       glow: "hover:shadow-[0_0_36px_-8px_rgba(251,191,36,0.55)]", chip: "text-amber-300/80" },
  "3rd": { bar: "bg-rose-400/60",        glow: "hover:shadow-[0_0_28px_-8px_rgba(251,113,133,0.5)]", chip: "text-rose-300/80" },
  Final: { bar: "bg-linear-to-b from-amber-300 to-amber-500", glow: "hover:shadow-[0_0_48px_-6px_rgba(251,191,36,0.7)]", chip: "text-amber-200" },
};

interface MatchCardProps {
  match: Match;
  stage?: Stage;
  registerRef?: (id: string, el: HTMLElement | null) => void;
  colDelay?: number;
  featured?: boolean;
}

function MatchCard({ match, stage = "R32", registerRef, colDelay = 0, featured = false }: MatchCardProps) {
  const homeTeam = resolveMatchTeam(match.home);
  const awayTeam = resolveMatchTeam(match.away);
  const accent = STAGE_ACCENT[stage];
  const isFinal = stage === "Final";

  return (
    <article
      ref={(el) => registerRef?.(`m${match.id}`, el)}
      className={`group relative z-10 w-60 md:w-64 rounded-lg
                  bg-linear-to-b from-slate-900/80 via-slate-900/70 to-slate-950/80
                  backdrop-blur-md
                  border border-white/5
                  ${featured ? "ring-1 ring-amber-400/30" : ""}
                  ${accent.glow}
                  transition-[transform,box-shadow,border-color] duration-300 ease-out
                  hover:-translate-y-2 hover:border-white/15
                  animate-[fade-in-up_0.6s_ease-out_both]
                  overflow-hidden cursor-default`}
      style={{ animationDelay: `${colDelay}ms` }}
    >
      {/* accent bar à esquerda — cresce no hover */}
      <span className={`absolute left-0 top-0 bottom-0 w-[3px] ${accent.bar} transition-all duration-300 group-hover:w-[5px]`} aria-hidden />

      {/* gleam diagonal — div real que passa no hover */}
      <div className="pointer-events-none absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-white/8 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[500%] transition-transform duration-600 ease-out z-20" />

      {/* header */}
      <header className="flex items-center justify-between px-3 pt-2 pb-1.5 border-b border-white/5">
        <span className={`font-mono text-[11px] tracking-wide font-medium ${accent.chip}`}>
          {formatDate(match.date)} · {match.time.replace(" ET", "")}
        </span>
        {isFinal && (
          <span className="text-[10px] font-display tracking-[0.15em] text-amber-300 uppercase">Final</span>
        )}
      </header>

      {/* body */}
      <div className="px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-0">
            <EditableSlot matchId={match.id} side="home" defaultValue={match.home} team={homeTeam} />
          </div>
          <ScoreInput matchId={match.id} side="home" />
        </div>

        <div className="flex items-center gap-2 my-1">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-[9px] font-mono text-white/20 tracking-widest">VS</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-0">
            <EditableSlot matchId={match.id} side="away" defaultValue={match.away} team={awayTeam} />
          </div>
          <ScoreInput matchId={match.id} side="away" />
        </div>
      </div>

      {/* footer */}
      <footer className="px-3 pb-2 pt-1 flex items-center gap-1.5 text-[10px] text-white/55 font-mono">
        <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden className="shrink-0">
          <path d="M5 .5a3.5 3.5 0 0 0-3.5 3.5c0 2.6 3.5 5.5 3.5 5.5s3.5-2.9 3.5-5.5A3.5 3.5 0 0 0 5 .5Zm0 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" fill="currentColor" />
        </svg>
        <span className="truncate">{match.venue}</span>
      </footer>
    </article>
  );
}

export default React.memo(MatchCard);
