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
      backgroundHover: contrast[500],
      backgroundDisabled: contrast[500],
      backgroundWeak: contrast[100],
      backgroundWeakHover: contrast[100],
      backgroundWeakDisabled: contrast[100],
      backgroundStrong: contrast[800],
      backgroundStrongHover: contrast[800],
      backgroundStrongDisabled: contrast[800],

      // Text
      text: contrast[800],
      textHover: contrast[800],
      textDisabled: contrast[800],
      textWeak: contrast[800],
      textWeakHover: contrast[800],
      textWeakDisabled: contrast[800],
      textStrong: contrast[100],
      textStrongHover: contrast[100],
      textStrongDisabled: contrast[100],

      // Border
      border: contrast[800],
      borderHover: contrast[800],
      borderDisabled: contrast[800],
      borderWeak: contrast[800],
      borderWeakHover: contrast[800],
      borderWeakDisabled: contrast[800],
      borderStrong: contrast[800],
      borderStrongHover: contrast[800],
      borderStrongDisabled: contrast[800],

      /* eslint-enable */
    }
  }

  return {
    /* eslint-disable sort-keys */

    // Background
    background: contrast[100],
    backgroundHover: contrast[100],
    backgroundDisabled: contrast[100],
    backgroundWeak: neutralContrast[100],
    backgroundWeakHover: neutralContrast[100],
    backgroundWeakDisabled: neutralContrast[100],
    backgroundStrong: contrast[800],
    backgroundStrongHover: contrast[800],
    backgroundStrongDisabled: contrast[800],

    // Text
    text: contrast[800],
    textHover: contrast[800],
    textDisabled: contrast[800],
    textWeak: contrast[800],
    textWeakHover: contrast[800],
    textWeakDisabled: contrast[800],
    textStrong: neutralContrast[100],
    textStrongHover: neutralContrast[100],
    textStrongDisabled: neutralContrast[100],

    // Border
    border: contrast[800],
    borderHover: contrast[800],
    borderDisabled: contrast[800],
    borderWeak: contrast[800],
    borderWeakHover: contrast[800],
    borderWeakDisabled: contrast[800],
    borderStrong: contrast[800],
    borderStrongHover: contrast[800],
    borderStrongDisabled: contrast[800],

    /* eslint-enable */
  }
}

export type Color = keyof typeof localContrasts

// This function get in parameter a shade of contrasts and return a well formatted design tokens
export const colorsTokens = (contrasts: { [key in Color]: ContrastType }) => {
  // We first get contrasts passed as parameter if some are missing we use local contrasts and deep merge them
  const deepMergedContrasts = Object.keys(contrasts).reduce(
    (acc, contrast) => ({
      ...acc,
      [contrast]: {
        ...localContrasts[contrast as Color],
        ...contrasts[contrast as Color],
      },
    }),
    {},
  ) as { [key in Color]: ContrastType }

  // Then with list of contrasts we can now create our design tokens using generateTokens function
  return Object.keys(deepMergedContrasts).reduce(
    (acc, contrast) => ({
      ...acc,
      [contrast]: generateTokens({
        contrast: contrasts[contrast as Color],
        neutralContrast: contrasts.neutral,
        sentiment: contrast,
      }),
    }),
    {},
  ) as { [key in Color]: ReturnType<typeof generateTokens> }
}

const colors: ReturnType<typeof colorsTokens> = colorsTokens(localContrasts)

export default colors
