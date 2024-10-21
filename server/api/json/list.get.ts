import { listJsons } from '~~/server/services/json/listJson.service'

export default defineEventHandler(async (event) => {
  const { user: { id: userId } } = await requireUserSession(event)

  return listJsons(userId)
})
