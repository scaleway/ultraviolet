// oxlint-disable eslint/no-console

import { writeFile, writeFileSync } from 'node:fs'
import { header, TOKENS_URL } from './constants'
import { generateThemeCss } from './create-css-variables'
import { generatePalette } from './generatePalette'

export type JsonType = Record<string, object | string>

const themesMatches = [
  {
    inputTheme: 'productDarker',
    outputTheme: 'darker',
    palette: 'paletteDarker',
  },
  { inputTheme: 'productDark', outputTheme: 'dark', palette: 'paletteDark' },
  { inputTheme: 'productLight', outputTheme: 'light', palette: 'paletteLight' },
]

type UvThemeType = {
  colors: Record<string, string>
  radii: Record<string, string>
  shadows: Record<string, string>
  space: Record<string, string>
  typography: Record<string, string>
  breakpoints: Record<string, string>
}

const createCSSFile = (theme: string, content: UvThemeType) => {
  const cssContent = generateThemeCss({ filename: theme, uvTheme: content })
  const filePath = `packages/themes/public/style/${theme}.css`
  writeFileSync(filePath, cssContent, 'utf8')
}

const writeFiles = async () => {
  const figmaTokensResponse: Response = await fetch(TOKENS_URL)
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  const figmaTokensJson = (await figmaTokensResponse.json()) as JsonType

  // For each theme
  for (const themeMatch of themesMatches) {
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    const output = generatePalette(figmaTokensJson, themeMatch) as UvThemeType
    const filePath = `packages/themes/src/themes/console/${themeMatch.outputTheme}/__generated__/index.ts`
    writeFile(
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
  }
}

try {
  if (typeof process !== 'undefined' && process.versions?.node) {
    await writeFiles()
  }
} catch (error) {
  console.error(error)
}
