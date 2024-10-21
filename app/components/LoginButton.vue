<script lang="ts" setup>
const { loggedIn, user, clear, fetch } = useUserSession()

const onLogout = () => {
  clear()
}

const open = defineModel<boolean>('open', {
  default: false,
})

const windowProxy = shallowRef<Window | null>(null)
const toast = useToast()

const interval = useIntervalFn(async () => {
  if (!windowProxy.value) {
    interval.pause()
    return
  }

  if (!windowProxy.value.closed) {
    return
  }

  interval.pause()

  await fetch()

  if (!loggedIn.value) {
    toast.add({
      title: 'Login failed',
      description: 'Please try again',
      color: 'red',
      icon: 'i-heroicons-x-circle',
    })
  }

  toast.add({
    title: 'Login successful',
    description: 'You are now logged in as ' + user.value?.email,
    color: 'green',
    icon: 'i-heroicons-check-circle',
  })

  open.value = false
}, 100)

const onLogin = () => {
  windowProxy.value = window.open('/auth/github', '_blank')
  interval.resume()
}
</script>

<template>
  <UPopover v-model:open="open">
    <UButton
      color="white"
      variant="solid"
      :icon="loggedIn ? 'i-heroicons-user' : 'i-heroicons-key'"
    />
    <template #panel>
      <div class="flex items-center gap-2 p-4">
        <UBadge>
          {{ loggedIn ? user?.email : 'Anonymous' }}
        </UBadge>

        <UButton
          v-if="!loggedIn"
          color="white"
          variant="solid"
          class="ml-auto"
          @click="onLogin"
        >
          Login with GitHub <UIcon name="i-simple-icons-github" />
        </UButton>
        <UButton
          v-else
          class="ml-auto"
          color="white"
          variant="solid"
          @click="onLogout"
        >
          Logout
        </UButton>
      </div>
    </template>
  </UPopover>
</template>
