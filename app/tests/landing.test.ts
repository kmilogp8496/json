import { createPage, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

await setup({
  host: 'http://localhost:3000',
})

describe.concurrent('landing page content', async () => {
  const page = await createPage('/')

  it('displays the heading', async () => {
    const title = useRuntimeConfig().public.siteName
    expect(await page.getByRole('heading', { name: title }).isVisible()).toBe(true)
  })

  it('displays the description', async () => {
    const description = useRuntimeConfig().public.siteDescription
    expect(await page.getByText(description).isVisible()).toBe(true)
  })

  it('displays the links to the utilities', async () => {
    expect(await page.getByRole('link', { name: 'Escape', exact: true }).count()).toBe(2)
    expect(await page.getByRole('link', { name: 'Format' }).count()).toBe(2)
    expect(await page.getByRole('link', { name: 'Generate' }).count()).toBe(2)
    expect(await page.getByRole('link', { name: 'Minify' }).count()).toBe(2)
    expect(await page.getByRole('link', { name: 'Unescape' }).count()).toBe(2)
  })

  it('should display the features section', async () => {
    expect(await page.locator('[test-landing-card]').count()).toBe(8)
  })

  it('should display the testimonials section', async () => {
    expect(await page.locator('[test-landing-testimonial]').count()).toBe(6)
  })

  it('should display the cta section', async () => {
    expect(await page.getByRole('link', { name: 'Get started' }).isVisible()).toBe(true)
  })
})

describe('landing page', async () => {
  const page = await createPage('/')

  it('displays the heading', async () => {
    expect(await page.getByRole('heading', { name: 'JSON Utilities' }).isVisible()).toBe(true)
  })

  it('displays the links to the utilities', async () => {
    expect(await page.getByRole('link', { name: 'Escape', exact: true }).count()).toBe(2)
    expect(await page.getByRole('link', { name: 'Format' }).count()).toBe(2)
    expect(await page.getByRole('link', { name: 'Generate' }).count()).toBe(2)
    expect(await page.getByRole('link', { name: 'Minify' }).count()).toBe(2)
    expect(await page.getByRole('link', { name: 'Unescape' }).count()).toBe(2)
  })
})
