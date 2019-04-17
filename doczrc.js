import path from 'path'

function modifyBundlerConfig(config) {
  config.module.rules.push({
    test: /\.css?$/,
    use: ['style-loader', 'css-loader'],
  })

  config.resolve.alias = {
    ...config.resolve.alias,
    'scaleway-ui': path.join(__dirname, 'src'),
  }

  return config
}

function modifyBabelRc(config) {
  // console.log(JSON.stringify(config, null, 2))
  config.presets.push([
    '@emotion/babel-preset-css-prop',
    { autoLabel: true, labelFormat: '[filename]--[local]' },
  ])
  config.plugins.push(['babel-plugin-module-resolver', { root: ['./src'] }])
  return config
}

export default {
  codeSandbox: false,
  title: 'Scaleway UI',
  description: 'Scaleway UI library',
  ordering: 'ascending',
  menu: ['Home', 'Migration', 'Components'],
  modifyBundlerConfig,
  modifyBabelRc,
  wrapper: 'docs/config/Wrapper',
  indexHtml: 'docs/config/index.html',
}
