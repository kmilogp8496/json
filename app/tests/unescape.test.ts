import { createPage, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

await setup({
  host: 'http://localhost:3000',
})
const config = useRuntimeConfig()

const unescapedText = `{ "site": "${config.public.siteName}", "`

describe.concurrent('unescape page', async () => {
  it('unescape with quotes included', async () => {
    const page = await createPage('/json/unescape')
    const inputContentWithQuotes = `"{\\"site\\":\\"${config.public.siteName}\\",\\"description\\":\\"${config.public.siteDescription}\\"}"`

    await page.getByTestId('input-editor').getByLabel('Editor content').fill(inputContentWithQuotes)
    await page.getByRole('button', { name: 'Unescape' }).click()

    const element = page.getByText(unescapedText)
    await element.waitFor({ state: 'visible' })
    expect(await element.isVisible()).toBe(true)
  })

  it('unescape without quotes included', async () => {
    console.log(config.public.siteName)
    const page = await createPage('/json/unescape')

    const inputContentWithoutQuotes = `{\\"site\\":\\"${config.public.siteName}\\",\\"description\\":\\"${config.public.siteDescription}\\"}`

    await page.getByTestId('input-editor').getByLabel('Editor content').fill(inputContentWithoutQuotes)
    await page.getByRole('button', { name: 'Unescape' }).click()

    const element = page.getByText(unescapedText)
    await element.waitFor({ state: 'visible' })
    expect(await element.isVisible()).toBe(true)
  })
})
