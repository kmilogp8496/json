<script lang="ts" setup>
definePageMeta({
  keepalive: true,
})

useHead({
  title: 'Format',
})

const input = ref<string>('')
const output = ref<string>('')
const toast = useToast()

async function formatJSON(): Promise<void> {
  try {
    const parsed = JSON.parse(input.value)
    output.value = JSON.stringify(parsed, null, 4)
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
        JSON Format
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
          Output (Formatted)
        </h2>
        <Output v-model="output" />
      </div>
    </div>
    <template #footer>
      <UButton
        color="primary"
        @click="formatJSON"
      >
        Format
      </UButton>
    </template>
  </UCard>
</template>
