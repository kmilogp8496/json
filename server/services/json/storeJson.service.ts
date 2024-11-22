import { buildJsonPath } from './path.service'

export const storeJson = async (userId: number, fileName: string, content: string) => {
  const db = useDb()

  const path = buildJsonPath(userId, fileName)

  const existingBlob = await db.query.userBlobs.findFirst({
    where: eq(tables.userBlobs.path, path),
  })

  const blob = new Blob([content])

  ensureBlob(blob, {
    maxSize: '1MB',
  })

  await hubBlob().put(path, blob)

  if (existingBlob) {
    return (await db.update(tables.userBlobs).set({
      updatedAt: new Date(),
    }).where(eq(tables.userBlobs.id, existingBlob.id)).returning()).at(0)!
  }

  return (await db.insert(tables.userBlobs).values({
    path,
    userId,
    blobType: 'json',
  }).returning()).at(0)!
}
