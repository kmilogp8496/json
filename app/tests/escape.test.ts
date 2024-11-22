import { createPage } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'
import { setup } from '~/tests/e2e/setup'

await setup()

const page = await createPage('/json/escape')

const config = useRuntimeConfig()
const inputContent = JSON.stringify({ site: config.public.siteName, description: config.public.siteDescription })

const escapedText = `"{\\"site\\":\\"${config.public.siteName}\\",\\"description\\":\\"${config.public.siteDescription}\\"}"`

describe('escape page', async () => {
  it('escape and trim', async () => {
    await page.getByTestId('input-editor').getByLabel('Editor content').fill(inputContent)
    await page.getByRole('button', { name: 'Escape and Trim' }).click()

    const element = page.getByText(escapedText)
    await element.waitFor({ state: 'visible' })
    expect(await element.isVisible()).toBe(true)
  })
})
