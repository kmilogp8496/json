<script setup lang="ts">
const { lang = 'json' } = defineProps<{
  lang?: string
}>()

const original = defineModel<string>('original', {
  default: '',
})

const modified = defineModel<string>('modified', {
  default: '',
})
</script>

<template>
  <div class="relative min-h-[600px]">
    <ClientOnly>
      <LazyBaseDiffEditor
        :original
        :modified
        :lang
      />
    </ClientOnly>
  </div>
</template>
