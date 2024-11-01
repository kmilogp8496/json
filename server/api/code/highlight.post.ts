import { codeToHtml } from 'shiki'
import { z } from 'zod'
import { validatedBodyFromEvent } from '~~/server/services/event/validateBodyFromEvent.service'

export default defineEventHandler(async (event) => {
  const body = await validatedBodyFromEvent(event, z.object({
    code: z.string().min(1),
    lang: z.string().min(1),
    theme: z.string().min(1),
  }))

  const html = await codeToHtml(body.code, {
    lang: body.lang,
    theme: body.theme,
  })

  return html
})
