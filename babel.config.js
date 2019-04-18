module.exports = function getConfig(api) {
  const isRollup = api.caller(
    caller => caller && caller.name === 'rollup-plugin-babel',
  )
  if (!isRollup) return {}
  return {
    presets: [
      ['@babel/preset-env', { loose: true, modules: false }],
      '@babel/preset-react',
      [
        '@emotion/babel-preset-css-prop',
        { autoLabel: true, labelFormat: '[filename]--[local]' },
      ],
    ],
    plugins: [
      'babel-plugin-emotion',
      'babel-plugin-annotate-pure-calls',
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['babel-plugin-module-resolver', { root: ['./src'] }],
    ],
  }
}
