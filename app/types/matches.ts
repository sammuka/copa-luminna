import type { Match } from './interfaces';

/**
 * Every game in the 2026 World Cup group stage.  Matches are ordered
 * sequentially and given unique identifiers (1–72) to align with
 * conventional tournament numbering.  Dates are provided in ISO
 * 8601 format assuming all games take place in 2026.  Kick‑off times
 * reflect the organiser’s published Eastern Time schedule and are
 * intentionally kept as strings to allow simple edits if the time
 * window changes.  Team codes correspond to those defined in
 * teams.ts.
 */
export const GROUP_STAGE_MATCHES: Match[] = [
  // Group A
  { id: 1, stage: 'Fase de grupos', group: 'A', date: '2026-06-11', time: '3pm ET', venue: 'Estadio Azteca, Mexico City', home: 'México', away: 'África do Sul' },
  { id: 2, stage: 'Fase de grupos', group: 'A', date: '2026-06-11', time: '10pm ET', venue: 'Estadio Akron, Guadalajara', home: 'Coreia do Sul', away: 'Tchéquia' },
  { id: 3, stage: 'Fase de grupos', group: 'A', date: '2026-06-18', time: '12pm ET', venue: 'Mercedes-Benz Stadium, Atlanta', home: 'Tchéquia', away: 'África do Sul' },
  { id: 4, stage: 'Fase de grupos', group: 'A', date: '2026-06-18', time: '9pm ET', venue: 'Estadio Akron, Guadalajara', home: 'México', away: 'Coreia do Sul' },
  { id: 5, stage: 'Fase de grupos', group: 'A', date: '2026-06-24', time: '9pm ET', venue: 'Estadio Azteca, Mexico City', home: 'Tchéquia', away: 'México' },
  { id: 6, stage: 'Fase de grupos', group: 'A', date: '2026-06-24', time: '9pm ET', venue: 'Estadio BBVA, Monterrey', home: 'África do Sul', away: 'Coreia do Sul' },

  // Group B
  { id: 7, stage: 'Fase de grupos', group: 'B', date: '2026-06-12', time: '3pm ET', venue: 'BMO Field, Toronto', home: 'Canadá', away: 'Bósnia e Herzegovina' },
  { id: 8, stage: 'Fase de grupos', group: 'B', date: '2026-06-13', time: '3pm ET', venue: 'Levi’s Stadium, San Francisco Bay Area', home: 'Catar', away: 'Suíça' },
  { id: 9, stage: 'Fase de grupos', group: 'B', date: '2026-06-18', time: '3pm ET', venue: 'SoFi Stadium, Los Angeles', home: 'Suíça', away: 'Bósnia e Herzegovina' },
  { id: 10, stage: 'Fase de grupos', group: 'B', date: '2026-06-18', time: '6pm ET', venue: 'BC Place, Vancouver', home: 'Canadá', away: 'Catar' },
  { id: 11, stage: 'Fase de grupos', group: 'B', date: '2026-06-24', time: '3pm ET', venue: 'BC Place, Vancouver', home: 'Suíça', away: 'Canadá' },
  { id: 12, stage: 'Fase de grupos', group: 'B', date: '2026-06-24', time: '3pm ET', venue: 'Lumen Field, Seattle', home: 'Bósnia e Herzegovina', away: 'Catar' },

  // Group C
  { id: 13, stage: 'Fase de grupos', group: 'C', date: '2026-06-13', time: '6pm ET', venue: 'MetLife Stadium, New York/New Jersey', home: 'Brasil', away: 'Marrocos' },
  { id: 14, stage: 'Fase de grupos', group: 'C', date: '2026-06-13', time: '9pm ET', venue: 'Gillette Stadium, Boston', home: 'Haiti', away: 'Escócia' },
  { id: 15, stage: 'Fase de grupos', group: 'C', date: '2026-06-19', time: '6pm ET', venue: 'Gillette Stadium, Boston', home: 'Escócia', away: 'Marrocos' },
  { id: 16, stage: 'Fase de grupos', group: 'C', date: '2026-06-19', time: '9pm ET', venue: 'Lincoln Financial Field, Philadelphia', home: 'Brasil', away: 'Haiti' },
  { id: 17, stage: 'Fase de grupos', group: 'C', date: '2026-06-24', time: '6pm ET', venue: 'Hard Rock Stadium, Miami', home: 'Escócia', away: 'Brasil' },
  { id: 18, stage: 'Fase de grupos', group: 'C', date: '2026-06-24', time: '6pm ET', venue: 'Mercedes-Benz Stadium, Atlanta', home: 'Marrocos', away: 'Haiti' },

  // Group D
  { id: 19, stage: 'Fase de grupos', group: 'D', date: '2026-06-12', time: '9pm ET', venue: 'SoFi Stadium, Los Angeles', home: 'Estados Unidos', away: 'Paraguai' },
  { id: 20, stage: 'Fase de grupos', group: 'D', date: '2026-06-13', time: '12am ET', venue: 'BC Place, Vancouver', home: 'Austrália', away: 'Turquia' },
  { id: 21, stage: 'Fase de grupos', group: 'D', date: '2026-06-19', time: '3pm ET', venue: 'Lumen Field, Seattle', home: 'Estados Unidos', away: 'Austrália' },
  { id: 22, stage: 'Fase de grupos', group: 'D', date: '2026-06-19', time: '12am ET', venue: 'Levi’s Stadium, San Francisco Bay Area', home: 'Turquia', away: 'Paraguai' },
  { id: 23, stage: 'Fase de grupos', group: 'D', date: '2026-06-25', time: '10pm ET', venue: 'SoFi Stadium, Los Angeles', home: 'Turquia', away: 'Estados Unidos' },
  { id: 24, stage: 'Fase de grupos', group: 'D', date: '2026-06-25', time: '10pm ET', venue: 'Levi’s Stadium, San Francisco Bay Area', home: 'Paraguai', away: 'Austrália' },

  // Group E
  { id: 25, stage: 'Fase de grupos', group: 'E', date: '2026-06-14', time: '1pm ET', venue: 'NRG Stadium, Houston', home: 'Alemanha', away: 'Curaçao' },
  { id: 26, stage: 'Fase de grupos', group: 'E', date: '2026-06-14', time: '7pm ET', venue: 'Lincoln Financial Field, Philadelphia', home: 'Costa do Marfim', away: 'Equador' },
  { id: 27, stage: 'Fase de grupos', group: 'E', date: '2026-06-20', time: '4pm ET', venue: 'BMO Field, Toronto', home: 'Alemanha', away: 'Costa do Marfim' },
  { id: 28, stage: 'Fase de grupos', group: 'E', date: '2026-06-20', time: '8pm ET', venue: 'Arrowhead Stadium, Kansas City', home: 'Equador', away: 'Curaçao' },
  { id: 29, stage: 'Fase de grupos', group: 'E', date: '2026-06-25', time: '4pm ET', venue: 'MetLife Stadium, New York/New Jersey', home: 'Equador', away: 'Alemanha' },
  { id: 30, stage: 'Fase de grupos', group: 'E', date: '2026-06-25', time: '4pm ET', venue: 'Lincoln Financial Field, Philadelphia', home: 'Curaçao', away: 'Costa do Marfim' },

  // Group F
  { id: 31, stage: 'Fase de grupos', group: 'F', date: '2026-06-14', time: '4pm ET', venue: 'AT&T Stadium, Dallas', home: 'Países Baixos', away: 'Japão' },
  { id: 32, stage: 'Fase de grupos', group: 'F', date: '2026-06-14', time: '10pm ET', venue: 'Estadio BBVA, Monterrey', home: 'Suécia', away: 'Tunísia' },
  { id: 33, stage: 'Fase de grupos', group: 'F', date: '2026-06-20', time: '1pm ET', venue: 'NRG Stadium, Houston', home: 'Países Baixos', away: 'Suécia' },
  { id: 34, stage: 'Fase de grupos', group: 'F', date: '2026-06-20', time: '12am ET', venue: 'Estadio BBVA, Monterrey', home: 'Tunísia', away: 'Japão' },
  { id: 35, stage: 'Fase de grupos', group: 'F', date: '2026-06-25', time: '7pm ET', venue: 'AT&T Stadium, Dallas', home: 'Japão', away: 'Suécia' },
  { id: 36, stage: 'Fase de grupos', group: 'F', date: '2026-06-25', time: '7pm ET', venue: 'Arrowhead Stadium, Kansas City', home: 'Tunísia', away: 'Países Baixos' },

  // Group G
  { id: 37, stage: 'Fase de grupos', group: 'G', date: '2026-06-15', time: '9pm ET', venue: 'SoFi Stadium, Los Angeles', home: 'Irã', away: 'Nova Zelândia' },
  { id: 38, stage: 'Fase de grupos', group: 'G', date: '2026-06-15', time: '3pm ET', venue: 'Lumen Field, Seattle', home: 'Bélgica', away: 'Egito' },
  { id: 39, stage: 'Fase de grupos', group: 'G', date: '2026-06-21', time: '3pm ET', venue: 'SoFi Stadium, Los Angeles', home: 'Bélgica', away: 'Irã' },
  { id: 40, stage: 'Fase de grupos', group: 'G', date: '2026-06-21', time: '9pm ET', venue: 'BC Place, Vancouver', home: 'Nova Zelândia', away: 'Egito' },
  { id: 41, stage: 'Fase de grupos', group: 'G', date: '2026-06-26', time: '11pm ET', venue: 'Lumen Field, Seattle', home: 'Egito', away: 'Irã' },
  { id: 42, stage: 'Fase de grupos', group: 'G', date: '2026-06-26', time: '11pm ET', venue: 'BC Place, Vancouver', home: 'Nova Zelândia', away: 'Bélgica' },

  // Group H
  { id: 43, stage: 'Fase de grupos', group: 'H', date: '2026-06-15', time: '12pm ET', venue: 'Mercedes-Benz Stadium, Atlanta', home: 'Espanha', away: 'Cabo Verde' },
  { id: 44, stage: 'Fase de grupos', group: 'H', date: '2026-06-15', time: '6pm ET', venue: 'Hard Rock Stadium, Miami', home: 'Arábia Saudita', away: 'Uruguai' },
  { id: 45, stage: 'Fase de grupos', group: 'H', date: '2026-06-21', time: '12pm ET', venue: 'Mercedes-Benz Stadium, Atlanta', home: 'Espanha', away: 'Arábia Saudita' },
  { id: 46, stage: 'Fase de grupos', group: 'H', date: '2026-06-21', time: '6pm ET', venue: 'Hard Rock Stadium, Miami', home: 'Uruguai', away: 'Cabo Verde' },
  { id: 47, stage: 'Fase de grupos', group: 'H', date: '2026-06-26', time: '8pm ET', venue: 'NRG Stadium, Houston', home: 'Cabo Verde', away: 'Arábia Saudita' },
  { id: 48, stage: 'Fase de grupos', group: 'H', date: '2026-06-26', time: '8pm ET', venue: 'Estadio Akron, Guadalajara', home: 'Uruguai', away: 'Espanha' },

  // Group I
  { id: 49, stage: 'Fase de grupos', group: 'I', date: '2026-06-16', time: '3pm ET', venue: 'MetLife Stadium, New York/New Jersey', home: 'França', away: 'Senegal' },
  { id: 50, stage: 'Fase de grupos', group: 'I', date: '2026-06-16', time: '6pm ET', venue: 'Gillette Stadium, Boston', home: 'Iraque', away: 'Noruega' },
  { id: 51, stage: 'Fase de grupos', group: 'I', date: '2026-06-22', time: '5pm ET', venue: 'Lincoln Financial Field, Philadelphia', home: 'França', away: 'Iraque' },
  { id: 52, stage: 'Fase de grupos', group: 'I', date: '2026-06-22', time: '8pm ET', venue: 'MetLife Stadium, New York/New Jersey', home: 'Noruega', away: 'Senegal' },
  { id: 53, stage: 'Fase de grupos', group: 'I', date: '2026-06-26', time: '3pm ET', venue: 'Gillette Stadium, Boston', home: 'Noruega', away: 'França' },
  { id: 54, stage: 'Fase de grupos', group: 'I', date: '2026-06-26', time: '3pm ET', venue: 'BMO Field, Toronto', home: 'Senegal', away: 'Iraque' },

  // Group J
  { id: 55, stage: 'Fase de grupos', group: 'J', date: '2026-06-16', time: '9pm ET', venue: 'Arrowhead Stadium, Kansas City', home: 'Argentina', away: 'Argélia' },
  { id: 56, stage: 'Fase de grupos', group: 'J', date: '2026-06-16', time: '12am ET', venue: 'Levi’s Stadium, San Francisco Bay Area', home: 'Áustria', away: 'Jordânia' },
  { id: 57, stage: 'Fase de grupos', group: 'J', date: '2026-06-22', time: '1pm ET', venue: 'AT&T Stadium, Dallas', home: 'Argentina', away: 'Áustria' },
  { id: 58, stage: 'Fase de grupos', group: 'J', date: '2026-06-22', time: '11pm ET', venue: 'Levi’s Stadium, San Francisco Bay Area', home: 'Jordânia', away: 'Argélia' },
  { id: 59, stage: 'Fase de grupos', group: 'J', date: '2026-06-27', time: '10pm ET', venue: 'Arrowhead Stadium, Kansas City', home: 'Argélia', away: 'Áustria' },
  { id: 60, stage: 'Fase de grupos', group: 'J', date: '2026-06-27', time: '10pm ET', venue: 'AT&T Stadium, Dallas', home: 'Jordânia', away: 'Argentina' },

  // Group K
  { id: 61, stage: 'Fase de grupos', group: 'K', date: '2026-06-17', time: '1pm ET', venue: 'NRG Stadium, Houston', home: 'Portugal', away: 'República Democrática do Congo' },
  { id: 62, stage: 'Fase de grupos', group: 'K', date: '2026-06-17', time: '10pm ET', venue: 'Estadio Azteca, Mexico City', home: 'Uzbequistão', away: 'Colômbia' },
  { id: 63, stage: 'Fase de grupos', group: 'K', date: '2026-06-23', time: '1pm ET', venue: 'NRG Stadium, Houston', home: 'Portugal', away: 'Uzbequistão' },
  { id: 64, stage: 'Fase de grupos', group: 'K', date: '2026-06-23', time: '10pm ET', venue: 'Estadio Akron, Guadalajara', home: 'Colômbia', away: 'República Democrática do Congo' },
  { id: 65, stage: 'Fase de grupos', group: 'K', date: '2026-06-27', time: '7:30pm ET', venue: 'Hard Rock Stadium, Miami', home: 'Colômbia', away: 'Portugal' },
  { id: 66, stage: 'Fase de grupos', group: 'K', date: '2026-06-27', time: '7:30pm ET', venue: 'Mercedes-Benz Stadium, Atlanta', home: 'República Democrática do Congo', away: 'Uzbequistão' },

  // Group L
  { id: 67, stage: 'Fase de grupos', group: 'L', date: '2026-06-17', time: '4pm ET', venue: 'AT&T Stadium, Dallas', home: 'Inglaterra', away: 'Croácia' },
  { id: 68, stage: 'Fase de grupos', group: 'L', date: '2026-06-17', time: '7pm ET', venue: 'BMO Field, Toronto', home: 'Gana', away: 'Panamá' },
  { id: 69, stage: 'Fase de grupos', group: 'L', date: '2026-06-23', time: '4pm ET', venue: 'Gillette Stadium, Boston', home: 'Inglaterra', away: 'Gana' },
  { id: 70, stage: 'Fase de grupos', group: 'L', date: '2026-06-23', time: '7pm ET', venue: 'BMO Field, Toronto', home: 'Panamá', away: 'Croácia' },
  { id: 71, stage: 'Fase de grupos', group: 'L', date: '2026-06-27', time: '5pm ET', venue: 'MetLife Stadium, New York/New Jersey', home: 'Panamá', away: 'Inglaterra' },
  { id: 72, stage: 'Fase de grupos', group: 'L', date: '2026-06-27', time: '5pm ET', venue: 'Lincoln Financial Field, Philadelphia', home: 'Croácia', away: 'Gana' },
];

