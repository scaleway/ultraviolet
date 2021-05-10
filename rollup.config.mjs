import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'
import { readPackageAsync } from 'read-pkg'
import postcss from 'rollup-plugin-postcss'
import { visualizer } from 'rollup-plugin-visualizer'

const PROFILE = !!process.env.PROFILE

export default async () => {
  const pkg = await readPackageAsync()

  const targets = `
    > 1%,
    last 2 versions,
    not IE > 0,
    not IE_Mob > 0
  `

  const external = id =>
    !id.endsWith('.css') &&
    !id.endsWith('.png') &&
    [
      '@emotion',
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ].find(dep => new RegExp(dep).test(id))

  return {
    input: './src/index.js',
    plugins: [
      babel({
        babelHelpers: 'runtime',
        babelrc: false,
        exclude: 'node_modules/**',
        presets: [
          ['@babel/env', { modules: false, targets, loose: true }],
          '@babel/preset-react',
          ['@emotion/babel-preset-css-prop', { sourceMap: false }],
        ],
        plugins: [
          'babel-plugin-annotate-pure-calls',
          '@babel/plugin-transform-runtime',
        ],
      }),
      postcss({
        inject: false,
      }),
      nodeResolve({
        preferBuiltins: true,
      }),
      url({
        limit: 63488,
      }),
      svgr.default({ memo: true }),
      PROFILE &&
        visualizer({
          gzipSize: true,
          brotliSize: true,
          open: true,
          filename: '.reports/report.html',
        }),
    ].filter(Boolean),
    external,
    output: {
      format: 'es',
      file: 'dist/module.js',
    },
  }
}
