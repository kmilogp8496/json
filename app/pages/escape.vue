<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">
      JSON Escape and Trim
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h2 class="text-xl font-semibold mb-2">
          Input
        </h2>
        <UTextarea
          v-model="input"
          :rows="10"
          placeholder="Enter your JSON string to escape and trim..."
        />
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">
          Output
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
      @click="escapeAndTrimJSON"
    >
      Escape and Trim
    </UButton>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input = ref<string>('')
const output = ref<string>('')

async function escapeAndTrimJSON(): Promise<void> {
  try {
    // Trim whitespace and remove line jumps
    const trimmed = input.value.replace(/\s+/g, ' ').trim()

    // Escape the JSON string
    const escaped = JSON.stringify(trimmed)

    // Remove the surrounding quotes added by JSON.stringify
    output.value = escaped.slice(1, -1)

    // Store the escaped JSON in the database
  }
  catch (error) {
    if (error instanceof Error) {
      output.value = 'Error: ' + error.message
    }
    else {
      output.value = 'An unknown error occurred'
    }
  }
}
</script>
