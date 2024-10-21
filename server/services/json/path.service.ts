export const buildJsonPath = (userId: number, fileName: string) => {
  if (fileName.startsWith('/'))
    return `${userId}${fileName}.json`

  return `${userId}/${fileName}.json`
}
