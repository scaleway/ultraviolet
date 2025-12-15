import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import type { StorybookConfig } from '@storybook/react-vite'
import remarkGfm from 'remark-gfm'

const require = createRequire(import.meta.url);

const getAbsolutePath = (value: string): string => {
  return dirname(require.resolve(join(value, "package.json")));
}

export default {
  stories: [
    '../packages/*/src/**/__stories__/**/*.mdx',
    '../packages/*/src/**/__stories__/index.stories.tsx',
    '../utils/stories/src/**/*.mdx',
    '../utils/stories/src/**/index.stories.tsx'
  ],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-themes"),
    getAbsolutePath("storybook-addon-tag-badges"),
    {
      name: getAbsolutePath("@storybook/addon-docs"),
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
    name: getAbsolutePath("@storybook/react-vite"),
    options: {
      builder: {
        viteConfigPath: '.storybook/vite.config.ts',
      },
    },
  },

  core: {
    builder: getAbsolutePath("@storybook/builder-vite"),
    disableTelemetry: true,
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  }
} satisfies StorybookConfig
