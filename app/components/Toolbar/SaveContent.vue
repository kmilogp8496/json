<script lang="ts" setup>
import { ToolbarSaveContentModal } from '#components'
import { apiClient } from '~/api/client'

const { openLogin } = inject<{
  openLogin: () => void
  closeLogin: () => void
}>('loginContext', {
      openLogin: () => {},
      closeLogin: () => {},
    })

const { pathPrefix = '/', content } = defineProps<{
  pathPrefix?: string
  content: string
}>()

const modal = useModal()
const toast = useToast()

const { loggedIn } = useUserSession()

const onOpenSaveContentModal = () => {
  if (!loggedIn.value) {
    openLogin()
    toast.add({
      title: 'Login required',
      description: 'Please login to save content',
      color: 'amber',
    })
    return
  }

  modal.open(ToolbarSaveContentModal, {
    pathPrefix,
    async onSave({ name }) {
      await apiClient('/api/json/store', {
        method: 'POST',
        body: {
          name,
          content,
        },
      })

      toast.add({
        title: 'Saved',
        description: 'Content saved successfully on path: ' + name,
      })

      modal.close()
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
