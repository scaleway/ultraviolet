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
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async config => {
    const imageRule = config.module?.rules?.find(rule => {
      const test = (rule as { test: RegExp }).test

      if (!test) {
        return false
      }

      return test.test('.svg')
    }) as { [key: string]: any }

    imageRule['exclude'] = /\.svg$/

    config.module?.rules?.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
        },
        {
          loader: 'file-loader',
          options: {
            name: 'static/media/[path][name].[ext]',
          },
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
