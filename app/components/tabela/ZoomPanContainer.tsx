"use client";

import {
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

interface Props {
  children: ReactNode;
  minScale?: number;
  maxScale?: number;
}

export default function ZoomPanContainer({
  children,
  minScale = 0.35,
  maxScale = 2.5,
}: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Mutable refs — não disparam re-render
  const scaleRef = useRef(1);
  const txRef = useRef(0);
  const tyRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Ponteiros ativos para pinch
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchInitialDistRef = useRef<number | null>(null);
  const pinchInitialScaleRef = useRef(1);
  const pinchMidpointRef = useRef({ x: 0, y: 0 });

  // Drag
  const dragStartRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const [scaleDisplay, setScaleDisplay] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  // ── Aplica a transformação no DOM via rAF ──────────────────────────────────
  const apply = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!innerRef.current) return;
      const s = scaleRef.current;
      // Arredonda translações para inteiros para evitar sub-pixel blur em texto.
      const tx = Math.round(txRef.current);
      const ty = Math.round(tyRef.current);
      // Snap da escala quando muito próxima de 1 (renderização nítida sem bitmap).
      const snapped = Math.abs(s - 1) < 0.005 ? 1 : s;
      innerRef.current.style.transform =
        snapped === 1
          ? `translate3d(${tx}px, ${ty}px, 0)`
          : `translate3d(${tx}px, ${ty}px, 0) scale(${snapped})`;
    });
  }, []);

  const clampScale = useCallback(
    (s: number) => Math.min(Math.max(s, minScale), maxScale),
    [minScale, maxScale]
  );

  // ── Clamp pan: conteúdo nunca sai mais de 20% além da borda ──────────────
  const clampPan = useCallback((tx: number, ty: number, s: number) => {
    if (!outerRef.current || !innerRef.current) return { tx, ty };
    const ow = outerRef.current.clientWidth;
    const oh = outerRef.current.clientHeight;
    const cw = innerRef.current.scrollWidth * s;
    const ch = innerRef.current.scrollHeight * s;
    const overX = Math.max(ow, cw) * 0.2;
    const overY = Math.max(oh, ch) * 0.2;
    const minTx = -(cw - ow) - overX;
    const maxTx = overX;
    const minTy = -(ch - oh) - overY;
    const maxTy = overY;
    return {
      tx: Math.min(Math.max(tx, minTx), maxTx),
      ty: Math.min(Math.max(ty, minTy), maxTy),
    };
  }, []);

  // ── Zoom centrado num ponto (cx, cy) em coords viewport ───────────────────
  const zoomAt = useCallback(
    (cx: number, cy: number, factor: number) => {
      if (!outerRef.current) return;
      const rect = outerRef.current.getBoundingClientRect();
      const ox = cx - rect.left;
      const oy = cy - rect.top;

      const oldS = scaleRef.current;
      const newS = clampScale(oldS * factor);

      // Ponto no espaço do conteúdo deve permanecer fixo
      const contentX = (ox - txRef.current) / oldS;
      const contentY = (oy - tyRef.current) / oldS;

      const newTx = ox - contentX * newS;
      const newTy = oy - contentY * newS;

      const clamped = clampPan(newTx, newTy, newS);
      scaleRef.current = newS;
      txRef.current = clamped.tx;
      tyRef.current = clamped.ty;
      apply();
      setScaleDisplay(newS);
    },
    [clampScale, clampPan, apply]
  );

  // ── Fit to viewport ────────────────────────────────────────────────────────
  const fitToViewport = useCallback(() => {
    if (!outerRef.current || !innerRef.current) return;
    const ow = outerRef.current.clientWidth;
    const oh = outerRef.current.clientHeight;
    const iw = innerRef.current.scrollWidth;
    const ih = innerRef.current.scrollHeight;
    if (iw === 0 || ih === 0) return;

    const s = clampScale(Math.min(ow / iw, oh / ih, 1));
    const tx = (ow - iw * s) / 2;
    const ty = (oh - ih * s) / 2;

    scaleRef.current = s;
    txRef.current = tx;
    tyRef.current = ty;
    apply();
    setScaleDisplay(s);
  }, [clampScale, apply]);

  // ── Fit inicial ───────────────────────────────────────────────────────────
  useLayoutEffect(() => {
    fitToViewport();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Wheel ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        // Zoom no cursor
        const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
        zoomAt(e.clientX, e.clientY, factor);
      } else {
        // Pan
        const newTx = txRef.current - e.deltaX;
        const newTy = tyRef.current - e.deltaY;
        const clamped = clampPan(newTx, newTy, scaleRef.current);
        txRef.current = clamped.tx;
        tyRef.current = clamped.ty;
        apply();
      }
    };

    outer.addEventListener("wheel", onWheel, { passive: false });
    return () => outer.removeEventListener("wheel", onWheel);
  }, [zoomAt, clampPan, apply]);

  // ── Pointer (drag + pinch) ────────────────────────────────────────────────
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!outerRef.current) return;

      // Ignora cliques em elementos interativos (inputs, botões, links)
      // para permitir edição dos cards sem interferir com drag/zoom.
      const target = e.target as HTMLElement | null;
      if (target && target.closest("input, button, a, [contenteditable='true']")) {
        return;
      }

      outerRef.current.setPointerCapture(e.pointerId);
      pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointersRef.current.size === 1) {
        dragStartRef.current = {
          x: e.clientX,
          y: e.clientY,
          tx: txRef.current,
          ty: tyRef.current,
        };
        setIsDragging(true);
      } else if (pointersRef.current.size === 2) {
        // Inicia pinch
        const pts = [...pointersRef.current.values()];
        const dx = pts[1].x - pts[0].x;
        const dy = pts[1].y - pts[0].y;
        pinchInitialDistRef.current = Math.hypot(dx, dy);
        pinchInitialScaleRef.current = scaleRef.current;
        pinchMidpointRef.current = {
          x: (pts[0].x + pts[1].x) / 2,
          y: (pts[0].y + pts[1].y) / 2,
        };
      }
    },
    []
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!pointersRef.current.has(e.pointerId)) return;
      pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointersRef.current.size === 1) {
        // Drag
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;
        const newTx = dragStartRef.current.tx + dx;
        const newTy = dragStartRef.current.ty + dy;
        const clamped = clampPan(newTx, newTy, scaleRef.current);
        txRef.current = clamped.tx;
        tyRef.current = clamped.ty;
        apply();
      } else if (pointersRef.current.size === 2 && pinchInitialDistRef.current !== null) {
        // Pinch
        const pts = [...pointersRef.current.values()];
        const dx = pts[1].x - pts[0].x;
        const dy = pts[1].y - pts[0].y;
        const dist = Math.hypot(dx, dy);
        const factor = dist / pinchInitialDistRef.current;
        const newS = clampScale(pinchInitialScaleRef.current * factor);

        const mid = pinchMidpointRef.current;
        if (!outerRef.current) return;
        const rect = outerRef.current.getBoundingClientRect();
        const ox = mid.x - rect.left;
        const oy = mid.y - rect.top;
        const contentX = (ox - txRef.current) / scaleRef.current;
        const contentY = (oy - tyRef.current) / scaleRef.current;
        const newTx = ox - contentX * newS;
        const newTy = oy - contentY * newS;
        const clamped = clampPan(newTx, newTy, newS);

        scaleRef.current = newS;
        txRef.current = clamped.tx;
        tyRef.current = clamped.ty;
        apply();
        setScaleDisplay(newS);
      }
    },
    [clampPan, clampScale, apply]
  );

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size === 0) {
      setIsDragging(false);
    }
    if (pointersRef.current.size < 2) {
      pinchInitialDistRef.current = null;
    }
  }, []);

  // ── Botões de controle ────────────────────────────────────────────────────
  const zoomCenter = useCallback(
    (factor: number) => {
      if (!outerRef.current) return;
      const rect = outerRef.current.getBoundingClientRect();
      zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, factor);
    },
    [zoomAt]
  );

  return (
    <div className="relative w-full h-full">
      {/* Viewport */}
      <div
        ref={outerRef}
        className="w-full h-full overflow-hidden touch-none select-none"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Camada transformada */}
        <div
          ref={innerRef}
          className="inline-block"
          style={{
            transformOrigin: "0 0",
            // will-change permanente força rasterização em bitmap na GPU,
            // o que borra texto e bordas quando a escala != 1. Ativamos
            // somente durante drag/pinch para manter 60fps na interação
            // e re-rasterizar nitidamente quando parado.
            willChange: isDragging ? "transform" : "auto",
            backfaceVisibility: "hidden",
          }}
        >
          {children}
        </div>
      </div>

      {/* Overlay de botões */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
        <span className="text-xs font-mono text-blue-300/60 tabular-nums w-10 text-right">
          {Math.round(scaleDisplay * 100)}%
        </span>
        <button
          aria-label="Diminuir zoom"
          onClick={() => zoomCenter(1 / 1.2)}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold
                     bg-black/40 backdrop-blur border border-blue-400/20
                     text-blue-300/70 hover:text-blue-300 hover:border-blue-400/50
                     transition-colors"
        >
          −
        </button>
        <button
          aria-label="Aumentar zoom"
          onClick={() => zoomCenter(1.2)}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold
                     bg-black/40 backdrop-blur border border-blue-400/20
                     text-blue-300/70 hover:text-blue-300 hover:border-blue-400/50
                     transition-colors"
        >
          +
        </button>
        <button
          aria-label="Ajustar à tela"
          onClick={fitToViewport}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-base
                     bg-black/40 backdrop-blur border border-blue-400/20
                     text-blue-300/70 hover:text-blue-300 hover:border-blue-400/50
                     transition-colors"
        >
          ⤢
        </button>
      </div>
    </div>
  );
}
