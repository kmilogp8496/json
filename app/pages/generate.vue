<script lang="ts" setup>
import type { SchemaExample } from '~/jsonSchemas'
import examples from '~/jsonSchemas/examples.json'
import { fakeGenerator, type Schema } from '~/utils/fakeGenerator'

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
    output.value = prettifyJson(generatedData as object)
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

async function generateFromSchema(schema: Schema) {
  const result = await fakeGenerator(schema)

  return result
}

const clipboard = useClipboard()
const toast = useToast()

async function onCopyOuput() {
  await clipboard.copy(output.value)
  toast.add({
    title: 'Copied',
    description: 'Output copied to clipboard',
  })
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
          :rows="20"
          placeholder="Enter your JSON schema here..."
        />
        <h3 class="text-lg font-semibold mb-2">
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
        <UTextarea
          v-model="output"
          :rows="20"
          readonly
        />
      </div>
    </div>
    <div class="pt-4 flex justify-end gap-4">
      <UButton
        color="primary"
        @click="generateJSON"
      >
        Generate
      </UButton>
      <UButton
        color="primary"
        icon="i-heroicons-clipboard-document"
        @click="onCopyOuput"
      >
        Copy ouput
      </UButton>
    </div>
  </div>
</template>
