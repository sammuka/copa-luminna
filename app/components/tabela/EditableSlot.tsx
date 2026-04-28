"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import type { Team } from "@/app/types";
import { TEAMS } from "@/app/types/teams";
import TeamRow from "./TeamRow";
import TeamFlag from "./TeamFlag";

interface EditableSlotProps {
  matchId: number;
  side: "home" | "away";
  defaultValue: string;
  team?: Team;
}

const STORAGE_NS = "lumina-copa:bracket";

const ALL_TEAMS = Object.values(TEAMS);

function TeamCombobox({
  initialQuery,
  onSelect,
  onCancel,
}: {
  initialQuery: string;
  onSelect: (code: string) => void;
  onCancel: () => void;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [highlightIdx, setHighlightIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const suggestions = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return ALL_TEAMS.slice(0, 6);
    return ALL_TEAMS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.code.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  useEffect(() => {
    setHighlightIdx(0);
  }, [query]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // fecha ao clicar fora
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const root = inputRef.current?.closest("[data-combobox]");
      if (root && !root.contains(e.target as Node)) onCancel();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onCancel]);

  const commit = useCallback(
    (team: Team) => {
      onSelect(team.code);
    },
    [onSelect]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIdx((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (suggestions[highlightIdx]) commit(suggestions[highlightIdx]);
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <div data-combobox className="relative z-50">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full bg-black/60 border border-amber-400/40 rounded px-2 py-1 text-[13px] text-white outline-none placeholder:text-white/30"
        placeholder="Buscar seleção…"
      />
      {suggestions.length > 0 && (
        <ul
          ref={listRef}
          className="absolute left-0 top-full mt-1 w-48 rounded-lg border border-white/10 bg-slate-900/95 backdrop-blur-md shadow-xl py-1 overflow-hidden"
        >
          {suggestions.map((team, idx) => (
            <li key={team.code}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  commit(team);
                }}
                onMouseEnter={() => setHighlightIdx(idx)}
                className={`w-full flex items-center gap-2 px-3 py-1.5 text-left transition-colors ${
                  idx === highlightIdx
                    ? "bg-amber-400/15 text-amber-200"
                    : "text-white/80 hover:bg-white/5"
                }`}
              >
                <TeamFlag team={team} compact />
                <span className="text-[12px] font-medium truncate">{team.name}</span>
                <span className="ml-auto text-[10px] font-mono text-white/30 shrink-0">{team.code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EditableSlot({ matchId, side, defaultValue, team }: EditableSlotProps) {
  const key = `${STORAGE_NS}:${matchId}:${side}`;
  const [override, setOverride] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored !== null) setTimeout(() => setOverride(stored), 0);
  }, [key]);

  const commit = useCallback(
    (code: string) => {
      localStorage.setItem(key, code);
      setOverride(code);
      setEditing(false);
    },
    [key]
  );

  const clear = useCallback(() => {
    localStorage.removeItem(key);
    setOverride(null);
  }, [key]);

  const startEdit = useCallback(() => {
    setEditing(true);
  }, []);

  const cancelEdit = useCallback(() => {
    setEditing(false);
  }, []);

  // time exibido (override ou time original da partida)
  const displayTeam = override ? TEAMS[override] : null;
  const displayCode = override ?? defaultValue;

  if (editing) {
    return (
      <TeamCombobox
        initialQuery={override ? (TEAMS[override]?.name ?? override) : ""}
        onSelect={commit}
        onCancel={cancelEdit}
      />
    );
  }

  if (team && override === null) {
    return (
      <button onClick={startEdit} className="w-full text-left group py-0.5">
        <ul className="list-none m-0 p-0 pointer-events-none">
          <TeamRow team={team} compact />
        </ul>
      </button>
    );
  }

  if (displayTeam) {
    return (
      <button
        onClick={startEdit}
        className="flex items-center justify-between gap-1 w-full group text-left py-1"
      >
        <span className="flex items-center gap-1.5 min-w-0">
          <TeamFlag team={displayTeam} compact />
          <span className="text-[13px] text-white font-medium truncate">{displayTeam.name}</span>
        </span>
        <span
          role="button"
          aria-label="Limpar"
          onClick={(e) => {
            e.stopPropagation();
            clear();
          }}
          className="text-white/30 hover:text-amber-300 transition-colors text-xs shrink-0 opacity-0 group-hover:opacity-100 cursor-pointer px-1"
        >
          ×
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={startEdit}
      className="flex items-center gap-1.5 w-full text-left group py-1"
      aria-label="Editar vencedor"
    >
      <span className="text-white/70 text-[12px] block flex-1 truncate">
        {displayCode}
      </span>
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        aria-hidden="true"
        className="shrink-0 text-white/25 group-hover:text-amber-300/80 transition-colors"
      >
        <path
          d="M7 1l2 2-5.5 5.5L1 9l.5-2.5L7 1z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default React.memo(EditableSlot);
