import type { Group } from './interfaces';
import { TEAMS } from './teams';

/**
 * Definition of all twelve World Cup groups. Each group lists its four
 * constituent teams in draw order. Altering the order or swapping
 * teams here will automatically propagate to schedules referencing
 * these groups because the schedule uses team codes instead of
 * repeating names.
 */
export const GROUPS: Group[] = [
  {
    letter: 'A',
    teams: [TEAMS.MEX, TEAMS.RSA, TEAMS.KOR, TEAMS.CZE],
  },
  {
    letter: 'B',
    teams: [TEAMS.CAN, TEAMS.BIH, TEAMS.QAT, TEAMS.SUI],
  },
  {
    letter: 'C',
    teams: [TEAMS.BRA, TEAMS.MAR, TEAMS.HAI, TEAMS.SCO],
  },
  {
    letter: 'D',
    teams: [TEAMS.USA, TEAMS.PAR, TEAMS.AUS, TEAMS.TUR],
  },
  {
    letter: 'E',
    teams: [TEAMS.GER, TEAMS.CUW, TEAMS.CIV, TEAMS.ECU],
  },
  {
    letter: 'F',
    teams: [TEAMS.NED, TEAMS.JPN, TEAMS.SWE, TEAMS.TUN],
  },
  {
    letter: 'G',
    teams: [TEAMS.IRN, TEAMS.NZL, TEAMS.BEL, TEAMS.EGY],
  },
  {
    letter: 'H',
    teams: [TEAMS.ESP, TEAMS.CPV, TEAMS.KSA, TEAMS.URU],
  },
  {
    letter: 'I',
    teams: [TEAMS.FRA, TEAMS.SEN, TEAMS.IRQ, TEAMS.NOR],
  },
  {
    letter: 'J',
    teams: [TEAMS.ARG, TEAMS.ALG, TEAMS.AUT, TEAMS.JOR],
  },
  {
    letter: 'K',
    teams: [TEAMS.POR, TEAMS.COD, TEAMS.UZB, TEAMS.COL],
  },
  {
    letter: 'L',
    teams: [TEAMS.ENG, TEAMS.CRO, TEAMS.GHA, TEAMS.PAN],
  },
];