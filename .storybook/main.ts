import { defineMain } from '@storybook/react-vite/node'
import remarkGfm from 'remark-gfm'

const stories = [
  '../packages/*/src/**/__stories__/index.stories.tsx',
  '../packages/*/src/**/__stories__/*.mdx',
  '../utils/stories/src/**/*.mdx',
  '../utils/stories/src/**/*.stories.tsx',
]

// oxlint-disable-next-line node/no-process-env
if (process.env['STORYBOOK_ENVIRONMENT'] !== 'production') {
  stories.push('../packages/ui/src/components/Overlay/Popup/__stories__/Popup.stories.tsx')
}

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
  stories,
})

export default main
