import type { HeaderLink } from '@nuxt/ui-pro/types'

export default function useLinksContext() {
  return inject('linksContext', [] as (HeaderLink & { icon: string, description: string })[])
}
