import { defineMain } from '@storybook/react-vite/node'
import remarkGfm from 'remark-gfm'

const main = defineMain({
  addons: [
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
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    'storybook-addon-tag-badges',
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
  },
})

export default main
