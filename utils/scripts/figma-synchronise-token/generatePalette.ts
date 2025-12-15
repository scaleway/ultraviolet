// oxlint-disable eslint/no-console

export type JsonType = Record<string, object | string>

type ThemeMatchType = {
  inputTheme: string
  palette: string
  outputTheme: string
}

type PaletteType = {
  shades: Record<string, ColorType>
  other: Record<string, ColorType>
  shadows: Record<string, ColorType>
  neutral: Record<string, ColorType>
  spacing: Record<string, ColorType>
}

type ThemeType = {
  unit: ColorType
  sizing: Record<string, ColorType>
  fontSize: Record<string, ColorType>
  lineHeight: Record<string, ColorType>
  color: Record<string, ColorType>
  typography: Record<string, ColorType>
  space: Record<string, ColorType>
  radii: Record<string, ColorType>
  breakpoints: Record<string, ColorType>
  boxShadow: Record<string, ColorType>
}

const hexColorRegex = /#(?:(?:[\da-f]{3}){1,2}(?:[\da-f]{2}){0,1})/gi

const alphaOrder = (obj: JsonType) => {
  const orderedKeys = Object.keys(obj ?? {}).toSorted()

  return orderedKeys.reduce((newObj: Record<string, string | object>, key) => {
    const result =
      typeof obj[key] === 'string' ? obj[key] : alphaOrder(obj[key] as JsonType)

    newObj[key] = result

    return newObj
  }, {})
}

type ShadowType = {
  x: string
  y: string
  blur: string
  spread: string
  color: string
  type: string
}

const isShadowType = (
  data: ShadowType | Record<string, ShadowType>,
): data is ShadowType =>
  data &&
  'x' in data &&
  'y' in data &&
  'blur' in data &&
  'spread' in data &&
  'color' in data

const formatShadows = (data: ShadowType | Record<string, ShadowType>) => {
  if (isShadowType(data)) {
    return `${data.x}px ${data.y}px ${data.blur}px ${data.spread}px ${data.color}`
  }

  return Object.keys(data).reduce((acc: JsonType, key) => {
    acc[key] = formatShadows(data[key])

    return acc
  }, {})
}

const evalValue = (value: string, variables: string | object) => {
  if (typeof value === 'object') {
    return Object.keys(value).reduce(
      (acc: Record<string, string | object>, key) => {
        acc[key] = evalValue(value[key], variables)

        return acc
      },
      {},
    )
  }

  let returnedValue = value
  if (value.includes('$')) {
    const temp = value.replaceAll(/\$[a-zA-Z0-9\\.]+/g, match => {
      const keyParts = match.slice(1).split('.')

      let base = variables
      keyParts.forEach(key => {
        base = (base as Record<string, unknown>)[key] as string | object
      })

      return typeof base === 'string' ? base : JSON.stringify(base)
    })
    returnedValue = temp
  }

  return typeof returnedValue === 'string'
    ? returnedValue.replaceAll(hexColorRegex, match => match.toLowerCase())
    : returnedValue
}

type ColorType = {
  value: string
  type: string
}

const isColorType = (
  data: ColorType | Record<string, ColorType> | ThemeType,
): data is ColorType => data && 'value' in data && 'type' in data

const getValues = (
  data: Record<string, ColorType> | ColorType | ThemeType,
  { typeFilter, variables }: { typeFilter: string; variables: JsonType },
) => {
  if (isColorType(data)) {
    return data.type === typeFilter && 'value' in data
      ? evalValue(data.value, variables)
      : null
  }
  const res = Object.keys(data).reduce((values: JsonType, key) => {
    const newValue = getValues(
      (data as Record<string, ColorType | ThemeType>)[key],
      { typeFilter, variables },
    )

    if (newValue !== null) {
      values[key.replaceAll(/,/g, '.')] = newValue
    }

    return values
  }, {})

  return Object.keys(res).length > 0 ? res : null
}

export const generatePalette = (
  figmaTokensJson: JsonType,
  themeMatch: ThemeMatchType,
) => {
  const inputTheme = figmaTokensJson[themeMatch.inputTheme] as ThemeType
  const inputPalette = figmaTokensJson[themeMatch.palette] as PaletteType

  // Variable : unit
  // const unit = inputTheme.unit.value

  // Variable : palette shades
  const paletteShades = getValues(inputPalette.shades, {
    typeFilter: 'color',
    variables: {},
  })

  // Variable : palette other
  const paletteOther = getValues(inputPalette.other, {
    typeFilter: 'color',
    variables: {},
  })

  // Variable : palette shadows
  const paletteShadows = getValues(inputPalette.shadows, {
    typeFilter: 'color',
    variables: {},
  })

  // Variable : palette neutral
  const paletteNeutral = getValues(inputPalette.neutral, {
    typeFilter: 'color',
    variables: {
      shades: paletteShades ?? {},
    },
  })

  // Variable : theme space
  const sizing = getValues(inputTheme.sizing, {
    typeFilter: 'dimension',
    variables: {},
  })

  // Variable : theme fontSize
  const fontSize = getValues(inputTheme.fontSize, {
    typeFilter: 'fontSizes',
    variables: { sizing: sizing ?? {} },
  })

  console.log('fontSize generated')

  // Variable : theme lineHeights
  const lineHeight = getValues(inputTheme.lineHeight, {
    typeFilter: 'lineHeights',
    variables: { sizing: sizing ?? {} },
  })

  console.log('lineHeight generated')

  // Variable : theme color
  const colors = getValues(inputTheme, {
    typeFilter: 'color',
    variables: { other: paletteOther ?? {}, shades: paletteShades ?? {} },
  })

  console.log('colors generated')

  // Variable : theme shadows
  const shadows = getValues(inputTheme, {
    typeFilter: 'boxShadow',
    variables: {
      shades: paletteShades ?? {},
      shadows: paletteShadows ?? {},
      ...(typeof colors === 'object' ? colors : {}),
      other: paletteOther ?? {},
    },
  })

  console.log('shadows generated')

  // Variable : theme typography
  const typography = getValues(inputTheme, {
    typeFilter: 'typography',
    variables: {
      fontSize: fontSize ?? {},
      lineHeight: lineHeight ?? {},
      sizing: sizing ?? {},
    },
  })

  console.log('typography generated')

  // Variable : theme radii
  const radii = getValues(inputTheme.radii, {
    typeFilter: 'borderRadius',
    variables: { sizing: sizing ?? {} },
  })

  console.log('radii generated')

  // Variable : theme space
  const space = getValues(inputTheme.space, {
    typeFilter: 'dimension',
    variables: { sizing: sizing ?? {} },
  })

  console.log('space generated')

  const breakpoints = getValues(inputTheme.breakpoints, {
    typeFilter: 'dimension',
    variables: {},
  })

  console.log('breakpoints generated')

  const output = alphaOrder({
    breakpoints: breakpoints ?? {},
    colors: {
      ...(typeof colors === 'object' ? colors : {}),
      neutral: {
        ...(typeof colors === 'object' &&
        typeof colors?.['neutral'] === 'object'
          ? colors?.['neutral']
          : {}),
        ...(typeof paletteNeutral === 'object' ? paletteNeutral : {}),
      },
      overlay: getValues(inputPalette.other['overlay'], {
        typeFilter: 'color',
        variables: {},
      }),
    },
    radii: radii ?? {},
    shadows: formatShadows(shadows as ShadowType),
    sizing: sizing ?? {},
    space: space ?? {},
    theme: themeMatch.outputTheme,
    typography: typography ?? {},
  })

  return output
}
