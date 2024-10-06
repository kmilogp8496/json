import type { BuiltinTheme } from 'shiki'

export const useShikiTheme = () => {
  const colorMode = useColorMode()

  const theme = computed<BuiltinTheme>(() => {
    return colorMode.value === 'dark' ? 'vitesse-dark' : 'vitesse-light'
  })

  return { theme }
}
