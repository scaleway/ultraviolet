import { Color, SCWUITheme } from '.'

export const getTextDisabled = (theme: SCWUITheme, variant: Color) =>
  variant
    ? theme.colors[variant as Exclude<Color, 'neutral'>]?.textWeakDisabled ??
      theme.colors.neutral.textDisabled
    : theme.colors.neutral.textDisabled

export const getBackgroundDisabled = (theme: SCWUITheme, variant: Color) =>
  variant
    ? theme.colors[variant as Exclude<Color, 'neutral'>]
        ?.backgroundWeakDisabled ?? theme.colors.neutral.backgroundDisabled
    : theme.colors.neutral.backgroundDisabled

export const getBorderDisabled = (theme: SCWUITheme, variant: Color) =>
  variant
    ? theme.colors[variant as Exclude<Color, 'neutral'>]?.borderWeakDisabled ??
      theme.colors.neutral.borderDisabled
    : theme.colors.neutral.borderDisabled
