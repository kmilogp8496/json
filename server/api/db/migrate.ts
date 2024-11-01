export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  if (user.email !== 'kmilogp8496@gmail.com') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    })
  }

  const { result } = await runTask('db:migrate')

  return result
})
