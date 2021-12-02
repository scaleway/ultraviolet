import * as sentiments from './contrasts'

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
  contrast: ContrastType
  neutralContrast: ContrastType
}

// This function will generate all colors tokens using all contrasts of generated color and neutral contrasts
const generateTokens = ({
  contrast,
  neutralContrast,
}: GenerateTokensProps) => ({
  // Background
  background: contrast['100'],
  backgroundHover: contrast['100'],
  backgroundDisabled: contrast['100'],
  backgroundWeak: neutralContrast['100'],
  backgroundWeakHover: neutralContrast['100'],
  backgroundWeakDisabled: neutralContrast['100'],
  backgroundStrong: contrast['900'],
  backgroundStrongHover: contrast['900'],
  backgroundStrongDisabled: contrast['900'],

  // Text
  text: contrast['900'],
  textHover: contrast['900'],
  textDisabled: contrast['900'],
  textWeak: contrast['900'],
  textWeakHover: contrast['900'],
  textWeakDisabled: contrast['900'],
  textStrong: neutralContrast['100'],
  textStrongHover: neutralContrast['100'],
  textStrongDisabled: neutralContrast['100'],

  // Border
  border: contrast['900'],
  borderHover: contrast['900'],
  borderDisabled: contrast['900'],
  borderWeak: contrast['900'],
  borderWeakHover: contrast['900'],
  borderWeakDisabled: contrast['900'],
  borderStrong: contrast['900'],
  borderStrongHover: contrast['900'],
  borderStrongDisabled: contrast['900'],
})

const colorTokens = Object.keys(sentiments).reduce(
  (acc, sentiment) => ({
    ...acc,
    [sentiment]: generateTokens({
      contrast: sentiments[sentiment] as ContrastType,
      neutralContrast: sentiments.neutral,
    }),
  }),
  {},
)

export default colorTokens
