import { breakpoints } from '../../theme'

export const up = (size, rules) => {
  if (!(size in breakpoints)) return null
  return `@media (min-width: ${breakpoints[size]}px) { ${rules} }`
}

export const down = (size, rules) => {
  if (!(size in breakpoints)) return null
  return `@media (max-width: ${breakpoints[size]}px) { ${rules} }`
}
