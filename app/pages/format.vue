<script lang="ts" setup>
definePageMeta({
  keepalive: true,
})

const input = ref<string>('')
const output = ref<string>('')

async function formatJSON(): Promise<void> {
  try {
    const parsed = JSON.parse(input.value)
    output.value = JSON.stringify(parsed, null, 4)
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
      JSON Format
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h2 class="text-xl font-semibold mb-2">
          Input
        </h2>
        <UTextarea
          v-model="input"
          :rows="10"
          placeholder="Enter your JSON here to format..."
        />
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">
          Output
        </h2>
        <UTextarea
          v-model="output"
          :rows="10"
        />
      </div>
    </div>
    <UButton
      class="mt-4"
      color="primary"
      @click="formatJSON"
    >
      Format
    </UButton>
  </div>
</template>
