<script setup lang="ts">
const { errorMessage = 'Failed to transform JSON', handler } = defineProps<{
  title: string
  firstInputTitle: string
  secondInputTitle: string
  handlerTitle: string
  errorMessage?: string
  handler: (firstValue: string, secondValue: string) => { original: string, modified: string }
}>()

const firstInput = defineModel<string>('firstInput', {
  default: '',
})

const secondInput = defineModel<string>('secondInput', {
  default: '',
})

const output = ref<{ original: string, modified: string }>({
  original: '',
  modified: '',
})

const { handle } = useMultipleJsonUtil(handler, {
  errorMessage,
  firstInputRef: firstInput,
  secondInputRef: secondInput,
  outputRef: output,
})

const computedHasOutput = computed(() => output.value.modified || output.value.original)
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
          {{ firstInputTitle }}
        </h2>
        <InputEditor v-model="firstInput" />
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">
          {{ secondInputTitle }}
        </h2>
        <InputEditor v-model="secondInput" />
      </div>
    </div>
    <template #footer>
      <UButton
        color="primary"
        @click="handle"
      >
        {{ handlerTitle }}
      </UButton>
    </template>
    <div v-if="computedHasOutput">
      <h2 class="text-xl font-semibold mb-2">
        Resultado
      </h2>
      <OutputDiffEditor
        v-model:original="output.original"
        v-model:modified="output.modified"
      />
    </div>
  </UCard>
</template>
