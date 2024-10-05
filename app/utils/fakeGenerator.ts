import { JSONSchemaFaker, type Schema } from 'json-schema-faker'
import { faker } from '@faker-js/faker'

export type { Schema } from 'json-schema-faker'

const jsf = JSONSchemaFaker
jsf.extend('faker', () => faker)

export function fakeGenerator(schema: Schema) {
  return jsf.resolve(schema)
}