/**
 * Round of 32 fixtures. The 2026 tournament introduces an extra
 * knockout round before the round of 16.  Team identifiers refer to
 * group standings (e.g. “Runner up Group A”) rather than concrete
 * teams and can be replaced once results from the group stage are
 * known.  Match numbers follow FIFA’s official allocation (73–88).
 */
export const ROUND_OF_32_MATCHES: Match[] = [
  { id: 73, stage: 'Dezesseis avos de final', date: '2026-06-28', time: '3pm ET', venue: 'SoFi Stadium, Los Angeles', home: '2º Grupo A', away: '2º Grupo B' },
  { id: 74, stage: 'Dezesseis avos de final', date: '2026-06-29', time: '4:30pm ET', venue: 'Gillette Stadium, Boston', home: '1º Grupo E', away: '3º melhor (A/B/C/D/F)' },
  { id: 75, stage: 'Dezesseis avos de final', date: '2026-06-29', time: '9pm ET', venue: 'Estadio BBVA, Monterrey', home: '1º Grupo F', away: '2º Grupo C' },
  { id: 76, stage: 'Dezesseis avos de final', date: '2026-06-29', time: '1pm ET', venue: 'NRG Stadium, Houston', home: '1º Grupo C', away: '2º Grupo F' },
  { id: 77, stage: 'Dezesseis avos de final', date: '2026-06-30', time: '5pm ET', venue: 'MetLife Stadium, New York/New Jersey', home: '1º Grupo I', away: '3º melhor (C/D/F/G/H)' },
  { id: 78, stage: 'Dezesseis avos de final', date: '2026-06-30', time: '1pm ET', venue: 'AT&T Stadium, Dallas', home: '2º Grupo E', away: '2º Grupo I' },
  { id: 79, stage: 'Dezesseis avos de final', date: '2026-06-30', time: '9pm ET', venue: 'Estadio Azteca, Mexico City', home: '1º Grupo A', away: '3º melhor (C/E/F/H/I)' },
  { id: 80, stage: 'Dezesseis avos de final', date: '2026-07-01', time: '12pm ET', venue: 'Mercedes-Benz Stadium, Atlanta', home: '1º Grupo L', away: '3º melhor (E/H/I/J/K)' },
  { id: 81, stage: 'Dezesseis avos de final', date: '2026-07-01', time: '8pm ET', venue: 'Levi’s Stadium, San Francisco Bay Area', home: '1º Grupo D', away: '3º melhor (B/E/F/I/J)' },
  { id: 82, stage: 'Dezesseis avos de final', date: '2026-07-01', time: '4pm ET', venue: 'Lumen Field, Seattle', home: '1º Grupo G', away: '3º melhor (A/E/H/I/J)' },
  { id: 83, stage: 'Dezesseis avos de final', date: '2026-07-02', time: '7pm ET', venue: 'BMO Field, Toronto', home: '2º Grupo K', away: '2º Grupo L' },
  { id: 84, stage: 'Dezesseis avos de final', date: '2026-07-02', time: '3pm ET', venue: 'SoFi Stadium, Los Angeles', home: '1º Grupo H', away: '2º Grupo J' },
  { id: 85, stage: 'Dezesseis avos de final', date: '2026-07-02', time: '11pm ET', venue: 'BC Place, Vancouver', home: '1º Grupo B', away: '3º melhor (E/F/G/I/J)' },
  { id: 86, stage: 'Dezesseis avos de final', date: '2026-07-03', time: '6pm ET', venue: 'Hard Rock Stadium, Miami', home: '1º Grupo J', away: '2º Grupo H' },
  { id: 87, stage: 'Dezesseis avos de final', date: '2026-07-03', time: '9:30pm ET', venue: 'Arrowhead Stadium, Kansas City', home: '1º Grupo K', away: '3º melhor (D/E/I/J/L)' },
  { id: 88, stage: 'Dezesseis avos de final', date: '2026-07-03', time: '2pm ET', venue: 'AT&T Stadium, Dallas', home: '2º Grupo D', away: '2º Grupo G' },
];

