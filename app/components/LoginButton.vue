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

const onLogin = (provider: 'github' | 'google') => {
  windowProxy.value = window.open(`/auth/${provider}`, '_blank')
  interval.resume()
}
</script>

<template>
  <UPopover
    v-model:open="open"
    :popper="{ placement: 'bottom-start' }"
  >
    <UButton
      color="white"
      variant="solid"
      class="uppercase"
      :icon="loggedIn ? '' : 'i-heroicons-lock-closed'"
      :label="loggedIn ? user?.email.at(0) : ''"
    />
    <template #panel>
      <div class="flex flex-col gap-2 p-4">
        <UBadge
          color="white"
          class="w-min ml-auto"
        >
          {{ loggedIn ? user?.email : 'Anonymous' }}
        </UBadge>

        <template v-if="!loggedIn">
          <UButton
            color="primary"
            variant="solid"
            @click="onLogin('github')"
          >
            Login with GitHub <UIcon name="i-simple-icons-github" />
          </UButton>
          <UButton
            color="primary"
            variant="solid"
            class="ml-auto"
            @click="onLogin('google')"
          >
            Login with Google <UIcon name="i-simple-icons-google" />
          </UButton>
        </template>
        <UButton
          v-else
          class="ml-auto"
          color="primary"
          variant="solid"
          @click="onLogout"
        >
          Logout
        </UButton>
      </div>
    </template>
  </UPopover>
</template>
