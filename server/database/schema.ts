import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
})

export type User = typeof users.$inferSelect
export type UserInsert = typeof users.$inferInsert

export const userBlobs = sqliteTable('user_blobs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  path: text('path').notNull(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  blob: text('blob').notNull(),
  blobType: text('blob_type').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$onUpdateFn(() => new Date()),
}, table => ({
  userIdIdx: index('user_id_idx').on(table.userId),
}))

export type UserBlob = typeof userBlobs.$inferSelect
export type UserBlobInsert = typeof userBlobs.$inferInsert
