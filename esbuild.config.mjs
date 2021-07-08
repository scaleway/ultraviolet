import { build } from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'
import { dtsPlugin } from "esbuild-plugin-d.ts"

build({
  bundle: true,
  entryPoints: ['src/index.ts'],
  loader: {
    '.css': 'text',
    '.js': 'jsx',
    '.png': 'dataurl',
    '.svg': 'dataurl',
  },
  outfile: 'dist/index.js',
  plugins: [
    nodeExternalsPlugin({
      allowList: [
        'react-datepicker/dist/react-datepicker.min.css',
        'react-toastify/dist/ReactToastify.min.css',
        'intl-tel-input/build/css/intlTelInput.css',
      ],
    }),
    dtsPlugin(),
  ],
  target: ['chrome89', 'firefox87', 'safari14', 'edge89'],
})
