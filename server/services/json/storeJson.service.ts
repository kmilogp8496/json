import { buildJsonPath } from './path.service'

export const storeJson = async (userId: number, fileName: string, content: string) => {
  const db = useDb()

  const path = buildJsonPath(userId, fileName)

  const existingBlob = await db.query.userBlobs.findFirst({
    where: eq(tables.userBlobs.path, path),
  })

  return db.transaction(async (tx) => {
    await hubBlob().put(path, content)

    if (existingBlob) {
      return (await tx.update(tables.userBlobs).set({
        blob: content,
      }).where(eq(tables.userBlobs.id, existingBlob.id)).returning()).at(0)!
    }

    return (await tx.insert(tables.userBlobs).values({
      path,
      userId,
      blob: content,
      blobType: 'json',
    }).returning()).at(0)!
  })
}
