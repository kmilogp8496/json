import { blobNotFound } from './errors/blobNotFound'

export const deleteJsonById = async (userId: number, id: number) => {
  const db = useDb()

  const userBlob = await db.query.userBlobs.findFirst({
    where: and(
      eq(tables.userBlobs.userId, userId),
      eq(tables.userBlobs.id, id),
    ),
  })

  if (!userBlob) {
    throw createError(blobNotFound)
  }

  await hubBlob().del(userBlob.path)

  await db.delete(tables.userBlobs).where(eq(tables.userBlobs.id, id))
}
