import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'

export const tables = schema

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema })
}
