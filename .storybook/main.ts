import type { StorybookConfig } from '@storybook/react-vite'

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
} satisfies StorybookConfig
