import type { StorybookConfig } from '@storybook/react-vite'
import remarkGfm from 'remark-gfm'

export default {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    'storybook-addon-tag-badges',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],

  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
  },

  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: '.storybook/vite.config.ts',
      },
    },
  },
  stories: [
    '../packages/*/src/**/__stories__/index.stories.tsx',
    '../utils/stories/src/**/*.mdx',
  ],

  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: false,
      shouldExtractValuesFromUnion: false,
      shouldSortUnions: true,
      tsconfigPath: 'tsconfig.json',
    },
  },
} satisfies StorybookConfig
