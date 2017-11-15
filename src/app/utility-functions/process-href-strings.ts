/**
 * used to get the las value from href string like: 'http://api.football-data.org/v1/fixtures/149461'
 * and returns 149461
 * @param {string} href
 * @returns {string}
 */
export function getLastSlashValue(href: string): string {
  return href.split('/').pop();
}
