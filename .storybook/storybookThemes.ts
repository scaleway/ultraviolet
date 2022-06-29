import { create } from '@storybook/theming'
import lightBrandImage from './assets/scaleway-text-light.png'
import logoLight from './assets/logo-light.svg'
import logoDark from './assets/logo-dark.svg'
import lightTheme, { darkTheme } from '../src/theme'

enum Base {
  LIGHT = 'light',
  DARK = 'dark',
}

type GenerateStorybookThemeProps = {
  base: Base
  theme: typeof darkTheme | typeof lightTheme
  brandUrl: string
  brandImage: typeof lightBrandImage
}

const generateStorybookTheme = ({
  base,
  theme,
  brandUrl,
  brandImage,
}: GenerateStorybookThemeProps) =>
  create({
    base,
    brandTitle: 'Scaleway UI',

    brandUrl,
    brandImage,

    colorPrimary: theme.colors.primary.backgroundStrong,
    colorSecondary: theme.colors.primary.backgroundStrong,

    // UI
    appBg: theme.colors.neutral.backgroundWeak,
    appContentBg: theme.colors.neutral.backgroundWeak,
    appBorderColor: theme.colors.neutral.borderWeak,

    // Text colors
    textColor: theme.colors.neutral.text,
    textInverseColor: theme.colors.neutral.textStronger,

    // Toolbar default and active colors
    barTextColor: theme.colors.neutral.textWeak,
    barSelectedColor: theme.colors.primary.textWeak,
    barBg: theme.colors.neutral.backgroundWeak,

    // Form colors
    inputBg: 'white',
    inputBorder: 'silver',
    inputTextColor: 'black',
    inputBorderRadius: 4,
  })

export const light = generateStorybookTheme({
  base: Base.LIGHT,
  theme: lightTheme,
  brandUrl: 'https://github.com/scaleway/scaleway-ui',
  brandImage: logoLight,
})

export const dark = generateStorybookTheme({
  base: Base.DARK,
  theme: darkTheme,
  brandUrl: 'https://github.com/scaleway/scaleway-ui',
  brandImage: logoDark,
})
