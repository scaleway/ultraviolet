import { EMPTY_PATH, FEEDBACK_PATH, bucketLink } from '../../helper'

const emptyDark = bucketLink(EMPTY_PATH, 'empty-dark')
const emptyLight = bucketLink(EMPTY_PATH, 'empty-light')
const failedDark = bucketLink(EMPTY_PATH, 'failed-dark')
const failedLight = bucketLink(EMPTY_PATH, 'failed-light')
const genericDark = bucketLink(EMPTY_PATH, 'generic-dark')
const genericLight = bucketLink(EMPTY_PATH, 'generic-light')
const loadingDark = bucketLink(EMPTY_PATH, 'loading-dark')
const loadingLight = bucketLink(EMPTY_PATH, 'loading-light')
const lockDark = bucketLink(EMPTY_PATH, 'lock-dark')
const lockLight = bucketLink(EMPTY_PATH, 'lock-light')
const plusDark = bucketLink(EMPTY_PATH, 'plus-dark')
const plusLight = bucketLink(EMPTY_PATH, 'plus-light')
const resourcesDark = bucketLink(EMPTY_PATH, 'resources-dark')
const resourcesLight = bucketLink(EMPTY_PATH, 'resources-light')
const searchDark = bucketLink(EMPTY_PATH, 'search-dark')
const searchLight = bucketLink(EMPTY_PATH, 'search-light')

const dangerDark = bucketLink(FEEDBACK_PATH, 'danger-dark')
const dangerLight = bucketLink(FEEDBACK_PATH, 'danger-light')
const successDark = bucketLink(FEEDBACK_PATH, 'success-dark')
const successLight = bucketLink(FEEDBACK_PATH, 'success-light')
const warningDark = bucketLink(FEEDBACK_PATH, 'warning-dark')
const warningLight = bucketLink(FEEDBACK_PATH, 'warning-light')

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
