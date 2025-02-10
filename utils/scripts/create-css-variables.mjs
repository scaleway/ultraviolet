const screens = {
  xsmall: 0,
  small: 576,
  medium: 768,
  large: 992,
  xlarge: 1200,
}

const fontWeightMap = {
  Regular: 400,
  Medium: 500,
  SemiBold: 600,
}

const makeCSSVariablesRec = (innerKey, innerValue, prefix, formattedKey) => {
  if (typeof innerValue === 'object') {
    return Object.entries(innerValue)
      .map(([key, value]) =>
        makeCSSVariablesRec(key, value, prefix, `${formattedKey}-${innerKey}`),
      )
      .join('')
  }

  const cssValue = fontWeightMap[innerValue] || innerValue
  const finalCSSValue =
    typeof cssValue === 'string' ? cssValue.replace(/;$/, '') : cssValue
  const formattedInnerKey = innerKey
    .replace(/([A-Z])/g, '-$1')
    .replace(/\./g, '-')
    .toLowerCase() // Replace caps and dots by dashes, convert to kebab-case

  return `    --${prefix}-${formattedKey}-${formattedInnerKey}: ${finalCSSValue};\n`
}

const createCssVariables = (prefix, obj) =>
  Object.entries(obj)
    .map(([key, value]) => {
      const formattedKey = key
        .replace(/([A-Z])/g, '-$1')
        .replace(/\./g, '-')
        .toLowerCase()

      if (typeof value === 'object' && value !== null) {
        return Object.entries(value)
          .map(([innerKey, innerValue]) =>
            makeCSSVariablesRec(innerKey, innerValue, prefix, formattedKey),
          )
          .join('')
      }

      return `    --${prefix}-${formattedKey}: ${value};\n`
    })
    .join('')

export const generateThemeCss = uvTheme =>
  `:root {\n${
    createCssVariables('screen', screens) +
    createCssVariables('color', uvTheme.colors) +
    createCssVariables('radius', uvTheme.radii) +
    createCssVariables('shadow', uvTheme.shadows) +
    createCssVariables('space', uvTheme.space) +
    createCssVariables('typography', uvTheme.typography) +
    createCssVariables('breakpoint', uvTheme.breakpoints)
  }}\n`
