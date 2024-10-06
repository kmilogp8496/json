import { useFaker } from '~~/server/services/faker'

export default defineEventHandler(async (event) => {
  const body = await readRawBody(event)

  if (!body) {
    return createError({
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
    return createError({
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
    console.error(error)
    return createError({
      statusCode: 422,
      statusMessage: 'Bad Request',
      message: 'Failed to generate fake data',
      cause: error,
    })
  }
})
