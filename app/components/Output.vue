<script setup lang="ts">
const { lang = 'json' } = defineProps<{
  lang?: string
}>()

const model = defineModel<string>({
  default: '',
})
</script>

<template>
  <div class="relative">
    <CopyToClipboard
      :content="model"
      class="absolute top-2 right-2 z-10"
    />
    <ClientOnly>
      <Editor
        v-model="model"
        :lang
      />
    </ClientOnly>
  </div>
</template>
