import { join } from 'path'
import { Configuration } from 'webpack'

export default {
  core: {
    builder: 'webpack5',
  },
  features: {
    // storyStoreV7: true,
    previewMdx2: true,
  },
  typescript: {
    // also valid 'react-docgen-typescript' | false
    reactDocgen: 'react-docgen-typescript',
  },
  stories: [
    '../**/__stories__/**/*.stories.mdx',
    '../**/__stories__/*.stories.tsx',
    '../**/docs/**/*.stories.mdx',
    '../**/docs/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    'storybook-dark-mode/register',
  ],
  webpackFinal: (config: Configuration) => {
    const cwd = process.cwd()
    // TODO: remove when storybook supports emotion 11
    const newConfig = config
    newConfig.resolve = {
      ...(newConfig?.resolve ? newConfig.resolve : {}),
      alias: {
        ...(newConfig?.resolve?.alias ? newConfig.resolve.alias : {}),
        '@emotion/core': join(cwd, 'node_modules', '@emotion', 'react'),
        '@emotion/styled': join(cwd, 'node_modules', '@emotion', 'styled'),
        '@emotion/styled-base': join(cwd, 'node_modules', '@emotion', 'styled'),
        'emotion-theming': join(cwd, 'node_modules', '@emotion', 'react'),
      },
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        path: require.resolve('path-browserify'),
      },
    }

    return config
  },
}
