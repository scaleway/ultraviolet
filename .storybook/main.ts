import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default {
  stories: [
    '../packages/*/src/**/__stories__/**/*.stories.mdx',
    '../packages/*/src/**/__stories__/index.stories.tsx',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    'storybook-dark-mode',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      assetsInclude: ['**/*.md'],
      plugins: [svgr()],
    })
  },
} satisfies StorybookConfig
