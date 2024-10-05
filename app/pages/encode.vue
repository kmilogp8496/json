<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">
      JSON Encode
    </h1>
    <div class="flex flex-col md:flex-row gap-4">
      <div class="w-full md:w-1/2">
        <h2 class="text-xl font-semibold mb-2">
          Input
        </h2>
        <textarea
          v-model="input"
          class="w-full h-64 p-2 border border-gray-300 rounded"
          placeholder="Enter your JSON here..."
        />
      </div>
      <div class="w-full md:w-1/2">
        <h2 class="text-xl font-semibold mb-2">
          Output
        </h2>
        <pre class="w-full h-64 p-2 bg-gray-100 border border-gray-300 rounded overflow-auto">{{ output }}</pre>
      </div>
    </div>
    <button
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      @click="encodeJSON"
    >
      Encode
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input = ref<string>('')
const output = ref<string>('')

function encodeJSON(): void {
  try {
    const parsed = JSON.parse(input.value)
    output.value = JSON.stringify(parsed)
  }
  catch (error) {
    if (error instanceof Error) {
      output.value = 'Invalid JSON: ' + error.message
    }
    else {
      output.value = 'An unknown error occurred'
    }
  }
}
</script>
