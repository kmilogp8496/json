<template>
  <div>
    <AppHeader container-class="max-w-[1900px]" />
    <UMain class="flex flex-col">
      <UContainer
        :ui="{ constrained: 'max-w-[1900px] w-full' }"
        class="p-4"
      >
        <NuxtPage />
      </UContainer>
      <AppFooter class="mt-auto" />
    </UMain>
    <UNotifications />
  </div>
</template>
