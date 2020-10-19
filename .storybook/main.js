const babel = require('@babel/core')

module.exports = {
  stories: ['../src/**/__stories__/*.stories.mdx'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  babel: config => {
    const babelConfig = babel.loadPartialConfig({
      configFile: require.resolve('../babel.config'),
    })
    if (!babelConfig) {
      throw new Error('Failed to load Babel config')
    }
    return {
      ...config,
      ...babelConfig.options,
    }
  },
}
