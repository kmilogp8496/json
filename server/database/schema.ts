import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  avatar: text('avatar').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const userBlobs = sqliteTable('user_blobs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(users.id),
  blob: text('blob').notNull(),
  blobType: text('blob_type').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})
