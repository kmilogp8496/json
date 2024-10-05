export function prettifyJson(json: object, spaces = 4): string {
  return JSON.stringify(json, null, spaces)
}
