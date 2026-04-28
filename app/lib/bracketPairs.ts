import {
  ROUND_OF_16_MATCHES,
  QUARTER_FINAL_MATCHES,
  SEMI_FINAL_MATCHES,
  FINAL_MATCH,
} from "@/app/types/matches";
import type { Match } from "@/app/types";

export interface BracketPair {
  sources: string[];
  target: string;
  dashed?: boolean;
}

function extractWinnerIds(match: Match): string[] {
  const pattern = /Vencedor da partida (\d+)/g;
  const ids: string[] = [];
  let m: RegExpExecArray | null;
  for (const field of [match.home, match.away]) {
    pattern.lastIndex = 0;
    m = pattern.exec(field);
    if (m) ids.push(`m${m[1]}`);
  }
  return ids;
}

export function buildBracketPairs(): BracketPair[] {
  const pairs: BracketPair[] = [];

  for (const match of [
    ...ROUND_OF_16_MATCHES,
    ...QUARTER_FINAL_MATCHES,
    ...SEMI_FINAL_MATCHES,
    FINAL_MATCH,
  ]) {
    const sources = extractWinnerIds(match);
    if (sources.length > 0) {
      pairs.push({ sources, target: `m${match.id}` });
    }
  }

  // 3rd place receives losers of both semi-finals (special dashed connector)
  pairs.push({ sources: ["m101", "m102"], target: "m103", dashed: true });

  return pairs;
}
