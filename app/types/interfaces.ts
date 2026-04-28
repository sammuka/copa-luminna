export type Stage =
  | 'Fase de grupos'
  | 'Dezesseis avos de final'
  | 'Oitavas de final'
  | 'Quartas de final'
  | 'Semifinais'
  | 'Disputa de terceiro lugar'
  | 'Final';

/**
 * Describes a national team. The `code` property follows the
 * internationally recognised three‑letter FIFA country code while the
 * `name` field contains the full team name. Keeping both values
 * separate makes it easy to adjust display labels without changing
 * identifiers used throughout the rest of the data model.
 */
export interface Team {
  /** The three‑letter FIFA code, e.g. ‘BRA’ for Brazil. */
  code: string;
  /** The full country name used for display purposes. */
  name: string;
  /**
   * Emoji representation of the national flag. Using the two‑letter
   * ISO 3166‑1 alpha‑2 code converted to regional indicator symbols
   * allows quick visual identification of teams. For constituent
   * countries within the United Kingdom (e.g. England and Scotland)
   * tag‑sequence flag emojis are used.
   */
  flag: string;
}

/**
 * Represents a collection of teams competing together in the group stage.
 * Each group is uniquely identified by a single letter from A to L and
 * contains exactly four teams. The order of teams in the `teams`
 * array corresponds to the draw order but has no bearing on points or
 * seeding – that will be calculated elsewhere when adding variable
 * data such as match results.
 */
export interface Group {
  /** Single character identifier for the group (e.g. ‘A’, ‘B’ … ‘L’). */
  letter: string;
  /** Participating teams in this group, referenced from the TEAMS map. */
  teams: Team[];
}

/**
 * Defines a single football match. In addition to basic scheduling
 * information (date, time and venue) the model keeps track of which
 * stage the match belongs to and references the participating sides.
 * For group stage matches the `group` property is populated with the
 * corresponding group letter. For knockout fixtures the `group`
 * property is left undefined and the `home`/`away` fields may contain
 * placeholder values (e.g. “Winner Match 101”) until real teams are
 * determined.
 */
export interface Match {
  /** Unique identifier of the match following FIFA numbering (1–104). */
  id: number;
  /** Tournament phase for this fixture. */
  stage: Stage;
  /** Populated only for group stage fixtures to indicate the group. */
  group?: string;
  /** ISO‑8601 formatted date (YYYY‑MM‑DD) of the match. */
  date: string;
  /** Kick‑off time in Eastern Time (ET) as presented by the organiser. */
  time: string;
  /** Venue including stadium and city, written as one string. */
  venue: string;
  /** Home side. For knockout games this can be a placeholder (e.g. “Winner Group A”). */
  home: string;
  /** Away side. For knockout games this can be a placeholder (e.g. “Runner up Group B”). */
  away: string;
}