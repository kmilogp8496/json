<script setup lang="ts">
import type { NavigationTree } from '@nuxt/ui-pro/types'
import type { UnwrapRef } from 'vue'
import { z } from 'zod'
import { apiClient } from '~/api/client'

const { pathPrefix } = defineProps<{
  pathPrefix: string
}>()

const open = defineModel<boolean>()

const emit = defineEmits<{
  load: [{ name: string, content: string }]
}>()

const files = ref<NavigationTree[]>([])

watch(open, (value) => {
  if (value) {
    const result = await apiClient('/api/json/list')

    const navigationTree: NavigationTree[] = []

    for (const file of result) {
      const splitPath = file.path.split('/')
    }
  }
})
</script>

<template>
  <UModal>
    <UCard>
      <template #header>
        Load saved content
      </template>

      <template #footer>
        <UButton @click="emit('load', {})">
          Load
        </UButton>
      </template>
    </UCard>
  </UModal>
</template>
