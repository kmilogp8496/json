<script setup lang="ts">
import type { FileAccordionItem } from './types'

const props = defineProps<{
  item: FileAccordionItem
}>()

const emit = defineEmits<{
  delete: [FileAccordionItem]
  click: [FileAccordionItem]
}>()

const loading = ref(false)

const loadingDelete = ref(false)

const icon = computed(() => {
  const extension = props.item.label.split('.').pop()
  switch (extension) {
    case 'md':
      return 'i-fa6-brands-markdown'
    case 'json':
      return 'i-majesticons-curly-braces'
    default:
      return 'i-heroicons-document-text'
  }
})

const handleClick = async () => {
  emit('click', props.item)
  loading.value = true
  try {
    await props.item.onClick?.(props.item)
  }
  finally {
    loading.value = false
  }
}

const handleDelete = async () => {
  emit('delete', props.item)
  loadingDelete.value = true
  try {
    await props.item.onDelete?.(props.item)
  }
  finally {
    loadingDelete.value = false
  }
}
</script>

<template>
  <div
    class="flex justify-between"
  >
    <UButton
      color="white"
      :icon="icon"
      :loading
      size="xs"
      @click="handleClick"
    >
      {{ item.label }}
    </UButton>
    <UTooltip
      :text="`Delete ${item.label}`"
    >
      <UButton
        color="red"
        icon="i-heroicons-trash"
        variant="soft"
        size="xs"
        :loading="loadingDelete"
        @click="handleDelete"
      />
    </UTooltip>
  </div>
</template>
