"use client";

import React from "react";
import ReactCountryFlag from "react-country-flag";
import { getFlagPropsForCode } from "@/app/lib/fifaToIso";
import type { Team } from "@/app/types";

interface TeamFlagProps {
  team: Team;
  /** Lista padrão: 22×16; compact: 18×13 (slots e combobox). */
  compact?: boolean;
  /** Se definido, largura fixa e altura proporcional (ex.: grid de jogos). */
  size?: number;
}

/** Bandeira SVG (ISO-2 via FIFA) ou emoji quando não há mapeamento (ex.: ENG, SCO). */
export default function TeamFlag({ team, compact = false, size }: TeamFlagProps) {
  const { iso2, emojiFallback } = getFlagPropsForCode(team.code, team.flag);

  let width: number;
  let height: number;
  if (size != null) {
    width = size;
    height = Math.round(size * 0.72);
  } else if (compact) {
    width = 18;
    height = 13;
  } else {
    width = 22;
    height = 16;
  }

  if (iso2) {
    return (
      <ReactCountryFlag
        countryCode={iso2}
        svg
        style={{
          width,
          height,
          borderRadius: 2,
          boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
          flexShrink: 0,
        }}
        title={team.name}
      />
    );
  }

  return (
    <span className={`leading-none shrink-0 ${size != null ? "text-sm" : "text-base"}`}>
      {emojiFallback}
    </span>
  );
}