/**
 * Round of 16 fixtures (matches 89–96).  The winners from the round
 * of 32 advance into these fixtures.  Placeholders reference match
 * numbers so that the relationships between rounds remain clear and
 * easily traceable.
 */
export const ROUND_OF_16_MATCHES: Match[] = [
  { id: 89, stage: 'Oitavas de final', date: '2026-07-04', time: '5pm ET', venue: 'Lincoln Financial Field, Philadelphia', home: 'Vencedor da partida 74', away: 'Vencedor da partida 77' },
  { id: 90, stage: 'Oitavas de final', date: '2026-07-04', time: '1pm ET', venue: 'NRG Stadium, Houston', home: 'Vencedor da partida 73', away: 'Vencedor da partida 75' },
  { id: 91, stage: 'Oitavas de final', date: '2026-07-05', time: '4pm ET', venue: 'MetLife Stadium, New York/New Jersey', home: 'Vencedor da partida 76', away: 'Vencedor da partida 78' },
  { id: 92, stage: 'Oitavas de final', date: '2026-07-05', time: '8pm ET', venue: 'Estadio Azteca, Mexico City', home: 'Vencedor da partida 79', away: 'Vencedor da partida 80' },
  { id: 93, stage: 'Oitavas de final', date: '2026-07-06', time: '3pm ET', venue: 'AT&T Stadium, Dallas', home: 'Vencedor da partida 83', away: 'Vencedor da partida 84' },
  { id: 94, stage: 'Oitavas de final', date: '2026-07-06', time: '8pm ET', venue: 'Lumen Field, Seattle', home: 'Vencedor da partida 81', away: 'Vencedor da partida 82' },
  { id: 95, stage: 'Oitavas de final', date: '2026-07-07', time: '12pm ET', venue: 'Mercedes-Benz Stadium, Atlanta', home: 'Vencedor da partida 86', away: 'Vencedor da partida 88' },
  { id: 96, stage: 'Oitavas de final', date: '2026-07-07', time: '4pm ET', venue: 'BC Place, Vancouver', home: 'Vencedor da partida 85', away: 'Vencedor da partida 87' },
];

