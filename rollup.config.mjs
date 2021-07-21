import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'
import { readPackageAsync } from 'read-pkg'
import postcss from 'rollup-plugin-postcss'
import { visualizer } from 'rollup-plugin-visualizer'
import dts from "rollup-plugin-dts"

const PROFILE = !!process.env.PROFILE

const pkg = await readPackageAsync()

const targets = `
  > 1%,
  last 2 versions,
  not IE > 0,
  not IE_Mob > 0
  node > 14
`

const external = id =>
  !id.endsWith('.css') &&
  !id.endsWith('.png') &&
  [
    '@emotion',
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ].find(dep => new RegExp(dep).test(id))

export default [{
  external,
  input: './src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'es',
  },
  plugins: [
    babel({
      babelHelpers: 'runtime',
      babelrc: false,
      exclude: 'node_modules/**',
      plugins: [
        'babel-plugin-annotate-pure-calls',
        '@babel/plugin-transform-runtime',
      ],
      presets: [
        '@babel/preset-typescript',
        ['@babel/env', { loose: true, modules: false, targets }],
        '@babel/preset-react',
        ['@emotion/babel-preset-css-prop', { sourceMap: false }],
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
        brotliSize: true,
        filename: '.reports/index.html',
        gzipSize: true,
        open: true,
      }),
    ].filter(Boolean),
  },
  {
    input: "./src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
]
