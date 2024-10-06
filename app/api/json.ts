import { apiClient } from './client'
import type { Schema } from '~~/@types/faker'

export const generateJsonData = (schema: Schema) => {
  return apiClient('/api/json/generate', {
    body: schema,
    method: 'POST',
  })
}
