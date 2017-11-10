export interface LigaTeamAsHome {
  goals: number;
  goalsAgainst: number;
  wins: number;
  draws: number;
  losses: number;
}
export interface TableTeam {
  _links: object;
  position: number;
  teamName: string;
  creastURI: string;
  playedGames: number;
  points: number;
  goals: number;
  goalsAgainst: number;
  goalDifference: number;
  wins: number;
  draws: number;
  losses: number;
  home: LigaTeamAsHome;
  away: LigaTeamAsHome;
}

export interface LigaTable {
  _links?: object;
  leagueCaption: string;
  matchday: number;
  standing: TableTeam[];
}

export interface LigaTeam {
  _links: {
    self: object;
    fixtures: object;
    players: object;
  };
  name: string;
  shortName: string;
  squadMarketValue: string;
  crestUrl: string;
}

export interface TeamFixtures {
  _links: {
    self: { href: string };
    team: { href: string };
  };
  season?: string;
  timeFrameStart: string;
  timeFrameEnd: string;
  count: number;
  fixtures: Fixture[];
}

export interface Fixture {
  _links: {
    self: { href: string };
    competition: { href: string };
    homeTeam: { href: string };
    awayTeam: { href: string };
  };
  id?: number;
  status: string;
  competitionId: number;
  date: string;
  matchday: number;
  homeTeamName: string;
  homeTeamId: number;
  awayTeamName: string;
  awayTeamId?: number;
  result: {
    goalsHomeTeam: number;
    goalsAwayTeam: number;
    halftime?: {
      goalsHomeTeam: number;
      goalsAwayTeam: number;
    };
  };
  odds?: any | null;
}
