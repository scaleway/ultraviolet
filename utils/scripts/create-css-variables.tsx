const fontWeightMap = {
  Regular: 400,
  Medium: 500,
  SemiBold: 600,
}

// Map prefix to the expected CSS property
const prefixToProperty: Record<string, string> = {
  color: 'background', // fallback, will be refined below
  radius: 'border-radius',
  shadow: 'box-shadow',
  space: 'margin', // fallback, could be padding/margin
  typography: 'font-family', // fallback, will be refined below
  breakpoint: '', // breakpoints don't map to a CSS property
}

// Try to infer the property from the variable name
const inferProperty = (
  prefix: string,
  formattedKey: string,
  formattedInnerKey?: string,
): string => {
  // For colors, try to extract the property from the key
  if (prefix === 'color') {
    const key = [formattedKey, formattedInnerKey].filter(Boolean).join('-')
    if (key.includes('background')) return 'background-color'
    if (key.includes('border')) return 'border-color'
    if (key.includes('icon')) return 'color'
    if (key.includes('text')) return 'color'
    if (key.includes('shadow')) return 'box-shadow'
    if (key.includes('elevation')) return 'box-shadow'
    if (key.includes('overlay')) return 'background-color'
    return 'color'
  }
  if (prefix === 'typography') {
    const key = [formattedKey, formattedInnerKey].filter(Boolean).join('-')
    if (key.includes('font-family')) return 'font-family'
    if (key.includes('font-size')) return 'font-size'
    if (key.includes('font-weight')) return 'font-weight'
    if (key.includes('letter-spacing')) return 'letter-spacing'
    if (key.includes('line-height')) return 'line-height'
    if (key.includes('text-decoration')) return 'text-decoration'
    if (key.includes('text-case')) return 'text-transform'
    if (key.includes('paragraph-spacing')) return 'margin-bottom'
    return 'font-family'
  }
  if (prefix === 'radius') return 'border-radius'
  if (prefix === 'shadow') return 'box-shadow'
  if (prefix === 'space') return 'margin'
  return prefixToProperty[prefix] || 'color'
}

const makeCSSVariablesRec = (
  innerKey: string,
  innerValue: string | object,
  prefix: string,
  formattedKey: string,
): { variables: string; classes: string } => {
  if (typeof innerValue === 'object') {
    return Object.entries(innerValue)
      .map(([key, value]: [string, string | object]) =>
        makeCSSVariablesRec(key, value, prefix, `${formattedKey}-${innerKey}`),
      )
      .reduce(
        (acc, curr) => ({
          variables: acc.variables + curr.variables,
          classes: acc.classes + curr.classes,
        }),
        { variables: '', classes: '' },
      )
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

  // Create the CSS variable
  const variableLine = `    --${prefix}-${formattedKey}-${formattedInnerKey}: ${finalCSSValue};\n`

  // Infer the CSS property for the class
  const cssProperty = inferProperty(prefix, formattedKey, formattedInnerKey)
  // Only create a class if cssProperty is not empty
  const classLine = cssProperty
    ? `.${prefix}-${formattedKey}-${formattedInnerKey} { ${cssProperty}: var(--${prefix}-${formattedKey}-${formattedInnerKey}); }\n`
    : ''

  return { variables: variableLine, classes: classLine }
}

const createCssVariables = (prefix: string, obj: object) => {
  let variables = ''
  let classes = ''
  Object.entries(obj).forEach(([key, value]: [string, string | object]) => {
    const formattedKey = key
      .replace(/([A-Z])/g, '-$1')
      .replace(/\./g, '-')
      .toLowerCase()

    if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(
        ([innerKey, innerValue]: [string, string | object]) => {
          const { variables: innerVariables, classes: innerClasses } =
            makeCSSVariablesRec(innerKey, innerValue, prefix, formattedKey)
          variables += innerVariables
          classes += innerClasses
        },
      )
    } else {
      // Create the CSS variable
      const variableLine = `    --${prefix}-${formattedKey}: ${value};\n`

      // Infer the CSS property for the class
      const cssProperty = inferProperty(prefix, formattedKey)
      // Only create a class if cssProperty is not empty
      const classLine = cssProperty
        ? `.${prefix}-${formattedKey} { ${cssProperty}: var(--${prefix}-${formattedKey}); }\n`
        : ''

      variables += variableLine
      classes += classLine
    }
  })
  return { variables, classes }
}

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
}: { uvTheme: UvThemeType; filename: string }) => {
  const color = createCssVariables('color', uvTheme.colors)
  const radius = createCssVariables('radius', uvTheme.radii)
  const shadow = createCssVariables('shadow', uvTheme.shadows)
  const space = createCssVariables('space', uvTheme.space)
  const typography = createCssVariables('typography', uvTheme.typography)
  const breakpoint = createCssVariables('breakpoint', uvTheme.breakpoints)

  return (
    `:root {\n` +
    color.variables +
    radius.variables +
    shadow.variables +
    space.variables +
    typography.variables +
    breakpoint.variables +
    '}\n' +
    color.classes +
    radius.classes +
    shadow.classes +
    space.classes +
    typography.classes +
    breakpoint.classes
  )
}
