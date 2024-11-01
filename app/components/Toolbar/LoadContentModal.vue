<script setup lang="ts">
import type { FileAccordionItem } from './types'
import { apiClient } from '~/api/client'

const openModel = defineModel<boolean>()

const emit = defineEmits<{
  load: [string]
}>()

const files = ref<FileAccordionItem[]>([])
const currentTreeNode = ref<{ label: string, id: number } | null>(null)
const jsonContent = ref<string>('')
const loading = ref(false)
const toast = useToast()

type TreeNode = Map<string, TreeNode | number>

function convertMapToTree(map: TreeNode): FileAccordionItem[] {
  const result: FileAccordionItem[] = []

  for (const [name, node] of map) {
    const properties = typeof node === 'number'
      ? {
          id: node,
          async onClick(item: FileAccordionItem) {
            const response: object | string = await apiClient(`/api/json/${item.id}`, {
              method: 'GET',
            })

            jsonContent.value = typeof response === 'string' ? response : prettifyJson(response)

            toast.add({
              title: `Loaded file ${item.label}`,
              description: jsonContent.value ? 'File loaded successfully' : 'File seems to be empty',
              icon: 'i-heroicons-check',
            })
          },
          async onDelete(item: FileAccordionItem) {
            await apiClient(`/api/json/${item.id}`, {
              method: 'DELETE',
            })

            toast.add({
              title: `Deleted file ${item.label}`,
              description: 'File deleted successfully',
              icon: 'i-heroicons-check',
            })
          },
        }
      : { id: 0, children: convertMapToTree(node), icon: 'i-heroicons-folder' }

    const newResult = {
      label: name || '...',
      ...properties,
    }

    result.push(newResult)
  }

  return result
}

watch(() => openModel.value, async (value) => {
  if (value) {
    try {
      loading.value = true
      const jsonList = await apiClient('/api/json/list')

      const tree: TreeNode = new Map()

      for (const jsonListPath of jsonList) {
        const splitPath = jsonListPath.path.split('/')

        let currentNode: TreeNode = tree

        for (let i = 0; i < splitPath.length; i++) {
          const pathPart = splitPath[i]!

          if (!currentNode.has(pathPart)) {
            if (i === (splitPath.length - 1)) {
              currentNode.set(pathPart, jsonListPath.id)
            }
            else {
              currentNode.set(pathPart, new Map())
            }
          }

          const nextNode = currentNode.get(pathPart)!

          if (typeof nextNode === 'number') {
            continue
          }

          currentNode = nextNode
        }
      }

      files.value = convertMapToTree(tree)
    }
    finally {
      loading.value = false
    }
  }
}, { immediate: true })

watch(() => currentTreeNode.value, async () => {
  if (!currentTreeNode.value) {
    return
  }
})
</script>

<template>
  <UModal
    v-model="openModel"
    :ui="{
      width: '!max-w-3xl',
    }"
  >
    <UCard>
      <template #header>
        Load file
      </template>
      <UAlert
        v-if="!loading && files.length === 0"
        icon="i-heroicons-document-text"
        color="primary"
        variant="outline"
        title="No files found"
        class="mb-4"
      >
        <template #description>
          You can add files to your app using the save content button &nbsp; <ToolbarSaveContentButton /> &nbsp; located in the editor's toolbar.
        </template>
      </UAlert>
      <ToolbarAccordionTree
        :files
        :loading
      />
      <ClientOnly>
        <LazyBaseEditor
          v-show="!!jsonContent"
          v-model="jsonContent"
          height="h-[400px]"
          lang="json"
        />
      </ClientOnly>
      <template #footer>
        <UButton @click="emit('load', jsonContent)">
          Load
        </UButton>
      </template>
    </UCard>
  </UModal>
</template>
