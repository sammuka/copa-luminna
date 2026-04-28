"use client";

import React from "react";
import type { Team } from "@/app/types";
import TeamFlag from "./TeamFlag";

interface TeamRowProps {
  team: Team;
  compact?: boolean;
}

function TeamRow({ team, compact = false }: TeamRowProps) {
  return (
    <li className="flex items-center gap-2 py-1">
      <TeamFlag team={team} compact={compact} />
      <span className="flex-1 truncate font-medium text-[13px] text-white/95">{team.name}</span>
      <span className="text-white/55 font-mono text-[10px] tracking-wide">{team.code}</span>
    </li>
  );
}

export default React.memo(TeamRow);
