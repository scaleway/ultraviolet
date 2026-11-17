import type { TupleUnion } from '@scaleway/types'
import type { ThemeOption } from './types'

export const THEME_OPTIONS: TupleUnion<ThemeOption> = ['dark', 'darker', 'light', 'system'] as const

export const DEFAULT_THEME_CLASSES = {
  light: 'light-theme',
  dark: 'dark-theme',
  darker: 'darker-theme',
} as const

export const DEFAULT_THEME_STORAGE_KEY = 'uv-theme'

export const DETAULT_INITIAL_THEME = 'system'
