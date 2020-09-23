import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'
import analyze from 'rollup-plugin-analyzer'

// import babel from 'rollup-plugin-babel';
// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';

export default async () => {
  const external = [
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.dependencies || {}),
  ]

  return ({
    input: './src/index.js',
    plugins: [
      babel({
        runtimeHelpers: true,
        babelrc: false,
        exclude: 'node_modules/**',
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
      }),
      resolve({
        preferBuiltins: true,
      }),
      commonjs({
        include: '**/node_modules/**',
      }),
      analyze(),
    ],
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
  });
};




// function getConfig() {
//   const name = 'scalewayUi'
//   const buildName = 'scaleway-ui'

//   const SOURCE_DIR = path.resolve(__dirname, 'src')
//   const DIST_DIR = path.resolve(__dirname, 'dist')

//   const baseConfig = {
//     input: `${SOURCE_DIR}/index.js`,
//     plugins: [
//     ],
//   }

//   const esConfig = {
//     ...baseConfig,
//     ...{
//       output: {
//         file: `${DIST_DIR}/${buildName}.es.js`,
//         format: 'es',
//       },
//       plugins: [...baseConfig.plugins, resolve()],
//     },
//   }

//   const cjsConfig = {
//     ...esConfig,
//     ...{
//       output: {
//         file: `${DIST_DIR}/${buildName}.cjs.js`,
//         format: 'cjs',
//       },
//     },
//   }

//   const globals = {
//     polished: 'polished',
//     'prop-types': 'PropTypes',
//     'emotion-theming': 'emotionTheming',
//     '@emotion/core': 'emotion',
//     react: 'React',
//     'react-dom': 'ReactDom',
//   }

//   const umdConfig = {
//     ...baseConfig,
//     ...{
//       output: {
//         name,
//         file: `${DIST_DIR}/${buildName}.js`,
//         format: 'umd',
//         globals,
//         exports: 'named',
//         sourcemap: false,
//       },
//       external: Object.keys(globals),
//       plugins: [...baseConfig.plugins, resolve({ browser: true }), commonjs()],
//     },
//   }

//   const minConfig = {
//     ...umdConfig,
//     ...{
//       output: {
//         ...umdConfig.output,
//         file: `${DIST_DIR}/${buildName}.min.js`,
//       },
//       plugins: [
//         ...umdConfig.plugins,
//         replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
//         uglify({
//           compress: {
//             pure_getters: true,
//             unsafe: true,
//             unsafe_comps: true,
//           },
//         }),
//       ],
//     },
//   }

//   if (process.env.WATCH_MODE) {
//     return [esConfig, cjsConfig]
//   }

//   console.log(esConfig);

//   return [esConfig]
// }

// export default getConfig()
