"use client";

import React from "react";
import type { Group } from "@/app/types";
import TeamRow from "./TeamRow";

interface GroupCardProps {
  group: Group;
  index: number;
}

function GroupCard({ group, index }: GroupCardProps) {
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
      <div className="pointer-events-none absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[350%] transition-transform duration-700 ease-out z-10" />

      <header className="relative z-10 flex items-baseline justify-between mb-4">
        <h3 className="font-display font-black text-3xl text-gradient-blue tracking-widest
                       transition-[text-shadow] duration-300
                       group-hover:[text-shadow:0_0_22px_rgba(34,211,238,0.5)]">
          Grupo {group.letter}
        </h3>
        <span className="text-blue-300/50 text-xs font-mono transition-colors duration-300 group-hover:text-cyan-300/70">
          4 times
        </span>
      </header>

      <ul className="relative z-10 space-y-0.5 divide-y divide-blue-400/10">
        {group.teams.map((t) => (
          <TeamRow key={t.code} team={t} />
        ))}
      </ul>
    </article>
  );
}

export default React.memo(GroupCard);
