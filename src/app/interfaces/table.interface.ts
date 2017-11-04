export interface LigaTable {
  _links: object;
  leagueCaption: string;
  matchDay: number;
  standing: LigaTeam[];
}

export interface LigaTeam {
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

export interface LigaTeamAsHome {
  goals: number;
  goalsAgainst: number;
  wins: number;
  draws: number;
  losses: number;
}
