import emptyDark from '../../various/empty/empty-dark.webp'
import emptyLight from '../../various/empty/empty-light.webp'
import failedDark from '../../various/empty/failed-dark.webp'
import failedLight from '../../various/empty/failed-light.webp'
import genericDark from '../../various/empty/generic-dark.webp'
import genericLight from '../../various/empty/generic-light.webp'
import loadingDark from '../../various/empty/loading-dark.webp'
import loadingLight from '../../various/empty/loading-light.webp'
import lockDark from '../../various/empty/lock-dark.webp'
import lockLight from '../../various/empty/lock-light.webp'
import plusDark from '../../various/empty/plus-dark.webp'
import plusLight from '../../various/empty/plus-light.webp'
import resourcesDark from '../../various/empty/resources-dark.webp'
import resourcesLight from '../../various/empty/resources-light.webp'
import searchDark from '../../various/empty/search-dark.webp'
import searchLight from '../../various/empty/search-light.webp'
import dangerDark from '../../various/feedback/danger-dark.webp'
import dangerLight from '../../various/feedback/danger-light.webp'
import successDark from '../../various/feedback/success-dark.webp'
import successLight from '../../various/feedback/success-light.webp'
import warningDark from '../../various/feedback/warning-dark.webp'
import warningLight from '../../various/feedback/warning-light.webp'

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
  },

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
  },
}
