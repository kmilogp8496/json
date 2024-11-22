<script setup lang="ts">
import type { UnwrapRef } from 'vue'
import { z } from 'zod'

const { pathPrefix } = defineProps<{
  pathPrefix: string
  loading?: Ref<boolean>
}>()

const state = ref({
  name: pathPrefix,
})

const emit = defineEmits<{
  save: [UnwrapRef<typeof state>]
}>()

const schema = z.object({
  name: z.string().min(1, 'A path is required'),
})

const onSaveContent = () => {
  emit('save', state.value)
}
</script>

<template>
  <UModal>
    <UCard>
      <template #header>
        Save content to
      </template>
      <UForm
        class="p-4"
        :state
        :schema
      >
        <UFormGroup
          label="Path of the content to save"
          name="name"
        >
          <UInput
            v-model="state.name"
          />
        </UFormGroup>
      </UForm>
      <template #footer>
        <UButton
          class="ml-auto"
          :loading="loading?.value"
          @click="onSaveContent"
        >
          Save
        </UButton>
      </template>
    </UCard>
  </UModal>
</template>
