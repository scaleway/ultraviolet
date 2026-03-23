import { screens } from '../../theme'

import type { ScreenSize } from '../../theme'

export const up = (size: ScreenSize, rules: string): string => {
  if (!(size in screens)) {
    return ''
  }

  return `@media (min-width: ${screens[size]}px) { ${rules} }`
}

export const down = (size: ScreenSize, rules: string): string => {
  if (!(size in screens)) {
    return ''
  }

  return `@media (max-width: calc(${screens[size]} - 1px)) { ${rules} }`
}
