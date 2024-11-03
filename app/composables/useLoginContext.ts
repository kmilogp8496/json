export default function useLoginContext() {
  const injection = inject<{
    openLogin: () => void
    closeLogin: () => void
    isLoginOpen: Ref<boolean>
  }>('loginContext')

  if (!injection) {
    throw new Error('login context needs to be provided')
  }

  return injection
}
