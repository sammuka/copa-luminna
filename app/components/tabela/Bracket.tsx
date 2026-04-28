"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ROUND_OF_32_MATCHES,
  ROUND_OF_16_MATCHES,
  QUARTER_FINAL_MATCHES,
  SEMI_FINAL_MATCHES,
  THIRD_PLACE_MATCH,
  FINAL_MATCH,
} from "@/app/types/matches";
import {
  R32_LEFT,
  R32_RIGHT,
  R16_LEFT,
  R16_RIGHT,
  QF_LEFT,
  QF_RIGHT,
  getMatchesByIds,
} from "@/app/lib/bracketSides";
import { buildBracketPairs } from "@/app/lib/bracketPairs";
import CornerOrnaments from "./CornerOrnaments";
import BracketColumn from "./BracketColumn";
import BracketConnectors from "./BracketConnectors";
import ZoomPanContainer from "./ZoomPanContainer";
import BracketMobile from "./BracketMobile";

const ALL_MATCHES = [
  ...ROUND_OF_32_MATCHES,
  ...ROUND_OF_16_MATCHES,
  ...QUARTER_FINAL_MATCHES,
  ...SEMI_FINAL_MATCHES,
  THIRD_PLACE_MATCH,
  FINAL_MATCH,
];

const STORAGE_NS = "lumina-copa:bracket";
const BRACKET_PAIRS = buildBracketPairs();

// Altura do "trilho" vertical no qual cada coluna distribui seus cards com
// justify-around. Como todas as colunas compartilham o mesmo trilho, cada
// card da rodada seguinte fica centralizado entre seu par de origem:
//   R32 (8)  → midpoints em H/16, 3H/16, ...
//   R16 (4)  → midpoints em H/8, 3H/8, ...   (exatamente a média dos pares R32)
//   QF  (2)  → midpoints em H/4, 3H/4
//   SF  (1)  → midpoint em H/2
//   Final    → H/2 (entre as duas semis)
// Mantido compacto o suficiente para caber em viewports ~1080p sem que o
// fit-to-viewport inicial aplique scale < 1 (que rasteriza o conteúdo em
// bitmap e borra o texto). Se a tela for menor, o usuário ainda pode dar
// zoom manualmente.
const RAIL_HEIGHT = 960;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return isMobile;
}

export default function Bracket() {
  const isMobile = useIsMobile();

  const r32Left  = getMatchesByIds(R32_LEFT,  ALL_MATCHES);
  const r32Right = getMatchesByIds(R32_RIGHT, ALL_MATCHES);
  const r16Left  = getMatchesByIds(R16_LEFT,  ALL_MATCHES);
  const r16Right = getMatchesByIds(R16_RIGHT, ALL_MATCHES);
  const qfLeft   = getMatchesByIds(QF_LEFT,   ALL_MATCHES);
  const qfRight  = getMatchesByIds(QF_RIGHT,  ALL_MATCHES);

  const matchRefsMap = useRef<Map<string, HTMLElement>>(new Map());
  const innerContainerRef = useRef<HTMLDivElement>(null);

  const registerRef = useCallback((id: string, el: HTMLElement | null) => {
    if (el) matchRefsMap.current.set(id, el);
    else matchRefsMap.current.delete(id);
  }, []);

  const resetBracket = useCallback(() => {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith(STORAGE_NS));
    keys.forEach((k) => localStorage.removeItem(k));
    window.location.reload();
  }, []);

  if (isMobile) {
    return (
      <section className="relative min-h-[calc(100vh-56px)]">
        <CornerOrnaments />
        <BracketMobile />
        <div className="flex justify-center pb-6">
          <button
            onClick={resetBracket}
            className="text-[11px] text-white/40 hover:text-amber-300 transition-colors border border-white/10 hover:border-amber-400/40 rounded-full px-4 py-1.5 font-mono"
          >
            resetar bracket
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex flex-col" style={{ height: "calc(100vh - 120px)" }}>
      <CornerOrnaments />

      <div className="flex-1 min-h-0">
        <ZoomPanContainer minScale={0.25} maxScale={2.5}>
          <div
            ref={innerContainerRef}
            className="relative flex gap-14 px-10 py-8 items-start"
          >
            <BracketConnectors
              containerRef={innerContainerRef}
              matchRefsRef={matchRefsMap}
              pairs={BRACKET_PAIRS}
            />

            {/* LADO ESQUERDO */}
            <BracketColumn stage="R32" title="Segunda Fase"     matches={r32Left} registerRef={registerRef} railHeight={RAIL_HEIGHT} />
            <BracketColumn stage="R16" title="Oitavas de Final" matches={r16Left} registerRef={registerRef} railHeight={RAIL_HEIGHT} />
            <BracketColumn stage="QF"  title="Quartas de Final" matches={qfLeft}  registerRef={registerRef} railHeight={RAIL_HEIGHT} />
            <BracketColumn
              stage="SF"
              title="Semifinal 1"
              matches={[SEMI_FINAL_MATCHES[0]]}
              registerRef={registerRef}
              railHeight={RAIL_HEIGHT}
              featured
            />

            {/* CENTRO — Final fica centrada verticalmente no trilho (entre as semis),
                3º Lugar logo abaixo */}
            <div
              className="flex flex-col items-center shrink-0 z-10"
              style={{ height: RAIL_HEIGHT }}
            >
              <div className="flex-1 flex items-center justify-center">
                <BracketColumn
                  stage="Final"
                  title="Grande Final"
                  matches={[FINAL_MATCH]}
                  registerRef={registerRef}
                  featured
                />
              </div>
              <div className="flex-1 flex items-start justify-center pt-10">
                <BracketColumn
                  stage="3rd"
                  title="3º Lugar"
                  matches={[THIRD_PLACE_MATCH]}
                  registerRef={registerRef}
                />
              </div>
            </div>

            {/* LADO DIREITO */}
            <BracketColumn
              stage="SF"
              title="Semifinal 2"
              matches={[SEMI_FINAL_MATCHES[1]]}
              reverse
              registerRef={registerRef}
              railHeight={RAIL_HEIGHT}
            />
            <BracketColumn stage="QF"  title="Quartas de Final" matches={qfRight}  reverse registerRef={registerRef} railHeight={RAIL_HEIGHT} />
            <BracketColumn stage="R16" title="Oitavas de Final" matches={r16Right} reverse registerRef={registerRef} railHeight={RAIL_HEIGHT} />
            <BracketColumn stage="R32" title="Segunda Fase"     matches={r32Right} reverse registerRef={registerRef} railHeight={RAIL_HEIGHT} />
          </div>
        </ZoomPanContainer>
      </div>

      <div className="flex justify-center py-3 shrink-0">
        <button
          onClick={resetBracket}
          className="text-[11px] text-white/40 hover:text-amber-300 transition-colors border border-white/10 hover:border-amber-400/40 rounded-full px-4 py-1.5 font-mono"
        >
          resetar bracket
        </button>
      </div>
    </section>
  );
}
