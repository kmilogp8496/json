import { z } from 'zod'
import { storeJson } from '~~/server/services/json/storeJson.service'
import { useValidatedBody } from '~~/server/utils/validation'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'You must be logged in to save content',
    })
  }

  const body = await useValidatedBody(event, z.object({
    name: z.string(),
    content: z.string(),
  }))

  const blob = await storeJson(user.id, body.name, body.content)

  return {
    id: blob.id,
    name: blob.path,
    createdAt: blob.createdAt,
  }
})
