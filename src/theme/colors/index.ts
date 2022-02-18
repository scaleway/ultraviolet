import light from '../tokens/light'

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

// This function will generate all tokens
const generateTokens = ({
  sentiment,
  contrast,
  neutralContrast,
}: GenerateTokensProps) => {
  const defaultValue =
    (contrast as Record<string, string>)[Object.keys(contrast)[0]] || '#ffffff'
  // Neutral is a particular color it has more shade and they are used differently than usual colors.
  if (sentiment === 'neutral') {
    return {
      /* eslint-disable sort-keys */

      // Background
      background: contrast[500] || defaultValue,
      backgroundHover: contrast[600] || defaultValue,
      backgroundDisabled: contrast[400] || defaultValue,
      backgroundWeak: contrast[100] || defaultValue,
      backgroundWeakHover: contrast[800] || defaultValue,
      backgroundWeakDisabled: contrast[300] || defaultValue,
      backgroundStrong: contrast[800] || defaultValue,
      backgroundStrongHover: contrast[1000] || defaultValue,
      backgroundStrongDisabled: contrast[700] || defaultValue,

      // Text
      text: contrast[800] || defaultValue,
      textHover: contrast[900] || defaultValue,
      textDisabled: contrast[600] || defaultValue,
      textWeak: contrast[600] || defaultValue,
      textWeakHover: contrast[600] || defaultValue,
      textWeakDisabled: contrast[500] || defaultValue,
      textStrong: contrast[100] || defaultValue,
      textStrongHover: contrast[100] || defaultValue,
      textStrongDisabled: contrast[100] || defaultValue,

      // Border
      border: contrast[300] || defaultValue,
      borderHover: contrast[300] || defaultValue,
      borderDisabled: contrast[300] || defaultValue,
      borderWeak: contrast[500] || defaultValue,
      borderWeakHover: contrast[500] || defaultValue,
      borderWeakDisabled: contrast[200] || defaultValue,
      borderStrong: contrast[100] || defaultValue,
      borderStrongHover: contrast[100] || defaultValue,
      borderStrongDisabled: contrast[100] || defaultValue,

      /* eslint-enable sort-keys */
    }
  }

  return {
    /* eslint-disable sort-keys */

    // Background
    background: contrast[300] || defaultValue,
    backgroundHover: contrast[300] || defaultValue,
    backgroundDisabled: contrast[300] || defaultValue,
    backgroundWeak: neutralContrast[100],
    backgroundWeakHover: contrast[800] || defaultValue,
    backgroundWeakDisabled: neutralContrast[100],
    backgroundStrong: contrast[800] || defaultValue,
    backgroundStrongHover: contrast[800] || defaultValue,
    backgroundStrongDisabled: contrast[800] || defaultValue,

    // Text
    text: contrast[800] || defaultValue,
    textHover: contrast[900] || defaultValue,
    textDisabled: contrast[400] || defaultValue,
    textWeak: contrast[800] || defaultValue,
    textWeakHover: contrast[900] || defaultValue,
    textWeakDisabled: contrast[400] || defaultValue,
    textStrong: neutralContrast[100] || '#ffffff',
    textStrongHover: neutralContrast[100] || '#ffffff',
    textStrongDisabled: neutralContrast[100] || '#ffffff',

    // Border
    border: contrast[800] || defaultValue,
    borderHover: contrast[900] || defaultValue,
    borderDisabled: contrast[200] || defaultValue,
    borderWeak: contrast[800] || defaultValue,
    borderWeakHover: contrast[800] || defaultValue,
    borderWeakDisabled: contrast[400] || defaultValue,
    borderStrong: neutralContrast[100] || '#ffffff',
    borderStrongHover: neutralContrast[100] || '#ffffff',
    borderStrongDisabled: neutralContrast[100] || '#ffffff',

    /* eslint-enable sort-keys */
  }
}

export type Color = keyof typeof light.shades

// This function get in parameter a shade of contrasts and return a well formatted design tokens
export const colorsTokens = (
  contrasts: Partial<Record<Color, Partial<ContrastType>>>,
) => {
  // We first get contrasts passed as parameter if some are missing we use local contrasts and deep merge them
  const deepMergedContrasts = Object.keys(light.shades).reduce(
    (acc, contrast) => ({
      ...acc,
      [contrast]: {
        ...light.shades[contrast as Color],
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

const colors = colorsTokens(light.shades)

export default colors
