import type { Team } from './interfaces';

/**
 * A registry of all participating teams keyed by their three‑letter
 * country codes. This map centralises team metadata to make it easy
 * to update names or add additional properties in the future without
 * touching the schedule definitions. Only fixed (non‑variable)
 * information is included here.
 */
export const TEAMS: Record<string, Team> = {
  // Group A
  MEX: { code: 'MEX', name: 'México', flag: '🇲🇽' },
  RSA: { code: 'RSA', name: 'África do Sul', flag: '🇿🇦' },
  KOR: { code: 'KOR', name: 'Coreia do Sul', flag: '🇰🇷' },
  CZE: { code: 'CZE', name: 'Tchéquia', flag: '🇨🇿' },

  // Group B
  CAN: { code: 'CAN', name: 'Canadá', flag: '🇨🇦' },
  BIH: { code: 'BIH', name: 'Bósnia e Herzegovina', flag: '🇧🇦' },
  QAT: { code: 'QAT', name: 'Catar', flag: '🇶🇦' },
  SUI: { code: 'SUI', name: 'Suíça', flag: '🇨🇭' },

  // Group C
  BRA: { code: 'BRA', name: 'Brasil', flag: '🇧🇷' },
  MAR: { code: 'MAR', name: 'Marrocos', flag: '🇲🇦' },
  HAI: { code: 'HAI', name: 'Haiti', flag: '🇭🇹' },
  SCO: { code: 'SCO', name: 'Escócia', flag: '🏴' },

  // Group D
  USA: { code: 'USA', name: 'Estados Unidos', flag: '🇺🇸' },
  PAR: { code: 'PAR', name: 'Paraguai', flag: '🇵🇾' },
  AUS: { code: 'AUS', name: 'Austrália', flag: '🇦🇺' },
  TUR: { code: 'TUR', name: 'Turquia', flag: '🇹🇷' },

  // Group E
  GER: { code: 'GER', name: 'Alemanha', flag: '🇩🇪' },
  CUW: { code: 'CUW', name: 'Curaçao', flag: '🇨🇼' },
  CIV: { code: 'CIV', name: 'Costa do Marfim', flag: '🇨🇮' },
  ECU: { code: 'ECU', name: 'Equador', flag: '🇪🇨' },

  // Group F
  NED: { code: 'NED', name: 'Países Baixos', flag: '🇳🇱' },
  JPN: { code: 'JPN', name: 'Japão', flag: '🇯🇵' },
  SWE: { code: 'SWE', name: 'Suécia', flag: '🇸🇪' },
  TUN: { code: 'TUN', name: 'Tunísia', flag: '🇹🇳' },

  // Group G
  IRN: { code: 'IRN', name: 'Irã', flag: '🇮🇷' },
  NZL: { code: 'NZL', name: 'Nova Zelândia', flag: '🇳🇿' },
  BEL: { code: 'BEL', name: 'Bélgica', flag: '🇧🇪' },
  EGY: { code: 'EGY', name: 'Egito', flag: '🇪🇬' },

  // Group H
  ESP: { code: 'ESP', name: 'Espanha', flag: '🇪🇸' },
  CPV: { code: 'CPV', name: 'Cabo Verde', flag: '🇨🇻' },
  KSA: { code: 'KSA', name: 'Arábia Saudita', flag: '🇸🇦' },
  URU: { code: 'URU', name: 'Uruguai', flag: '🇺🇾' },

  // Group I
  FRA: { code: 'FRA', name: 'França', flag: '🇫🇷' },
  SEN: { code: 'SEN', name: 'Senegal', flag: '🇸🇳' },
  IRQ: { code: 'IRQ', name: 'Iraque', flag: '🇮🇶' },
  NOR: { code: 'NOR', name: 'Noruega', flag: '🇳🇴' },

  // Group J
  ARG: { code: 'ARG', name: 'Argentina', flag: '🇦🇷' },
  ALG: { code: 'ALG', name: 'Argélia', flag: '🇩🇿' },
  AUT: { code: 'AUT', name: 'Áustria', flag: '🇦🇹' },
  JOR: { code: 'JOR', name: 'Jordânia', flag: '🇯🇴' },

  // Group K
  POR: { code: 'POR', name: 'Portugal', flag: '🇵🇹' },
  COD: { code: 'COD', name: 'República Democrática do Congo', flag: '🇨🇩' },
  UZB: { code: 'UZB', name: 'Uzbequistão', flag: '🇺🇿' },
  COL: { code: 'COL', name: 'Colômbia', flag: '🇨🇴' },

  // Group L
  ENG: { code: 'ENG', name: 'Inglaterra', flag: '🏴' },
  CRO: { code: 'CRO', name: 'Croácia', flag: '🇭🇷' },
  GHA: { code: 'GHA', name: 'Gana', flag: '🇬🇭' },
  PAN: { code: 'PAN', name: 'Panamá', flag: '🇵🇦' },
};

/** Resolve time por código FIFA ou pelo nome exibível (ex.: dados de partida em pt-BR). */
export function resolveMatchTeam(ref: string): Team | undefined {
  const byCode = TEAMS[ref];
  if (byCode) return byCode;
  return Object.values(TEAMS).find((t) => t.name === ref);
}