const fontWeightMap = {
  Medium: 500,
  Regular: 400,
  SemiBold: 600,
}

const makeCSSVariablesRec = (
  innerKey: string,
  innerValue: string | object,
  prefix: string,
  formattedKey: string,
): string => {
  if (typeof innerValue === 'object') {
    return Object.entries(innerValue)
      .map(([key, value]: [string, string | object]) =>
        makeCSSVariablesRec(key, value, prefix, `${formattedKey}-${innerKey}`),
      )
      .join('')
  }
  const cssValue = Object.keys(fontWeightMap).includes(
    innerValue as keyof typeof fontWeightMap,
  )
    ? fontWeightMap[innerValue as keyof typeof fontWeightMap]
    : innerValue

  const finalCSSValue =
    typeof cssValue === 'string' ? cssValue.replace(/;$/, '') : cssValue
  const formattedInnerKey = innerKey
    .replace(/([A-Z])/g, '-$1')
    .replace(/\./g, '-')
    .toLowerCase() // Replace caps and dots by dashes, convert to kebab-case

  return `    --${prefix}-${formattedKey}-${formattedInnerKey}: ${finalCSSValue};\n`
}

const createCssVariables = (prefix: string, obj: object) =>
  Object.entries(obj)
    .map(([key, value]: [string, string | object]) => {
      const formattedKey = key
        .replace(/([A-Z])/g, '-$1')
        .replace(/\./g, '-')
        .toLowerCase()

      if (typeof value === 'object' && value !== null) {
        return Object.entries(value)
          .map(([innerKey, innerValue]: [string, string | object]) =>
            makeCSSVariablesRec(innerKey, innerValue, prefix, formattedKey),
          )
          .join('')
      }

      return `    --${prefix}-${formattedKey}: ${value};\n`
    })
    .join('')

type UvThemeType = {
  colors: Record<string, string>
  radii: Record<string, string>
  shadows: Record<string, string>
  space: Record<string, string>
  typography: Record<string, string>
  breakpoints: Record<string, string>
}

export const generateThemeCss = ({
  uvTheme,
  filename,
}: {
  uvTheme: UvThemeType
  filename: string
}) =>
  `:root,\n:root.${filename}-theme {\n${
    createCssVariables('color', uvTheme.colors) +
    createCssVariables('radius', uvTheme.radii) +
    createCssVariables('shadow', uvTheme.shadows) +
    createCssVariables('space', uvTheme.space) +
    createCssVariables('typography', uvTheme.typography) +
    createCssVariables('breakpoint', uvTheme.breakpoints)
  }}\n`
