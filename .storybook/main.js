const path = require('path')

module.exports = {
  core: {
    builder: 'webpack5',
  },
  typescript: {
    // also valid 'react-docgen-typescript' | false
    reactDocgen: 'react-docgen-typescript',
  },
  stories: [
    '../src/**/__stories__/*.stories.mdx',
    '../src/**/__stories__/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  webpackFinal: config => {
    const cwd = process.cwd()

    // TODO: remove when storybook supports emotion 11
    config.resolve.alias = {
      ...config.resolve.alias,
      '@emotion/core': path.join(cwd, 'node_modules', '@emotion', 'react'),
      '@emotion/styled': path.join(cwd, 'node_modules', '@emotion', 'styled'),
      '@emotion/styled-base': path.join(
        cwd,
        'node_modules',
        '@emotion',
        'styled',
      ),
      'emotion-theming': path.join(cwd, 'node_modules', '@emotion', 'react'),
    }

    // This is only needed for @storybook/addon-a11y
    config.resolve.fallback = {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify'),
    }

    return config
  },
}
