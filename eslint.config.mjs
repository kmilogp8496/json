// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt().overrideRules({
  'vue/component-tags-order': ['error', {
    order: ['script', 'template', 'style'],
  }],
})
