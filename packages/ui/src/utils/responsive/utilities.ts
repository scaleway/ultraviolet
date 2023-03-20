import type { ScreenSize } from '../../theme'
import { screens } from '../../theme'

export const up = (size: ScreenSize, rules: string): string => {
  if (!(size in screens)) return ''

  return `@media (min-width: ${screens[size]}px) { ${rules} }`
}

export const down = (size: ScreenSize, rules: string): string => {
  if (!(size in screens)) return ''

  return `@media (max-width: ${screens[size] - 1}px) { ${rules} }`
}
