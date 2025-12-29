import { create } from 'storybook/theming'
import { consoleLightTheme, consoleDarkTheme } from '@ultraviolet/themes'
// import logoDark from './assets/logo-dark.png'
// import logoLight from './assets/logo-light.png'
// import type lightBrandImage from './assets/scaleway-text-light.png'

enum Base {
  LIGHT = 'light',
  DARK = 'dark',
}

type GenerateStorybookThemeProps = {
  base: Base
  theme: typeof consoleDarkTheme | typeof consoleLightTheme
  brandUrl: string
  // brandImage: typeof lightBrandImage
}

const generateStorybookTheme = ({
  base,
  theme,
  brandUrl,
  // brandImage,
}: GenerateStorybookThemeProps) =>
  create({
    base,
    // UI
    appBg: theme.colors.neutral.background,
    appBorderColor: theme.colors.neutral.borderWeak,
    appContentBg: theme.colors.neutral.background,
    barBg: theme.colors.neutral.backgroundWeak,
    barSelectedColor: theme.colors.primary.text,

    // Toolbar default and active colors
    barTextColor: theme.colors.neutral.textWeak,
    buttonBg: theme.colors.neutral.background,
    buttonBorder: theme.colors.neutral.border,

    // BIZARRE
    booleanBg: theme.colors.neutral.background,
    booleanSelectedBg: theme.colors.primary.background,
    // brandImage,
    brandTitle: 'Ultraviolet UI',

    brandUrl,

    colorPrimary: theme.colors.primary.backgroundStrong,
    colorSecondary: theme.colors.primary.backgroundStrong,

    // Form colors
    inputBg: theme.colors.neutral.background,
    inputBorder: theme.colors.neutral.border,
    inputBorderRadius: 4,
    inputTextColor: theme.colors.neutral.text,

    // Text colors
    textColor: theme.colors.neutral.text,
    textInverseColor: theme.colors.neutral.textStronger,
  })

export const light = generateStorybookTheme({
  base: Base.LIGHT,
  // brandImage: logoLight,
  brandUrl: 'https://github.com/scaleway/ultraviolet',
  theme: consoleLightTheme,
})

export const dark = generateStorybookTheme({
  base: Base.DARK,
  // brandImage: logoDark,
  brandUrl: 'https://github.com/scaleway/ultraviolet',
  theme: consoleDarkTheme,
})
