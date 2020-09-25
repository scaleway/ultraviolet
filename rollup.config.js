import readPkg from 'read-pkg'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import builtins from 'builtin-modules'
import postcss from 'rollup-plugin-postcss'
import analyze from 'rollup-plugin-analyzer'

const PROFILE = !!process.env.PROFILE

export default async () => {
  const pkg = await readPkg()

  const targets = pkg.browser
    ? `
    > 1%,
    last 2 versions
    `
    : { node: '14' }

  const external = id =>
    [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
      ...(pkg.browser ? [] : builtins),
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
          '@babel/plugin-transform-runtime',
        ],
      }),
      postcss({
        plugins: [],
      }),
      resolve({
        preferBuiltins: true,
      }),
      commonjs({
        include: '**/node_modules/**',
      }),
      PROFILE && analyze({ summaryOnly: true }),
    ].filter(Boolean),
    external,
    output: [
      {
        format: 'umd',
        name: pkg.name,
        file: 'dist/index.js',
      },
      {
        format: 'es',
        file: 'dist/module.js',
      },
    ],
  }
}
