import type { UserInsert } from '../../database/schema'

export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Run database seed task',
  },
  async run() {
    console.log('Running DB seed task...')
    const users: UserInsert[] = [
      {
        email: 'john@example.com',
        createdAt: new Date(),
      },
      {
        email: 'jane@example.com',
        createdAt: new Date(),
      },
    ]
    await useDb().insert(tables.users).values(users)
    return { result: 'success' }
  },
})
