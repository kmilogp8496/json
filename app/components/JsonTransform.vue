<script setup lang="ts">
const { errorMessage = 'Failed to transform JSON', handler, ...props } = defineProps<{
  title: string
  inputTitle: string
  outputTitle: string
  handlerTitle: string
  errorMessage?: string
  handler: (value: string) => Promise<string> | string
  pathPrefix?: string
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

const { preferredTheme, availableThemes } = await useShikiTheme()
const route = useRoute()

const pathPrefix = computed(() => props.pathPrefix || route.path)
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex justify-between">
        <h1 class="text-3xl">
          {{ title }}
        </h1>
        <div class="inline-flex items-center gap-4">
          <slot name="actions" />
          <ClientOnly>
            <USelectMenu
              v-model="preferredTheme"
              :options="availableThemes"
              option-attribute="label"
              value-attribute="value"
              class="w-40"
              size="sm"
            />
          </ClientOnly>
          <UButton
            :loading
            color="primary"
            @click="handle"
          >
            {{ handlerTitle }}
          </UButton>
        </div>
      </div>
    </template>
    <slot name="top" />
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <div>
        <h2 class="text-xl font-semibold mb-2">
          {{ inputTitle }}
        </h2>
        <InputEditor
          v-model="input"
          :path-prefix="pathPrefix + '/input/'"
        />
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">
          {{ outputTitle }}
        </h2>
        <OutputEditor
          v-model="output"
          :path-prefix="pathPrefix + '/output/'"
        />
      </div>
    </div>
  </UCard>
</template>
