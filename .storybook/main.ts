import type { StorybookConfig } from '@storybook/react-vite'
import remarkGfm from 'remark-gfm'

export default {
  stories: [
    '../packages/*/src/**/__stories__/index.stories.tsx',
    '../utils/stories/src/**/*.mdx'
  ],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-a11y", 
    "@storybook/addon-themes",
    "storybook-addon-tag-badges",
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    }
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: '.storybook/vite.config.ts',
      },
    },
  },

  core: {
    builder: "@storybook/builder-vite",
    disableTelemetry: true,
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  }
} satisfies StorybookConfig
