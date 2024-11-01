export const buildJsonPath = (userId: number, givenFileName: string) => {
  let fileName = givenFileName.trim()
  if (!fileName.endsWith('.json')) {
    fileName = `${fileName}.json`
  }

  if (fileName.startsWith('/'))
    return `${userId}${fileName}`

  return `${userId}/${fileName}`
}
