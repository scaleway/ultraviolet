// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-relative-packages */
import { defineConfig, mergeConfig } from 'vite'
import { defaultConfig } from '../../vite.config'

export default mergeConfig(defineConfig(defaultConfig), {})
