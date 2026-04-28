import React from "react";
import type { Match } from "@/app/types";
import MatchCard from "./MatchCard";

export type BracketStage = "R32" | "R16" | "QF" | "SF" | "3rd" | "Final";

const STAGGER_DELAY: Record<BracketStage, number> = {
  R32: 0,
  R16: 80,
  QF: 160,
  SF: 240,
  "3rd": 240,
  Final: 320,
};

/** Estilo de tag por fase (pílula com borda e fundo translúcido). */
const STAGE_TAG: Record<BracketStage, string> = {
  R32:   "border-slate-500/35 bg-slate-500/[0.12] text-slate-100",
  R16:   "border-sky-400/35 bg-sky-500/[0.14] text-sky-50",
  QF:    "border-cyan-400/40 bg-cyan-500/[0.14] text-cyan-50",
  SF:    "border-amber-400/45 bg-amber-500/[0.18] text-amber-50",
  "3rd": "border-rose-400/40 bg-rose-500/[0.14] text-rose-50",
  Final: "border-amber-400/50 bg-amber-500/[0.22] text-amber-50",
};

interface BracketColumnProps {
  stage: BracketStage;
  title: string;
  matches: Match[];
  reverse?: boolean;
  registerRef?: (id: string, el: HTMLElement | null) => void;
  showTitle?: boolean;
  featured?: boolean;
  /** Altura total do trilho vertical onde os cards são distribuídos igualmente. */
  railHeight?: number;
}

function BracketColumn({
  stage,
  title,
  matches,
  reverse = false,
  registerRef,
  showTitle = true,
  featured = false,
  railHeight,
}: BracketColumnProps) {
  const colDelay = STAGGER_DELAY[stage];
  const tagStyle = STAGE_TAG[stage];

  return (
    <div className={`flex flex-col ${reverse ? "items-end" : "items-center"} shrink-0`}>
      {showTitle && (
        <h4 className="mb-6">
          <span
            className={`font-display inline-flex items-center justify-center rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] whitespace-nowrap backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${tagStyle} ${
              featured ? "ring-1 ring-amber-300/45" : ""
            }`}
          >
            {title}
          </span>
        </h4>
      )}
      <div
        className="flex flex-col justify-around"
        style={railHeight ? { height: railHeight } : undefined}
      >
        {matches.map((m) => (
          <MatchCard
            key={m.id}
            match={m}
            stage={stage}
            registerRef={registerRef}
            colDelay={colDelay}
            featured={featured}
          />
        ))}
      </div>
    </div>
  );
}

export default BracketColumn;
