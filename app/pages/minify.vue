<script lang="ts" setup>
import { ref } from 'vue'

definePageMeta({
  keepalive: true,
})

const input = ref('')
const output = ref('')

async function minifyJSON() {
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

<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">
      JSON Minify
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h2 class="text-xl font-semibold mb-2">
          Input
        </h2>
        <UTextarea
          v-model="input"
          :rows="10"
          placeholder="Enter your JSON here..."
        />
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">
          Output (Minified)
        </h2>
        <UTextarea
          v-model="output"
          tabindex="-1"
          :rows="10"
          readonly
        />
      </div>
    </div>
    <UButton
      class="mt-4"
      @click="minifyJSON"
    >
      Minify
    </UButton>
  </div>
</template>
