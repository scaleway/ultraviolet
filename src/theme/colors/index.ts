import * as localContrasts from './contrasts'

export type ContrastType = {
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  1000?: string
}

type GenerateTokensProps = {
  sentiment: string
  contrast: ContrastType
  neutralContrast: ContrastType
}

// This function will generate all colors tokens using shade of contrasts
const generateTokens = ({
  sentiment,
  contrast,
  neutralContrast,
}: GenerateTokensProps) => {
  // Neutral is a particular color it has more shade and they are used differently than usual colors.
  if (sentiment === 'neutral') {
    return {
      /* eslint-disable sort-keys */

      // Background
      background: contrast[500],
      backgroundHover: contrast[600],
      backgroundDisabled: contrast[400],
      backgroundWeak: contrast[100],
      backgroundWeakHover: contrast[800],
      backgroundWeakDisabled: contrast[100],
      backgroundStrong: contrast[800],
      backgroundStrongHover: contrast[800],
      backgroundStrongDisabled: contrast[700],

      // Text
      text: contrast[800],
      textHover: contrast[900],
      textDisabled: contrast[600],
      textWeak: contrast[600],
      textWeakHover: contrast[600],
      textWeakDisabled: contrast[400],
      textStrong: contrast[100],
      textStrongHover: contrast[100],
      textStrongDisabled: contrast[100],

      // Border
      border: contrast[300],
      borderHover: contrast[300],
      borderDisabled: contrast[300],
      borderWeak: contrast[500],
      borderWeakHover: contrast[500],
      borderWeakDisabled: contrast[500],
      borderStrong: contrast[800],
      borderStrongHover: contrast[800],
      borderStrongDisabled: contrast[700],

      /* eslint-enable sort-keys */
    }
  }

  return {
    /* eslint-disable sort-keys */

    // Background
    background: contrast[300],
    backgroundHover: contrast[300],
    backgroundDisabled: contrast[300],
    backgroundWeak: neutralContrast[100],
    backgroundWeakHover: contrast[800],
    backgroundWeakDisabled: neutralContrast[100],
    backgroundStrong: contrast[800],
    backgroundStrongHover: contrast[800],
    backgroundStrongDisabled: contrast[800],

    // Text
    text: contrast[800],
    textHover: contrast[900],
    textDisabled: contrast[400],
    textWeak: contrast[800],
    textWeakHover: contrast[900],
    textWeakDisabled: contrast[400],
    textStrong: neutralContrast[100],
    textStrongHover: neutralContrast[100],
    textStrongDisabled: neutralContrast[100],

    // Border
    border: contrast[800],
    borderHover: contrast[900],
    borderDisabled: contrast[200],
    borderWeak: contrast[800],
    borderWeakHover: contrast[800],
    borderWeakDisabled: contrast[400],
    borderStrong: contrast[800],
    borderStrongHover: contrast[800],
    borderStrongDisabled: contrast[800],

    /* eslint-enable sort-keys */
  }
}

export type Color = keyof typeof localContrasts

// This function get in parameter a shade of contrasts and return a well formatted design tokens
export const colorsTokens = (
  contrasts: Partial<Record<Color, Partial<ContrastType>>>,
) => {
  // We first get contrasts passed as parameter if some are missing we use local contrasts and deep merge them
  const deepMergedContrasts = Object.keys(localContrasts).reduce(
    (acc, contrast) => ({
      ...acc,
      [contrast]: {
        ...localContrasts[contrast as Color],
        ...contrasts[contrast as Color],
      },
    }),
    {},
  ) as Record<Color, ContrastType>

  // Then with list of contrasts we can now create our design tokens using generateTokens function
  return Object.keys(deepMergedContrasts).reduce(
    (acc, contrast) => ({
      ...acc,
      [contrast]: generateTokens({
        contrast: deepMergedContrasts[contrast as Color],
        neutralContrast: deepMergedContrasts.neutral,
        sentiment: contrast,
      }),
    }),
    {},
  ) as Record<Color, ReturnType<typeof generateTokens>>
}

const colors = colorsTokens(localContrasts)

export default colors
