import svgr from '@svgr/rollup'
import { defineConfig, mergeConfig } from 'vite'
import { defaultConfig } from '../../vite.config'

export default mergeConfig(defineConfig(defaultConfig), {
  plugins: [
    svgr({ memo: true, svgo: false }), // We disable svgo because we have custom configuration for it svgo.config.js
  ],
})
