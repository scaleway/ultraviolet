import { screens } from '../../theme'

export const up = (size, rules) => {
  if (!(size in screens)) return null

  return `@media (min-width: ${screens[size]}px) { ${rules} }`
}

export const down = (size, rules) => {
  if (!(size in screens)) return null

  return `@media (max-width: ${screens[size]}px) { ${rules} }`
}
