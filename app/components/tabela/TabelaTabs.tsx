"use client";

import { useRef } from "react";

type Tab = "groups" | "bracket" | "matches";

interface TabelaTabsProps {
  value: Tab;
  onChange: (v: Tab) => void;
}

const TABS: { id: Tab; label: string }[] = [
  { id: "matches", label: "Jogos" },
  { id: "bracket", label: "Chaveamento" },
  { id: "groups", label: "Grupos" },
];

export default function TabelaTabs({ value, onChange }: TabelaTabsProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === "ArrowRight") {
      const next = (index + 1) % TABS.length;
      onChange(TABS[next].id);
      refs.current[next]?.focus();
    } else if (e.key === "ArrowLeft") {
      const prev = (index - 1 + TABS.length) % TABS.length;
      onChange(TABS[prev].id);
      refs.current[prev]?.focus();
    }
  }

  return (
    <div
      role="tablist"
      aria-label="Seções da tabela"
      className="relative flex gap-8 md:gap-12"
    >
      {TABS.map((tab, i) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={value === tab.id}
          tabIndex={value === tab.id ? 0 : -1}
          ref={(el) => {
            refs.current[i] = el;
          }}
          onClick={() => onChange(tab.id)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={[
            "relative pb-2 font-display tracking-[0.25em] uppercase text-[11px] md:text-xs transition-colors duration-200",
            value === tab.id
              ? "text-white"
              : "text-blue-300/60 hover:text-blue-300/90",
          ].join(" ")}
        >
          {tab.label}

          {/* sliding underline */}
          <span
            className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-cyan-accent/80 shadow-[0_0_12px_var(--cyan-accent)] transition-all duration-300"
            style={{ opacity: value === tab.id ? 1 : 0 }}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}
