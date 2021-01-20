export const breakpoints = {
  xsmall: 0,
  small: 576,
  medium: 768,
  large: 992,
  xlarge: 1200,
}

export const up = (size, rules) => {
  if (!(size in breakpoints)) return null
  return `@media (min-width: ${breakpoints[size]}px) { ${rules} }`
}

export const down = (size, rules) => {
  if (!(size in breakpoints)) return null
  return `@media (max-width: ${breakpoints[size]}px) { ${rules} }`
}
