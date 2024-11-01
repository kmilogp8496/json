<script lang="ts" setup>
import LoadContentModal from './LoadContentModal.vue'

const emit = defineEmits<{
  load: [string]
}>()

const { loggedIn } = useUserSession()

const { openLogin } = useLoginContext()

const modal = useModal()
const toast = useToast()

const onOpenModal = () => {
  if (!loggedIn.value) {
    toast.add({
      title: 'Login required',
      description: 'Please login to load your saved files',
      color: 'amber',
    })
    openLogin()
    return
  }

  modal.open(LoadContentModal, {
    onLoad: (data) => {
      emit('load', data)
    },
  })
}
</script>

<template>
  <UTooltip text="Load content">
    <UButton
      color="blue"
      icon="i-heroicons-arrow-down-tray"
      variant="soft"
      @click="onOpenModal"
    />
  </UTooltip>
</template>
