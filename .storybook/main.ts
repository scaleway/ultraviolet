import type { StorybookConfig } from '@storybook/react-webpack5'

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
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  webpackFinal: async config => {
    config?.module?.rules?.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: { svgo: false, memo: true }, // We disable svgo because we have custom configuration for it svgo.config.js
        },
      ],
      type: 'javascript/auto',
      issuer: {
        and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
      },
    })

    return config
  },
} satisfies StorybookConfig
