import { migrate } from 'drizzle-orm/d1/migrator'
import drizzleConfig from '~~/drizzle.config'

export default defineTask({
  meta: {
    name: 'db:migrate',
    description: 'Run database migrations',
  },
  async run() {
    console.log('Running DB migrations...')
    await migrate(useDb(), { migrationsFolder: drizzleConfig.out! })
    return { result: 'success' }
  },
})
