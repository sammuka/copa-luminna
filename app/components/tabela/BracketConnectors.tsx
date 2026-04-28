"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import type { BracketPair } from "@/app/lib/bracketPairs";

interface PathData {
  d: string;
  dashed: boolean;
  delay: number;
}

interface Props {
  containerRef: RefObject<HTMLElement | null>;
  matchRefsRef: RefObject<Map<string, HTMLElement>>;
  pairs: BracketPair[];
}

function offsetRelativeRect(el: HTMLElement, containerEl: HTMLElement) {
  let left = 0;
  let top = 0;
  let cur: HTMLElement | null = el;
  while (cur && cur !== containerEl) {
    left += cur.offsetLeft;
    top += cur.offsetTop;
    cur = cur.offsetParent as HTMLElement | null;
  }
  return {
    left,
    right: left + el.offsetWidth,
    top,
    bottom: top + el.offsetHeight,
    midY: top + el.offsetHeight / 2,
  };
}

export default function BracketConnectors({ containerRef, matchRefsRef, pairs }: Props) {
  const [paths, setPaths] = useState<PathData[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const computedRef = useRef(false);

  function compute() {
    const container = containerRef.current;
    if (!container) return;

    const w = container.scrollWidth;
    const h = container.scrollHeight;

    const newPaths: PathData[] = [];
    let delayIndex = 0;

    const matchRefs = matchRefsRef.current;
    if (!matchRefs) return;

    for (const pair of pairs) {
      const tgtEl = matchRefs.get(pair.target);
      if (!tgtEl) continue;
      const tgt = offsetRelativeRect(tgtEl, container);

      for (const srcId of pair.sources) {
        const srcEl = matchRefs.get(srcId);
        if (!srcEl) continue;
        const src = offsetRelativeRect(srcEl, container);

        // Escolhe as bordas "voltadas" uma para a outra: se o src está à
        // esquerda do tgt, usamos src.right → tgt.left; se está à direita
        // (metade direita do chaveamento), usamos src.left → tgt.right.
        const srcCenter = (src.left + src.right) / 2;
        const tgtCenter = (tgt.left + tgt.right) / 2;
        const srcX = srcCenter < tgtCenter ? src.right : src.left;
        const tgtX = srcCenter < tgtCenter ? tgt.left : tgt.right;

        const midX = srcX + (tgtX - srcX) / 2;
        const d = `M ${srcX} ${src.midY} H ${midX} V ${tgt.midY} H ${tgtX}`;

        newPaths.push({ d, dashed: pair.dashed ?? false, delay: delayIndex * 0.06 });
        delayIndex++;
      }
    }

    setPaths(newPaths);
    setSize({ w, h });
    computedRef.current = true;
  }

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    compute();

    const ro = new ResizeObserver(() => compute());
    ro.observe(container);
    return () => ro.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pairs, matchRefsRef]);

  if (size.w === 0 || size.h === 0) return null;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={size.w}
      height={size.h}
      viewBox={`0 0 ${size.w} ${size.h}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bracketGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="bracketGradientDashed" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fb7185" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#fb7185" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          stroke={p.dashed ? "url(#bracketGradientDashed)" : "url(#bracketGradient)"}
          strokeWidth={1.5}
          strokeDasharray={p.dashed ? "5 4" : undefined}
          fill="none"
          className="bracket-line-draw"
          style={{ animationDelay: `${p.delay}s` }}
        />
      ))}
    </svg>
  );
}
