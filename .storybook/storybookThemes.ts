import { create } from '@storybook/theming'
import lightTheme, { darkTheme } from '../packages/ui/src/theme'
import logoDark from './assets/logo-dark.png'
import logoLight from './assets/logo-light.png'
import lightBrandImage from './assets/scaleway-text-light.png'

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
    brandTitle: 'Ultraviolet UI',

    brandUrl,
    brandImage,

    colorPrimary: theme.colors.primary.backgroundStrong,
    colorSecondary: theme.colors.primary.backgroundStrong,

    // UI
    appBg: theme.colors.neutral.background,
    appContentBg: theme.colors.neutral.background,
    appBorderColor: theme.colors.neutral.borderWeak,

    // Text colors
    textColor: theme.colors.neutral.text,
    textInverseColor: theme.colors.neutral.textStronger,

    // Toolbar default and active colors
    barTextColor: theme.colors.neutral.textWeak,
    barSelectedColor: theme.colors.primary.textWeak,
    barBg: theme.colors.neutral.backgroundWeak,

    buttonBg: theme.colors.neutral.background,
    buttonBorder: theme.colors.neutral.border,

    // BIZARRE
    booleanBg: theme.colors.neutral.background,
    booleanSelectedBg: theme.colors.primary.background,

    // Form colors
    inputBg: theme.colors.neutral.background,
    inputBorder: theme.colors.neutral.border,
    inputTextColor: theme.colors.neutral.text,
    inputBorderRadius: 4,
  })

export const light = generateStorybookTheme({
  base: Base.LIGHT,
  theme: lightTheme,
  brandUrl: 'https://github.com/scaleway/ultraviolet',
  brandImage: logoLight,
})

export const dark = generateStorybookTheme({
  base: Base.DARK,
  theme: darkTheme,
  brandUrl: 'https://github.com/scaleway/ultraviolet',
  brandImage: logoDark,
})
