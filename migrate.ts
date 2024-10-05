import { consola } from 'consola'
import { migrate } from 'drizzle-orm/d1/migrator'

await migrate(useDrizzle(), { migrationsFolder: 'server/database/migrations' })
  .then(() => {
    consola.success('Database migrations done')
  })
  .catch((err) => {
    consola.error('Database migrations failed', err)
  })
