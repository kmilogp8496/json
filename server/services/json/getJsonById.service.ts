import { blobNotFound } from './errors/blobNotFound'

export const getJsonById = async (userId: number, id: number) => {
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

  const blob = await hubBlob().get(userBlob.path)

  if (!blob) {
    throw createError(blobNotFound)
  }

  return blob.stream()
}
