import { consola } from 'consola'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    consola.log(event.method, event.path)
  })

  nitroApp.hooks.hook('afterResponse', (event) => {
    consola.log(event.method, event.path, event.node.res.statusCode)
  })
})
