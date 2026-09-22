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

  const finalCSSValue = typeof innerValue === 'string' ? innerValue.replace(/;+$/u, '') : innerValue
  const formattedInnerKey = innerKey
    .replaceAll(/([A-Z])/gu, '-$1')
    .replaceAll('.', '-')
    .toLowerCase() // Replace caps and dots by dashes, convert to kebab-case

  return `    --${prefix}-${formattedKey}-${formattedInnerKey}: ${finalCSSValue};\n`
}

const createCssVariables = (prefix: string, obj: object) =>
  Object.entries(obj)
    .map(([key, value]: [string, string | object]) => {
      const formattedKey = key
        .replaceAll(/([A-Z])/gu, '-$1')
        .replaceAll('.', '-')
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
  sizing: Record<string, string>
  space: Record<string, string>
  typography: Record<string, string>
  breakpoints: Record<string, string>
}

export const generateThemeCss = ({ uvTheme, filename }: { uvTheme: UvThemeType; filename: string }) =>
  `:root,
:root.${filename}-theme {\n${
    createCssVariables('color', uvTheme.colors) +
    createCssVariables('radius', uvTheme.radii) +
    createCssVariables('shadow', uvTheme.shadows) +
    createCssVariables('sizing', uvTheme.sizing) +
    createCssVariables('space', uvTheme.space) +
    createCssVariables('typography', uvTheme.typography) +
    createCssVariables('breakpoint', uvTheme.breakpoints)
  }}`
