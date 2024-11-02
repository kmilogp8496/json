import { consola } from 'consola'

export const logger = consola.withTag('APP')
export const requestLogger = consola.withTag('REQUEST')
export const responseLogger = consola.withTag('RESPONSE')
export const errorLogger = consola.withTag('ERROR')

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    const timestamp = Date.now()
    requestLogger.log(event.method, event.path, timestamp)
    event.context.timestamp = timestamp
  })

  nitroApp.hooks.hook('afterResponse', (event) => {
    const timestamp = Date.now()
    responseLogger.log(event.method, event.node.res.statusCode || 500, event.path, event.context.timestamp, timestamp - event.context.timestamp)
  })

  nitroApp.hooks.hook('error', (error, context) => {
    errorLogger.error(error.name, error.message, {
      context,
    })
  })
})
