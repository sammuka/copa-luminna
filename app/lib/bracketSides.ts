import type { Match } from "@/app/types";

// Agrupamento por árvore de dependência de cada semi-final:
//
// SF1 (m101) ← QF[97, 98]
//   m97 ← R16[89, 90]
//     m89 ← R32[74, 77]
//     m90 ← R32[73, 75]
//   m98 ← R16[93, 94]
//     m93 ← R32[83, 84]
//     m94 ← R32[81, 82]
//
// SF2 (m102) ← QF[99, 100]
//   m99 ← R16[91, 92]
//     m91 ← R32[76, 78]
//     m92 ← R32[79, 80]
//   m100 ← R16[95, 96]
//     m95 ← R32[86, 88]
//     m96 ← R32[85, 87]
export const R32_LEFT  = [74, 77, 73, 75, 83, 84, 81, 82];
export const R32_RIGHT = [76, 78, 79, 80, 86, 88, 85, 87];
export const R16_LEFT  = [89, 90, 93, 94];
export const R16_RIGHT = [91, 92, 95, 96];
export const QF_LEFT   = [97, 98];
export const QF_RIGHT  = [99, 100];

export function getMatchesByIds(ids: number[], all: Match[]): Match[] {
  return ids.map((id) => all.find((m) => m.id === id)!).filter(Boolean);
}
