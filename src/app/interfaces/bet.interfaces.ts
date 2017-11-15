export interface FixtureBet {
  fixtureId: number;
  teams: {
    home: {
      name: string;
      id: number;
      score: number;
    };
    away: {
      name: string;
      id: number;
      score: number;
    };
  };
  fixtureDate: string;
  timeStamp: string;
}
