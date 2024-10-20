<script lang="ts" setup>
import { ToolbarSaveContentModal } from '#components'

const { pathPrefix = '/' } = defineProps<{
  pathPrefix?: string
}>()

const modal = useModal()
const toast = useToast()

const onOpenSaveContentModal = () => {
  modal.open(ToolbarSaveContentModal, {
    pathPrefix,
    onSave({ name }) {
      toast.add({
        title: 'Saved',
        description: 'Content saved successfully',
      })
      console.log(name)
    },
  })
}
</script>

<template>
  <UTooltip text="Save content">
    <UButton
      color="amber"
      icon="i-heroicons-bookmark"
      variant="soft"
      @click="onOpenSaveContentModal"
    />
  </UTooltip>
</template>
