import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import readPkg from 'read-pkg'
import analyze from 'rollup-plugin-analyzer'
import postcss from 'rollup-plugin-postcss'

const PROFILE = !!process.env.PROFILE

export default async () => {
  const pkg = await readPkg()

  const targets = `
    > 1%,
    last 2 versions,
    not IE > 0,
    not IE_Mob > 0
  `

  const external = id =>
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
