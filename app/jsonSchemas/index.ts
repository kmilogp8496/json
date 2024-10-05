export interface JSONSchema {
  $id?: string
  $schema?: string
  $ref?: string
  type?: string | string[]
  title?: string
  description?: string
  default?: unknown
  examples?: unknown[]
  multipleOf?: number
  maximum?: number
  exclusiveMaximum?: number
  minimum?: number
  exclusiveMinimum?: number
  maxLength?: number
  minLength?: number
  pattern?: string
  additionalItems?: boolean | JSONSchema
  items?: JSONSchema | JSONSchema[]
  maxItems?: number
  minItems?: number
  uniqueItems?: boolean
  contains?: JSONSchema
  maxProperties?: number
  minProperties?: number
  required?: string[]
  additionalProperties?: boolean | JSONSchema
  definitions?: Record<string, JSONSchema>
  properties?: Record<string, JSONSchema>
  patternProperties?: Record<string, JSONSchema>
  dependencies?: Record<string, JSONSchema | string[]>
  propertyNames?: JSONSchema
  const?: unknown
  enum?: unknown[]
  format?: string
  contentMediaType?: string
  contentEncoding?: string
  if?: JSONSchema
  then?: JSONSchema
  else?: JSONSchema
  allOf?: JSONSchema[]
  anyOf?: JSONSchema[]
  oneOf?: JSONSchema[]
  not?: JSONSchema
}
