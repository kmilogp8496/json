<script lang="ts" setup>
import type { JSONSchema } from '~/jsonSchemas';

interface SchemaExample {
  name: string
  schema: object
}

const schema = ref<string>('')
const output = ref<string>('')
const selectedExample = ref<SchemaExample | null>(null)

function updateSchemaFromExample(selected: SchemaExample | null): void {
  if (selected) {
    schema.value = JSON.stringify(selected.schema, null, 2)
  }
}

async function generateJSON() {
  try {
    const parsedSchema = JSON.parse(schema.value) as JSONSchema
    const generatedData = generateFromSchema(parsedSchema)
    output.value = JSON.stringify(generatedData, null, 2)
  }
  catch (error) {
    if (error instanceof Error) {
      output.value = 'Invalid JSON Schema: ' + error.message
    }
    else {
      output.value = 'An unknown error occurred'
    }
  }
}

function generateFromSchema(_schema: JSONSchema) {
  // ... (keep the existing generateFromSchema function)
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">
      JSON Generate
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h2 class="text-xl font-semibold mb-2">
          JSON Schema
        </h2>
        <UTextarea
          v-model="schema"
          :rows="10"
          placeholder="Enter your JSON schema here..."
        />
        <div class="mt-4">
          <h3 class="text-lg font-semibold mb-2">
            Example Schemas:
          </h3>
          <USelect
            v-model="selectedExample"
            :options="exampleSchemas"
            option-attribute="name"
            placeholder="Select an example schema"
            @update:model-value="updateSchemaFromExample"
          />
        </div>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">
          Generated JSON
        </h2>
        <UTextarea
          v-model="output"
          :rows="10"
          readonly
        />
      </div>
    </div>
    <UButton
      class="mt-4"
      color="primary"
      @click="generateJSON"
    >
      Generate
    </UButton>
  </div>
</template>
