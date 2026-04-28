"use client";

import React from "react";
import { GROUPS, resolveMatchTeam } from "@/app/types";
import type { Match, Team } from "@/app/types";
import { GROUP_STAGE_MATCHES } from "@/app/types/matches";
import CornerOrnaments from "./CornerOrnaments";
import TeamFlag from "./TeamFlag";
import ScoreInput from "./ScoreInput";

function parseEtTime(time: string): { hour: number; minute: number } {
  const clean = time.replace(" ET", "").trim().toLowerCase();
  const match = clean.match(/^(\d{1,2})(?::(\d{2}))?(am|pm)$/);
  if (!match) return { hour: 0, minute: 0 };
  let h = parseInt(match[1], 10);
  const m = match[2] ? parseInt(match[2], 10) : 0;
  const period = match[3];
  if (period === "am" && h === 12) h = 0;
  else if (period === "pm" && h !== 12) h += 12;
  return { hour: h, minute: m };
}

function formatLocal(iso: string, time: string): { date: string; time: string } {
  const { hour, minute } = parseEtTime(time);
  // ET in June = EDT (UTC-4); BRT = UTC-3 → +1h
  const d = new Date(iso + "T00:00:00");
  d.setHours(hour + 1, minute, 0, 0);
  const date = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  }).format(d);
  const hh = d.getHours().toString().padStart(2, "0");
  const mm = d.getMinutes();
  const timeStr = mm === 0 ? `${hh}H` : `${hh}H${mm.toString().padStart(2, "0")}`;
  return { date, time: timeStr };
}

function venueCity(venue: string): string {
  const parts = venue.split(",");
  return (parts[parts.length - 1] || venue).trim().toUpperCase();
}

function shortName(team: Team): string {
  const map: Record<string, string> = {
    MEX: "MÉXICO",
    RSA: "ÁFRICA DO S.",
    KOR: "COREIA DO S.",
    CZE: "REP. CHECA",
    CAN: "CANADÁ",
    BIH: "BÓSNIA",
    QAT: "CATAR",
    SUI: "SUÍÇA",
    BRA: "BRASIL",
    MAR: "MARROCOS",
    HAI: "HAITI",
    SCO: "ESCÓCIA",
    USA: "EUA",
    PAR: "PARAGUAI",
    AUS: "AUSTRÁLIA",
    TUR: "TURQUIA",
    GER: "ALEMANHA",
    CUW: "CURAÇAU",
    CIV: "C. DO MARFIM",
    ECU: "EQUADOR",
    NED: "HOLANDA",
    JPN: "JAPÃO",
    SWE: "SUÉCIA",
    TUN: "TUNÍSIA",
    IRN: "IRÃ",
    NZL: "N. ZELÂNDIA",
    BEL: "BÉLGICA",
    EGY: "EGITO",
    ESP: "ESPANHA",
    CPV: "CABO VERDE",
    KSA: "ARÁBIA SAUDITA",
    URU: "URUGUAI",
    FRA: "FRANÇA",
    SEN: "SENEGAL",
    IRQ: "IRAQUE",
    NOR: "NORUEGA",
    ARG: "ARGENTINA",
    ALG: "ARGÉLIA",
    AUT: "ÁUSTRIA",
    JOR: "JORDÂNIA",
    POR: "PORTUGAL",
    COD: "RD CONGO",
    UZB: "UZBEQUISTÃO",
    COL: "COLÔMBIA",
    ENG: "INGLATERRA",
    CRO: "CROÁCIA",
    GHA: "GANA",
    PAN: "PANAMÁ",
  };
  return map[team.code] ?? team.name.toUpperCase();
}

function MatchRow({ match }: { match: Match }) {
  const home = resolveMatchTeam(match.home);
  const away = resolveMatchTeam(match.away);
  const { date, time } = formatLocal(match.date, match.time);

  if (!home || !away) return null;

  return (
    <li className="group/row grid grid-cols-[minmax(0,132px)_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 py-1.5 text-[11px]
                   rounded-md px-1 -mx-1
                   transition-[background-color,color] duration-200
                   hover:bg-cyan-400/[0.06]">
      <span className="font-mono text-white/50 tracking-tight truncate transition-colors duration-200 group-hover/row:text-white/70">
        {date}, {time} · {venueCity(match.venue)}
      </span>

      <div className="flex items-center justify-end gap-1.5 min-w-0">
        <span className="truncate font-semibold text-white/90 tracking-wide transition-colors duration-200 group-hover/row:text-white">
          {shortName(home)}
        </span>
        <TeamFlag team={home} size={16} />
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <ScoreInput matchId={match.id} side="home" />
        <span className="text-white/30 text-[10px] font-mono">×</span>
        <ScoreInput matchId={match.id} side="away" />
      </div>

      <div className="flex items-center gap-1.5 min-w-0">
        <TeamFlag team={away} size={16} />
        <span className="truncate font-semibold text-white/90 tracking-wide transition-colors duration-200 group-hover/row:text-white">
          {shortName(away)}
        </span>
      </div>
    </li>
  );
}

function GroupMatchesCard({
  letter,
  teams,
  matches,
  index,
}: {
  letter: string;
  teams: Team[];
  matches: Match[];
  index: number;
}) {
  return (
    <article
      className="group glass rounded-2xl border border-blue-400/20 p-5 relative overflow-hidden
                 animate-[fade-in-up_0.6s_ease-out_both]
                 transition-[transform,box-shadow,border-color] duration-300 ease-out
                 hover:-translate-y-2
                 hover:border-cyan-400/40
                 hover:shadow-[0_8px_48px_-10px_rgba(34,211,238,0.45),0_0_0_1px_rgba(34,211,238,0.08)_inset]
                 cursor-default"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* shimmer topo sempre visível */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-linear-to-r from-transparent via-cyan-accent to-transparent animate-[shimmer_4s_linear_infinite]" />

      {/* glow radial fundo — aparece no hover */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(34,211,238,0.07),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* gleam diagonal — passa uma vez no hover */}
      <div className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[500%] transition-transform duration-700 ease-out z-10" />

      <header className="relative z-10 mb-3">
        <h3 className="font-display font-black text-3xl text-gradient-blue tracking-widest
                       transition-[text-shadow] duration-300
                       group-hover:[text-shadow:0_0_22px_rgba(34,211,238,0.5)]">
          Grupo {letter}
        </h3>
      </header>

      {/* team strip */}
      <div className="relative z-10 flex flex-wrap items-center gap-x-3 gap-y-1.5 pb-3 mb-2 border-b border-blue-400/15">
        {teams.map((t) => (
          <div key={t.code} className="flex items-center gap-1.5 shrink-0">
            <TeamFlag team={t} size={18} />
            <span className="font-display text-[11px] tracking-wider text-white/85 uppercase">
              {shortName(t)}
            </span>
          </div>
        ))}
      </div>

      <ul className="relative z-10 divide-y divide-blue-400/10">
        {matches.map((m) => (
          <MatchRow key={m.id} match={m} />
        ))}
      </ul>
    </article>
  );
}

export default function GroupMatchesGrid() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-14">
      <CornerOrnaments />
      <div className="grid gap-5 md:gap-7 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {GROUPS.map((g, i) => {
          const matches = GROUP_STAGE_MATCHES.filter((m) => m.group === g.letter);
          return (
            <GroupMatchesCard
              key={g.letter}
              letter={g.letter}
              teams={g.teams}
              matches={matches}
              index={i}
            />
          );
        })}
      </div>
    </section>
  );
}
