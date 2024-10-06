import { useFaker } from '~~/server/services/faker'

export default defineEventHandler(async (event) => {
  const body = await readRawBody(event)

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Request body is required',
    })
  }

  let parsedBody: object = {}

  try {
    parsedBody = JSON.parse(body)
  }
  catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid JSON',
      cause: error,
    })
  }

  const { generate } = useFaker()

  try {
    const result = await generate(parsedBody)

    return {
      result,
    }
  }
  catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred generating the JSON data'
    throw createError({
      statusCode: 422,
      statusMessage: 'Bad Request',
      message: message,
      cause: error,
    })
  }
})
