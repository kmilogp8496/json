<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">
      JSON History
    </h1>
    <div
      v-for="(section, index) in sections"
      :key="index"
      class="mb-8"
    >
      <h2 class="text-2xl font-semibold mb-2">
        {{ section.title }}
      </h2>
      <div
        v-for="item in section.data"
        :key="item.id"
        class="mb-4 p-4 bg-gray-100 rounded"
      >
        <pre class="whitespace-pre-wrap">{{ item.content }}</pre>
        <p class="text-sm text-gray-500 mt-2">
          Created at: {{ new Date(item.createdAt).toLocaleString() }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

interface HistoryItem {
  id: number
  content: string
  createdAt: number
}

interface HistorySection {
  title: string
  data: HistoryItem[]
}

const sections = ref<HistorySection[]>([])

onMounted(async () => {
  sections.value = [
    { title: 'Minified JSON', data: minified },
    { title: 'Formatted JSON', data: formatted },
    { title: 'Escaped JSON', data: escaped },
    { title: 'Generated JSON', data: generated.map(item => ({ ...item, content: `Schema: ${item.schema}\n\nGenerated: ${item.content}` })) },
  ]
})
</script>
