/* eslint-disable import/no-extraneous-dependencies */
import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import { uglify } from 'rollup-plugin-uglify'
import pkg from './package.json'

function getConfig() {
  const name = 'scalewayUi'
  const buildName = 'scaleway-ui'

  const SOURCE_DIR = path.resolve(__dirname, 'src')
  const DIST_DIR = path.resolve(__dirname, 'dist')

  const baseConfig = {
    input: `${SOURCE_DIR}/index.js`,
    plugins: [
      babel({
        exclude: 'node_modules/**',
        configFile: path.join(__dirname, 'babel.config.js'),
      }),
      postcss({
        plugins: [],
      }),
      commonjs({ include: 'node_modules/**'}),
    ],
  }

  const esConfig = {
    ...baseConfig,
    ...{
      output: {
        file: `${DIST_DIR}/${buildName}.es.js`,
        format: 'es',
      },
      external: [
        ...Object.keys(pkg.peerDependencies || {}),
        ...Object.keys(pkg.dependencies || {}),
      ],
      plugins: [...baseConfig.plugins, resolve()],
    },
  }

  const cjsConfig = {
    ...esConfig,
    ...{
      output: {
        file: `${DIST_DIR}/${buildName}.cjs.js`,
        format: 'cjs',
      },
    },
  }

  const globals = {
    polished: 'polished',
    'prop-types': 'PropTypes',
    'emotion-theming': 'emotionTheming',
    '@emotion/core': 'emotion',
    react: 'React',
    'react-dom': 'ReactDom',
  }

  const umdConfig = {
    ...baseConfig,
    ...{
      output: {
        name,
        file: `${DIST_DIR}/${buildName}.js`,
        format: 'umd',
        globals,
        exports: 'named',
        sourcemap: false,
      },
      external: Object.keys(globals),
      plugins: [...baseConfig.plugins, resolve({ browser: true })],
    },
  }

  const minConfig = {
    ...umdConfig,
    ...{
      output: {
        ...umdConfig.output,
        file: `${DIST_DIR}/${buildName}.min.js`,
      },
      plugins: [
        ...umdConfig.plugins,
        replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
        uglify({
          compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
          },
        }),
      ],
    },
  }

  if (process.env.WATCH_MODE) {
    return [esConfig, cjsConfig]
  }

  return [esConfig, cjsConfig, umdConfig, minConfig]
}

export default getConfig()
