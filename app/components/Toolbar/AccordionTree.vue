<script setup lang="ts">
import type { FileAccordionItem } from './types'

defineProps<{
  loading?: boolean
}>()

defineOptions({
  inheritAttrs: false,
})

const files = defineModel<FileAccordionItem[]>('files', {
  default: () => [],

})
const emit = defineEmits<{
  (event: 'delete', child: FileAccordionItem): void
}>()

const onDelete = (child: FileAccordionItem) => {
  files.value = files.value.filter(item => item.id !== child.id)
}

const filesWithChildren = computed(() => files.value.filter(item => item.children))
const filesWithoutChildren = computed(() => files.value.filter(item => !item.children))
</script>

<template>
  <div>
    <template v-if="loading">
      <div class="pl-2 pr-2 pb-2">
        <UIcon
          name="i-heroicons-arrow-path-20-solid"
          class="animate-spin"
        />
      </div>
    </template>
    <template v-if="filesWithoutChildren.length">
      <div class="pl-2 pr-2 pb-2">
        <ToolbarAccordionFile
          v-for="file in filesWithoutChildren"
          :key="file.id"
          :item="file"
          @delete="emit('delete', file)"
        />
      </div>
    </template>
    <UAccordion
      :items="filesWithChildren"
      default-open
      color="white"
    >
      <template #item="{ item }">
        <div class="pl-2">
          <ToolbarAccordionTree
            :files="item.children"
            @delete="onDelete(item)"
          />
        </div>
      </template>
    </UAccordion>
  </div>
</template>
