import type { H3Event } from 'h3'

export const getNumericIdFromEvent = (event: H3Event, paramName: string) => {
  const id = Number(getRouterParam(event, paramName))

  if (isNaN(id) || id < 1) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid blob id',
    })
  }

  return id
}
