<script setup lang="ts">
const { errorMessage = 'Failed to transform JSON', handler } = defineProps<{
  title: string
  inputTitle: string
  outputTitle: string
  handlerTitle: string
  errorMessage?: string
  handler: (value: string) => Promise<string> | string
}>()

const input = defineModel<string>('input', {
  default: '',
})

const output = defineModel<string>('output', {
  default: '',
})

const { loading, handle } = useJsonUtil(handler, {
  errorMessage,
  inputRef: input,
  outputRef: output,
})
</script>

<template>
  <UCard>
    <template #header>
      <h1 class="text-3xl">
        {{ title }}
      </h1>
    </template>
    <slot name="top" />
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <div>
        <h2 class="text-xl font-semibold mb-2">
          {{ inputTitle }}
        </h2>
        <InputEditor v-model="input" />
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">
          {{ outputTitle }}
        </h2>
        <OutputEditor v-model="output" />
      </div>
    </div>
    <template #footer>
      <UButton
        :loading
        color="primary"
        @click="handle"
      >
        {{ handlerTitle }}
      </UButton>
    </template>
  </UCard>
</template>
