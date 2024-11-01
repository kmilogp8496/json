import { drizzle } from 'drizzle-orm/d1'
import { hubDatabase } from '@nuxthub/core/dist/runtime/database/server/utils/database'
import * as schema from '../database/schema'

export { sql, eq, and, or } from 'drizzle-orm'

export const tables = schema

export function useDb() {
  return drizzle(hubDatabase(), { schema })
}

export type DB = ReturnType<typeof useDb>
