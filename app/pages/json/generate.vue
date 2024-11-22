<script lang="ts" setup>
import { generateJsonData } from '~/api/json'
import type { Schema } from '~~/@types/faker'
import exampleSchemas from '~/jsonSchemas/examples.json'

definePageMeta({
  keepalive: true,
  title: 'Generate',
  icon: 'i-heroicons-sparkles-20-solid',
  description: 'A powerful JSON generator that creates sample data based on your schema definition. Choose from predefined examples or input your custom schema to generate realistic JSON data for testing and development purposes.',
})

useHead({
  title: 'Generate',
})

const selectedSchema = ref(exampleSchemas[0])
const input = ref(prettifyJson(selectedSchema.value!.schema))

const handler = async (value: string) => {
  const parsedSchema = JSON.parse(value) as Schema
  const data = await generateFromSchema(parsedSchema)
  return prettifyJson(data)
}

const examples = ref(exampleSchemas)

async function generateFromSchema(schema: Schema) {
  const { result } = await generateJsonData(schema)

  return result
}

watch(selectedSchema, () => {
  if (selectedSchema.value) {
    input.value = prettifyJson(selectedSchema.value.schema)
  }
})
</script>

<template>
  <JsonTransform
    v-model:input="input"
    title="Generate JSON"
    input-title="JSON Object"
    output-title="Generated JSON from Schema"
    handler-title="Generate"
    :handler
  >
    <template #actions>
      <UBadge variant="soft">
        Examples
      </UBadge>
      <USelectMenu
        v-model="selectedSchema"
        size="sm"
        :options="examples"
        option-attribute="name"
      />
    </template>
  </JsonTransform>
</template>
