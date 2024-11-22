import { setup as setupE2E } from '@nuxt/test-utils/e2e'

export const setup = async () => {
  await setupE2E({
    host: 'https://json.kmilo.dev',
  })
}
