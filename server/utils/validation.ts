import type { z, ZodRawShape } from 'zod'
import type { H3Event } from 'h3'

type ZodBodyParameter<T extends ZodRawShape> = ReturnType<typeof z.object<T>>

export const useValidatedBody = async <T extends ZodRawShape>(event: H3Event, schema: ZodBodyParameter<T>) => {
  const result = await readValidatedBody(event, schema.safeParse)

  if (!result.success) {
    const message = Object.entries(result.error.flatten().fieldErrors)
      .map(([field, errors]) => `${field}: ${(errors as string[])?.join(', ')}`)
      .join('\n')

    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message,
    })
  }

  return result.data
}