/**
 * Quarter‑final fixtures (matches 97–100).  Winners from the round
 * of 16 progress into these games.
 */
export const QUARTER_FINAL_MATCHES: Match[] = [
  { id: 97, stage: 'Quartas de final', date: '2026-07-09', time: '4pm ET', venue: 'Gillette Stadium, Boston', home: 'Vencedor da partida 89', away: 'Vencedor da partida 90' },
  { id: 98, stage: 'Quartas de final', date: '2026-07-10', time: '3pm ET', venue: 'SoFi Stadium, Los Angeles', home: 'Vencedor da partida 93', away: 'Vencedor da partida 94' },
  { id: 99, stage: 'Quartas de final', date: '2026-07-11', time: '5pm ET', venue: 'Hard Rock Stadium, Miami', home: 'Vencedor da partida 91', away: 'Vencedor da partida 92' },
  { id: 100, stage: 'Quartas de final', date: '2026-07-11', time: '9pm ET', venue: 'Arrowhead Stadium, Kansas City', home: 'Vencedor da partida 95', away: 'Vencedor da partida 96' },
];

/**
 * Semi‑final fixtures (matches 101–102).  Winners from the
 * quarter‑finals progress to the final, losers play for third place.
 */
export const SEMI_FINAL_MATCHES: Match[] = [
  { id: 101, stage: 'Semifinais', date: '2026-07-14', time: '3pm ET', venue: 'AT&T Stadium, Dallas', home: 'Vencedor da partida 97', away: 'Vencedor da partida 98' },
  { id: 102, stage: 'Semifinais', date: '2026-07-15', time: '3pm ET', venue: 'Mercedes-Benz Stadium, Atlanta', home: 'Vencedor da partida 99', away: 'Vencedor da partida 100' },
];

/**
 * Third place play‑off (match 103).  Losers of the two semi‑finals
 * meet in this fixture to determine the tournament’s third‑placed
 * nation.  Because there is only one match at this stage the
 * constant is not wrapped in an array.
 */
export const THIRD_PLACE_MATCH: Match = {
  id: 103,
  stage: 'Disputa de terceiro lugar',
  date: '2026-07-18',
  time: '5pm ET',
  venue: 'Hard Rock Stadium, Miami',
  home: 'Perdedor da partida 101',
  away: 'Perdedor da partida 102',
};

/**
 * Final (match 104).  The winners of the two semi‑final matches meet
 * in the final to decide the world champion.
 */
export const FINAL_MATCH: Match = {
  id: 104,
  stage: 'Final',
  date: '2026-07-19',
  time: '3pm ET',
  venue: 'MetLife Stadium, New York/New Jersey',
  home: 'Vencedor da partida 101',
  away: 'Vencedor da partida 102',
};
