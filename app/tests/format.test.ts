import { createPage } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'
import { setup } from '~/tests/e2e/setup'

await setup()

const page = await createPage('/json/format')

const config = useRuntimeConfig()
const inputContent = JSON.stringify({ site: config.public.siteName, description: config.public.siteDescription })

const formattedText = `{ "site": "${config.public.siteName}", "`

describe('format page', async () => {
  it('formats the given input', async () => {
    await page.getByTestId('input-editor').getByLabel('Editor content').fill(inputContent)
    await page.getByRole('button', { name: 'Format' }).click()

    const element = page.getByText(formattedText)
    await element.waitFor({ state: 'visible' })
    expect(await element.isVisible()).toBe(true)
  })
})
