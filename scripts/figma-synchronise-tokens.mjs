import fs from 'node:fs'
import { generateThemeCss } from './create-css-variables.mjs'

const themesMatches = [
  {
    inputTheme: 'productDarker',
    palette: 'paletteDarker',
    outputTheme: 'darker',
  },
  { inputTheme: 'productDark', palette: 'paletteDark', outputTheme: 'dark' },
  { inputTheme: 'productLight', palette: 'paletteLight', outputTheme: 'light' },
]

const hexColorRegex = /#(?:(?:[\da-f]{3}){1,2}(?:[\da-f]{2}){0,1})/gi

export const TOKENS_URL =
  'https://raw.githubusercontent.com/scaleway/design-tokens/main/tokens.json'

const header = `
/**
 * Provides all tokens of a specific theme edited by design team.
 * This file is automatically generated from /scripts/figma-synchronise-tokens.js.
 * PLEASE DO NOT EDIT HERE
 */\n`

const createCSSFile = (theme, content) => {
  const cssContent = generateThemeCss(content)
  const filePath = `packages/themes/public/style/${theme}.css`
  fs.writeFileSync(filePath, cssContent, 'utf-8')
}

function alphaOrder(obj) {
  const orderedKeys = Object.keys(obj).sort()

  return orderedKeys.reduce((newObj, key) => {
    // eslint-disable-next-line no-param-reassign
    newObj[key] = typeof obj[key] === 'object' ? alphaOrder(obj[key]) : obj[key]

    return newObj
  }, {})
}

function formatShadows(data) {
  if ('type' in data) {
    return `${data.x}px ${data.y}px ${data.blur}px ${data.spread}px ${data.color}`
  }

  return Object.keys(data).reduce((acc, key) => {
    acc[key] = formatShadows(data[key])

    return acc
  }, {})
}

function evalValue(value, variables) {
  if (typeof value === 'object') {
    return Object.keys(value).reduce((acc, key) => {
      acc[key] = evalValue(value[key], variables)

      return acc
    }, {})
  }

  let returnedValue = value
  if (value.includes('$')) {
    const temp = value.replaceAll(/\$[a-zA-Z0-9\\.]+/g, match => {
      const keyParts = match.slice(1).split('.')

      let base = variables
      keyParts.forEach(key => {
        base = base[key]
      })

      return keyParts[0] === 'fontSize' || keyParts[0] === 'lineHeight'
        ? `${base}px`
        : base
    })

    // eslint-disable-next-line no-eval
    returnedValue = temp.includes('*') ? eval(temp) : temp
  }

  return typeof returnedValue === 'string'
    ? returnedValue.replaceAll(hexColorRegex, match => match.toLowerCase())
    : returnedValue
}

function getValues(data, { typeFilter, variables }) {
  if ('type' in data) {
    return data.type === typeFilter && 'value' in data
      ? evalValue(data.value, variables)
      : null
  }
  if (typeof data === 'object') {
    const res = Object.keys(data).reduce((values, key) => {
      const newValue = getValues(data[key], { typeFilter, variables })

      if (newValue !== null) {
        // eslint-disable-next-line no-param-reassign
        values[key.replaceAll(/,/g, '.')] = newValue
      }

      return values
    }, {})

    return Object.keys(res).length ? res : null
  }

  return null
}

export const generatePalette = (figmaTokensJson, themeMatch) => {
  const inputTheme = figmaTokensJson[themeMatch.inputTheme]
  const inputPalette = figmaTokensJson[themeMatch.palette]

  // Variable : unit
  const unit = inputTheme.unit.value

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
      shades: paletteShades,
    },
  })

  // Variable : theme fontSize
  const fontSize = getValues(inputTheme.fontSize, {
    typeFilter: 'fontSizes',
    variables: {},
  })

  // Variable : theme lineHeights
  const lineHeight = getValues(inputTheme.lineHeight, {
    typeFilter: 'lineHeights',
    variables: { unit },
  })

  // Variable : theme color
  const colors = getValues(inputTheme, {
    typeFilter: 'color',
    variables: { shades: paletteShades, other: paletteOther },
  })

  // Variable : theme shadows
  const shadows = getValues(inputTheme, {
    typeFilter: 'boxShadow',
    variables: {
      shades: paletteShades,
      shadows: paletteShadows,
      ...colors,
      other: paletteOther,
    },
  })

  // Variable : theme typography
  const typography = getValues(inputTheme, {
    typeFilter: 'typography',
    variables: { lineHeight, unit, fontSize },
  })

  // Variable : theme radii
  const radii = getValues(inputTheme.radii, {
    typeFilter: 'borderRadius',
    variables: {},
  })

  // Variable : theme space
  const space = getValues(inputTheme.space, {
    typeFilter: 'spacing',
    variables: {},
  })

  const breakpoints = getValues(inputTheme.breakpoints, {
    typeFilter: 'dimension',
    variables: {},
  })

  const output = alphaOrder({
    colors: {
      ...colors,
      neutral: {
        ...colors.neutral,
        ...paletteNeutral,
      },
      overlay: getValues(inputPalette.other.overlay, {
        typeFilter: 'color',
      }),
    },
    radii,
    shadows: formatShadows(shadows),
    space,
    theme: themeMatch.outputTheme,
    typography,
    breakpoints,
  })

  return output
}
;(async () => {
  const figmaTokensResponse = await fetch(TOKENS_URL)
  const figmaTokensJson = await figmaTokensResponse.json()

  // For each theme
  themesMatches.map(async themeMatch => {
    const output = generatePalette(figmaTokensJson, themeMatch)
    const filePath = `packages/themes/src/themes/console/${themeMatch.outputTheme}.ts`
    await fs.writeFile(
      filePath,
      `${header}export const ${themeMatch.outputTheme}Theme = ${JSON.stringify(
        output,
      )}`,
      {},
      () => {
        console.log(`File written ${filePath}`)
      },
    )
    createCSSFile(themeMatch.outputTheme, output) // Create CSS-tokens
  })
})()
