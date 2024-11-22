<script lang="ts" setup>
import { ToolbarSaveContentModal } from '#components'
import { apiClient } from '~/api/client'

const { openLogin } = useLoginContext()

const { pathPrefix = '/', content } = defineProps<{
  pathPrefix?: string
  content: string
}>()

const modal = useModal()
const toast = useToast()
const loading = ref(false)

const { loggedIn } = useUserSession()

const onOpenSaveContentModal = () => {
  if (!content) {
    toast.add({
      title: 'No content',
      description: 'There is no content to save',
      icon: 'i-lucide-archive-x',
    })
    return
  }

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
    loading,
    async onSave({ name }) {
      try {
        loading.value = true
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
      }
      finally {
        loading.value = false
      }
    },
  })
}
</script>

<template>
  <UTooltip text="Save content">
    <ToolbarSaveContentButton @click="onOpenSaveContentModal" />
  </UTooltip>
</template>
