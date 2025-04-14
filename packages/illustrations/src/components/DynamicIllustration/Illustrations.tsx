'use client'

import {
  emptyDark,
  emptyLight,
  failedDark,
  failedLight,
  genericDark,
  genericLight,
  loadingDark,
  loadingLight,
  lockDark,
  lockLight,
  plusDark,
  plusLight,
  resourcesDark,
  resourcesLight,
  searchDark,
  searchLight,
} from '../../assets/various/empty'
import {
  dangerDark,
  dangerLight,
  successDark,
  successLight,
  warningDark,
  warningLight,
} from '../../assets/various/feedback'

// To be sure that every illustration has both a light and a dark version
export type IllustrationsKeys = {
  danger: string
  success: string
  warning: string
  empty: string
  failed: string
  generic: string
  loading: string
  lock: string
  plus: string
  resources: string
  search: string
}

export const ILLUSTRATIONS = {
  light: {
    danger: dangerLight,
    success: successLight,
    warning: warningLight,
    empty: emptyLight,
    failed: failedLight,
    generic: genericLight,
    loading: loadingLight,
    lock: lockLight,
    plus: plusLight,
    resources: resourcesLight,
    search: searchLight,
  } satisfies IllustrationsKeys,

  dark: {
    danger: dangerDark,
    success: successDark,
    warning: warningDark,
    empty: emptyDark,
    failed: failedDark,
    generic: genericDark,
    loading: loadingDark,
    lock: lockDark,
    plus: plusDark,
    resources: resourcesDark,
    search: searchDark,
  } satisfies IllustrationsKeys,
}
