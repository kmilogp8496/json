<script lang="ts" setup>
import { ref } from 'vue'

definePageMeta({
  keepalive: true,
})

useHead({
  title: 'Escape and Trim',
})

const input = ref<string>('')
const output = ref<string>('')
const toast = useToast()

async function escapeAndTrimJSON() {
  try {
    const trimmed = input.value.replace(/\s+/g, '').trim()
    const escaped = JSON.stringify(trimmed)
    output.value = escaped.slice(1, -1)
  }
  catch (error) {
    let message = 'An error occurred while minifying JSON'
    if (error instanceof Error) {
      message = error.message
    }
    toast.add({
      title: 'Error',
      description: message,
      icon: 'i-heroicons-information-circle',
      color: 'red',
    })
  }
}
</script>

<template>
  <UCard>
    <template #header>
      <h1 class="text-3xl">
        JSON Escape and Trim
      </h1>
    </template>
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <div>
        <h2 class="text-xl font-semibold mb-2">
          JSON Object
        </h2>
        <Input v-model="input" />
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">
          Output (Trimmed and Escaped)
        </h2>
        <Output v-model="output" />
      </div>
    </div>
    <template #footer>
      <UButton
        color="primary"
        @click="escapeAndTrimJSON"
      >
        Escape and Trim
      </UButton>
    </template>
  </UCard>
</template>
