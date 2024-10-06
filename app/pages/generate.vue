<script lang="ts" setup>
import { generateJsonData } from '~/api/json'
import type { SchemaExample } from '~/jsonSchemas'
import examples from '~/jsonSchemas/examples.json'
import type { Schema } from '~~/@types/faker'

const schema = ref<string>(prettifyJson(examples[0]!.schema))
const output = ref<string>('')
const selectedExample = ref(examples[0])

function updateSchemaFromExample(selected: SchemaExample) {
  if (selected) {
    schema.value = prettifyJson(selected.schema)
  }
}

async function generateJSON() {
  try {
    const parsedSchema = JSON.parse(schema.value) as Schema
    const generatedData = await generateFromSchema(parsedSchema)
    output.value = prettifyJson(generatedData)
  }
  catch (error) {
    console.error('Error: ', error)
    if (error instanceof Error) {
      output.value = 'Invalid JSON Schema: ' + error.message
    }
    else {
      output.value = 'An unknown error occurred'
    }
  }
}

async function generateFromSchema(schema: Schema) {
  const { result } = await generateJsonData(schema)

  return result
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">
      JSON Generate
    </h1>
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <div>
        <h2 class="text-xl font-semibold mb-2">
          JSON Schema
        </h2>
        <ClientOnly>
          <Editor
            v-model="schema"
            lang="json"
          />
        </ClientOnly>
        <h3
          class="text-lg font-semibold mb-2"
        >
          Example Schemas:
        </h3>
        <USelectMenu
          v-model="selectedExample"
          :options="examples"
          option-attribute="name"
          placeholder="Select an example schema"
          @update:model-value="updateSchemaFromExample"
        />
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">
          Generated JSON
        </h2>
        <Output v-model="output" />
      </div>
    </div>
    <div class="pt-4 flex justify-end gap-4">
      <UButton
        color="primary"
        @click="generateJSON"
      >
        Generate
      </UButton>
    </div>
  </div>
</template>
