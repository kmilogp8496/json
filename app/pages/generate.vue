<script lang="ts" setup>
import { generateJsonData } from '~/api/json'
import type { SchemaExample } from '~/jsonSchemas'
import examples from '~/jsonSchemas/examples.json'
import type { Schema } from '~~/@types/faker'

useHead({
  title: 'Generate',
})

definePageMeta({
  keepalive: true,
})

const schema = ref<string>(prettifyJson(examples[0]!.schema))
const output = ref<string>('')
const selectedExample = ref(examples[0])

function updateSchemaFromExample(selected: SchemaExample) {
  if (selected) {
    schema.value = prettifyJson(selected.schema)
  }
}

function generateJSON() {
  const parsedSchema = JSON.parse(schema.value) as Schema
  generateFromSchema(parsedSchema)
    .then((data) => {
      output.value = prettifyJson(data)
    })
    .catch()
}

async function generateFromSchema(schema: Schema) {
  const { result } = await generateJsonData(schema)

  return result
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center">
        <h1 class="text-3xl">
          JSON Generate
        </h1>
        <span
          class="text-lg font-semibold ml-auto mr-4"
        >
          Example Schemas:
        </span>
        <USelectMenu
          v-model="selectedExample"
          :options="examples"
          option-attribute="name"
          placeholder="Select an example schema"
          @update:model-value="updateSchemaFromExample"
        />
      </div>
    </template>
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <div>
        <h2 class="text-xl font-semibold mb-2">
          JSON Schema
        </h2>
        <InputEditor v-model="schema" />
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">
          Generated JSON
        </h2>
        <OutputEditor v-model="output" />
      </div>
    </div>
    <template #footer>
      <UButton
        color="primary"
        @click="generateJSON"
      >
        Generate
      </UButton>
    </template>
  </UCard>
</template>
