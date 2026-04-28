interface CornerOrnamentProps {
  className?: string;
  size?: number;
}

const CORNERS = [
  { pos: "top-3 left-3", path: "M 0 0 L 0 16 M 0 0 L 16 0", delay: undefined },
  { pos: "top-3 right-3", path: "M 32 0 L 32 16 M 32 0 L 16 0", delay: "0.75s" },
  { pos: "bottom-3 left-3", path: "M 0 32 L 0 16 M 0 32 L 16 32", delay: "1.5s" },
  { pos: "bottom-3 right-3", path: "M 32 32 L 32 16 M 32 32 L 16 32", delay: "2.25s" },
];

export default function CornerOrnaments({ className, size = 32 }: CornerOrnamentProps) {
  return (
    <div className={`pointer-events-none absolute inset-0${className ? ` ${className}` : ""}`}>
      {CORNERS.map(({ pos, path, delay }) => (
        <div
          key={pos}
          className={`absolute ${pos} pointer-events-none animate-[pulse-glow_3s_ease-in-out_infinite]`}
          style={{ width: size, height: size, animationDelay: delay }}
        >
          <svg viewBox="0 0 32 32" className="text-blue-400/60">
            <path d={path} stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>
      ))}
    </div>
  );
}
