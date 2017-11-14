// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  fbDataKey: '5aa68225b66a4500ac98207d568b08ec',
  ligaTableUrl: 'http://api.football-data.org/v1/competitions/455/leagueTable',
  teamByIdUrl: 'http://api.football-data.org/v1/teams/',
  getFixturesByIdUrl: 'http://api.football-data.org/v1/teams/',
  getFixtureByIdUrl: 'http://api.football-data.org/v1/fixtures/'
};
