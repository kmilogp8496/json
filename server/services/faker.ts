import { JSONSchemaFaker, type Schema } from 'json-schema-faker'
import { faker } from '@faker-js/faker'
import $RefParser from 'json-schema-ref-parser'
import { JSONPath } from 'jsonpath-plus'
import { setDependencies } from '~~/node_modules/json-schema-faker/dist/shared'

let jsf: typeof JSONSchemaFaker

const generate = (schema: Schema) => {
  return jsf!.resolve(schema, undefined, '.')
}

export function useFaker() {
  if (!jsf) {
    process.cwd ??= () => '.'
    setDependencies({ JSONPath, $RefParser })
    jsf = JSONSchemaFaker
    jsf.extend('faker', () => faker)
  }

  return { generate }
}
