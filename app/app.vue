<template>
  <div>
    <UContainer :ui="{ constrained: 'max-w-full' }">
      <UCard class="mt-4">
        <template #header>
          <nav class="flex justify-between items-center p-4">
            <NuxtLink
              to="/"
              class="font-bold text-xl"
            >
              JSON Utilities
            </NuxtLink>
            <div class="space-x-2">
              <UButton
                to="/minify"
                variant="ghost"
              >
                Minify
              </UButton>
              <UButton
                to="/format"
                variant="ghost"
              >
                Format
              </UButton>
              <UButton
                to="/escape"
                variant="ghost"
              >
                Escape
              </UButton>
              <UButton
                to="/generate"
                variant="ghost"
              >
                Generate
              </UButton>
            </div>
          </nav>
        </template>
        <NuxtPage />
      </UCard>
    </UContainer>
    <UNotifications />
  </div>
</template>
