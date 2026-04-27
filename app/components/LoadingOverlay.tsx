'use client';

import Image from 'next/image';

interface LoadingOverlayProps {
  fadeOut?: boolean;
}

export default function LoadingOverlay({ fadeOut = false }: LoadingOverlayProps) {
  return (
    <div
      aria-hidden={fadeOut}
      className={`fixed inset-0 z-60 flex flex-col items-center justify-center gap-8 bg-navy-deep transition-opacity duration-700 ease-out ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] max-w-[90vw] max-h-[90vw] bg-blue-500/20 rounded-full blur-3xl animate-[pulse-glow_3s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.6)_70%)]" />
      </div>

      <div className="relative flex flex-col items-center gap-8">
        <Image
          src="/assets/luminna-horizontal-branca.png"
          alt="Luminna AI"
          width={260}
          height={65}
          priority
          style={{ width: '260px', height: 'auto' }}
          className="drop-shadow-[0_0_30px_rgba(59,130,246,0.6)] animate-[float_6s_ease-in-out_infinite]"
        />

        <div className="relative h-[3px] w-56 overflow-hidden rounded-full bg-blue-500/20">
          <div
            className="absolute inset-y-0 w-full animate-[shimmer_1.6s_linear_infinite]"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, var(--cyan-accent) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
            }}
          />
        </div>

        <p className="font-display tracking-[0.35em] text-[0.7rem] md:text-xs text-cyan-accent/80 uppercase">
          Carregando experiência
        </p>
      </div>
    </div>
  );
}
