export async function createUserIfNotExists(user: { email: string }, db = useDb()) {
  const existingUser = await db.query.users.findFirst({
    where: eq(tables.users.email, user.email),
  })

  if (existingUser) {
    return existingUser
  }

  const userCreated = (await db.insert(tables.users).values({
    email: user.email,
  }).returning()).at(0)!

  return userCreated
}
