import { desc } from 'drizzle-orm'

export const listJsons = async (userId: number) => {
  const db = useDb()

  const result = await db.query.userBlobs.findMany({
    where: and(
      eq(tables.userBlobs.userId, userId),
      eq(tables.userBlobs.blobType, 'json'),
    ),
    columns: {
      path: true,
      updatedAt: true,
    },
    orderBy: [desc(tables.userBlobs.updatedAt)],
  })

  for (let i = 0; i < result.length; i++) {
    result[i].path = result[i].path.replace(`${userId}/`, '')
  }

  return result
}
