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
      class="absolute top-0 left-0 z-10"
    />
    <DeleteContent
      :content="model"
      class="absolute top-9 left-0 z-10"
      @click="model = ''"
    />
    <ClientOnly>
      <LazyBaseEditor
        v-model="model"
        :lang
      />
    </ClientOnly>
  </div>
</template>
