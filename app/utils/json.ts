export function prettifyJson(json: unknown, spaces = 4): string {
  return JSON.stringify(json, null, spaces)
}
