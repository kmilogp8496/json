import { getNumericIdFromEvent } from '~~/server/services/event/getNumericIdFromEvent.service'
import { getJsonById } from '~~/server/services/json/getJsonById.service'

const paramId = 'id'

export default defineEventHandler(async (event) => {
  const { user: { id: userId } } = await requireUserSession(event)

  const blobId = getNumericIdFromEvent(event, paramId)
  return hubBlob().serve(event, (await getJsonById(userId, blobId)).path)
})
