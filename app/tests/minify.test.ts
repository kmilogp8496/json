import { createPage, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

await setup({
  host: 'http://localhost:3000',
})

const page = await createPage('/json/minify')

const config = useRuntimeConfig()
const inputContent = `{
  "site": "${config.public.siteName}",
  "description": "${config.public.siteDescription}"
}`

const minifiedText = `{"site":"${config.public.siteName}","`

describe('minify page', async () => {
  it('formats the given input', async () => {
    await page.getByTestId('input-editor').getByLabel('Editor content').fill(inputContent)
    await page.getByRole('button', { name: 'Minify' }).click()

    const element = page.getByTestId('output-editor').getByRole('code').locator('div').filter({ hasText: minifiedText }).nth(4)
    await element.waitFor({ state: 'visible' })
    expect(await element.isVisible()).toBe(true)
  })
})
