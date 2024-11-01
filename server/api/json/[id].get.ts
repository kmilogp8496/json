import { getNumericIdFromEvent } from '~~/server/services/event/getNumericIdFromEvent.service'
import { getJsonById } from '~~/server/services/json/getJsonById.service'

const paramId = 'id'

export default defineCachedEventHandler(async (event) => {
  const { user: { id: userId } } = await requireUserSession(event)

  const blobId = getNumericIdFromEvent(event, paramId)
  return sendStream(event, await getJsonById(userId, blobId))
}, {
  maxAge: 60, // 1 minute
  getKey: async (event) => {
    return `json-${getRouterParam(event, paramId)}-user-${await getUserSession(event).then(session => session.user?.id ?? '')}`
  },
})
