"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface PdfViewerProps {
  src: string;
  title?: string;
}

export default function PdfViewer({ src, title }: PdfViewerProps) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const blobRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPdf() {
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error("fetch failed");

        const contentLength = Number(res.headers.get("content-length") ?? 0);
        const reader = res.body?.getReader();
        if (!reader) throw new Error("no reader");

        const chunks: Uint8Array<ArrayBuffer>[] = [];
        let received = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (cancelled) return;
          chunks.push(value);
          received += value.length;
          if (contentLength > 0) {
            setProgress(Math.round((received / contentLength) * 100));
          }
        }

        const blob = new Blob(chunks, { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        blobRef.current = url;
        if (!cancelled) {
          setProgress(100);
          setBlobUrl(url);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }

    loadPdf();

    return () => {
      cancelled = true;
      if (blobRef.current) {
        URL.revokeObjectURL(blobRef.current);
        blobRef.current = null;
      }
    };
  }, [src]);

  return (
    <div style={{ backgroundColor: "#051b3a" }}>
      <section
        id="tabela"
        className="scroll-mt-20 py-10 md:py-28 max-w-7xl mx-auto px-6 relative"
      >
        <div className="text-center mb-12 space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Em breve · Cadastros abertos
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl text-gradient-blue">
            Tabela Oficial · Copa do Mundo 2026
          </h2>
          <p className="text-blue-100/90 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Estamos finalizando a plataforma de palpites.{" "}
            <br className="hidden md:block" />
            <span className="text-cyan-300 font-semibold">
              Confira a tabela oficial
            </span>{" "}
            enquanto a experiência interativa fica pronta.
          </p>
        </div>

        <div className="flex gap-4 items-start">
          <div className="flex-1 min-w-0">
            <div className="glass rounded-3xl border border-blue-400/30 shadow-[0_0_80px_rgba(59,130,246,0.25)] p-3 md:p-5 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-accent to-transparent animate-[shimmer_4s_linear_infinite]" />
              </div>

              <div className="absolute top-3 left-3 w-8 h-8 pointer-events-none animate-[pulse-glow_3s_ease-in-out_infinite]">
                <svg viewBox="0 0 32 32" className="text-blue-400/60">
                  <path
                    d="M 0 0 L 0 16 M 0 0 L 16 0"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <div
                className="absolute top-3 right-3 w-8 h-8 pointer-events-none animate-[pulse-glow_3s_ease-in-out_infinite]"
                style={{ animationDelay: "0.75s" }}
              >
                <svg viewBox="0 0 32 32" className="text-blue-400/60">
                  <path
                    d="M 32 0 L 32 16 M 32 0 L 16 0"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <div
                className="absolute bottom-3 left-3 w-8 h-8 pointer-events-none animate-[pulse-glow_3s_ease-in-out_infinite]"
                style={{ animationDelay: "1.5s" }}
              >
                <svg viewBox="0 0 32 32" className="text-blue-400/60">
                  <path
                    d="M 0 32 L 0 16 M 0 32 L 16 32"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <div
                className="absolute bottom-3 right-3 w-8 h-8 pointer-events-none animate-[pulse-glow_3s_ease-in-out_infinite]"
                style={{ animationDelay: "2.25s" }}
              >
                <svg viewBox="0 0 32 32" className="text-blue-400/60">
                  <path
                    d="M 32 32 L 32 16 M 32 32 L 16 32"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Toolbar */}
              <div className="flex items-center justify-between mb-3 px-4 py-2 bg-navy-900/80 rounded-xl border border-blue-400/20">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <div className="w-3 h-3 rounded-full bg-cyan-accent" />
                    <div className="w-3 h-3 rounded-full bg-white/80" />
                  </div>
                  <span className="font-mono text-xs text-blue-300/80 ml-4">
                    tabela-copa-2026.pdf
                  </span>
                </div>
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass px-4 py-2 rounded-full text-xs uppercase tracking-wider text-cyan-accent hover:scale-105 transition-transform"
                >
                  Abrir em nova aba
                </a>
              </div>

              {/* Loading / PDF */}
              {!blobUrl && !error && (
                <div className="w-full h-[55vw] min-h-[280px] md:h-[85vh] rounded-xl flex flex-col items-center justify-center gap-6 bg-navy-900/40">
                  <div className="flex flex-col items-center gap-3 w-64">
                    <div className="flex items-center gap-2 text-blue-300/70 text-sm font-mono">
                      <svg
                        className="animate-spin w-4 h-4 text-cyan-accent"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeDasharray="31.4"
                          strokeDashoffset="10"
                          strokeLinecap="round"
                        />
                      </svg>
                      Carregando PDF… {progress}%
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-blue-900/60 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-accent transition-all duration-200"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="w-full h-[55vw] min-h-[280px] md:h-[85vh] rounded-xl flex flex-col items-center justify-center gap-4 bg-navy-900/40">
                  <p className="text-blue-200">
                    Não foi possível carregar o PDF.
                  </p>
                  <a
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass px-6 py-3 rounded-full text-sm font-medium text-cyan-accent hover:scale-105 transition-transform"
                  >
                    Abrir PDF
                  </a>
                </div>
              )}

              {blobUrl && (
                <object
                  data={`${blobUrl}#view=FitH&toolbar=1&navpanes=0`}
                  type="application/pdf"
                  className="w-full h-[55vw] min-h-[280px] md:h-[85vh] rounded-xl bg-white"
                >
                  <iframe
                    src={`${blobUrl}#view=FitH&toolbar=1&navpanes=0`}
                    className="w-full h-[55vw] min-h-[280px] md:h-[85vh] rounded-xl bg-white"
                    title={title || "PDF Viewer"}
                  >
                    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
                      <p className="text-blue-200">
                        Seu navegador não suporta visualização de PDF integrada.
                      </p>
                      <a
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass px-6 py-3 rounded-full text-sm font-medium text-cyan-accent hover:scale-105 transition-transform"
                      >
                        Abrir PDF
                      </a>
                    </div>
                  </iframe>
                </object>
              )}

              <p className="text-xs text-blue-300/60 text-center mt-4">
                Dica: role dentro do visualizador para navegar pelas 8 fases do
                torneio.
              </p>
            </div>

            <div className="md:hidden flex justify-center mt-6">
              <MascoteVideo />
            </div>
          </div>

          <div
            className="hidden md:block w-52 lg:w-64 shrink-0 sticky"
            style={{ top: "calc(100vh - 300px)" }}
          >
            <MascoteVideo />
          </div>
        </div>

        <footer className="border-t border-blue-400/10 mt-10 px-6 pt-8 pb-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <Image
              src="/assets/luminna-horizontal-branca.png"
              alt="Luminna AI"
              width={100}
              height={25}
              className="opacity-60"
            />
            <p className="text-xs text-blue-300/40 tracking-wide text-center">
              © 2026 Luminna AI · Todos os direitos reservados · Copa do Mundo
              FIFA 26™
            </p>
            <div className="flex items-center gap-4 text-xs text-blue-300/40">
              <span className="hover:text-blue-300/70 transition-colors cursor-pointer">
                Sobre
              </span>
              <span className="hover:text-blue-300/70 transition-colors cursor-pointer">
                Contato
              </span>
              <span className="hover:text-blue-300/70 transition-colors cursor-pointer">
                LinkedIn
              </span>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}

function MascoteVideo() {
  return (
    <div
      className="w-40 md:w-full overflow-hidden"
      style={{
        maxHeight: "270px",
        backgroundColor: "#051b3a",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 80%, transparent 100%)",
        WebkitMaskComposite: "destination-in",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        maskComposite: "intersect",
      }}
    >
      <video
        src="/assets/mascote-embaixadinha.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full object-contain"
        style={{ maxHeight: "260px", mixBlendMode: "screen" }}
      />
    </div>
  );
}
