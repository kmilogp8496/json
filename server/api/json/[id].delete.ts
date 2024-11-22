import { deleteJsonById } from '~~/server/services/json/deleteJsonById.service'
import { getNumericIdFromEvent } from '~~/server/services/event/getNumericIdFromEvent.service'

export default defineEventHandler(async (event) => {
  const { user: { id: userId } } = await requireUserSession(event)

  const blobId = getNumericIdFromEvent(event, 'id')

  deleteJsonById(userId, blobId)

  return sendNoContent(event)
})
