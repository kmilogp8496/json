<script setup lang="ts">
defineProps<{
  title: string
  firstInputTitle: string
}>()

const { preferredTheme, availableThemes } = await useShikiTheme()
</script>

<template>
  <UCard :ui="{ background: '!bg-transparent' }">
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
        </div>
      </div>
    </template>
    <slot name="top" />
    <div>
      <div>
        <h2 class="text-xl font-semibold mb-2">
          {{ firstInputTitle }}
        </h2>
        <OutputDiffEditor />
      </div>
    </div>
  </UCard>
</template>
