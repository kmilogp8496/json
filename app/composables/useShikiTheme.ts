import type { BuiltinTheme, ThemeRegistration } from 'shiki'
import { bundledThemes } from 'shiki'

const excludedThemes: BuiltinTheme[] = [
  'github-dark-default',
  'github-dark-dimmed',
  'github-dark-high-contrast',
  'github-light',
  'github-light-default',
  'github-light-high-contrast',
  'vesper',
] as const

const filteredBundledThemes = Object.fromEntries(Object.entries(bundledThemes).filter(([theme]) => !excludedThemes.includes(theme as BuiltinTheme)))

const defaultThemes = {
  light: 'github-light',
  dark: 'github-dark',
} as const

let themes: Required<ThemeRegistration>[] = []

export const useShikiTheme = async () => {
  const colorMode = useColorMode()
  if (!themes.length) {
    themes = await Promise.all(Object.values(filteredBundledThemes).map(async theme => await theme().then(theme => theme.default as Required<ThemeRegistration>)))
  }

  const preferredTheme = useLocalStorage<BuiltinTheme>('preferred-theme', defaultThemes[colorMode.value as 'light' | 'dark'])

  const availableThemes = themes.map(theme => ({ label: theme.displayName, value: theme.name, type: theme.type }))

  return { availableThemes, preferredTheme }
}
