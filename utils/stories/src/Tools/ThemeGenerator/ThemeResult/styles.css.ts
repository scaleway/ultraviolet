import { theme } from '@ultraviolet/themes'
import { globalStyle, style } from '@vanilla-extract/css'

export const snippetResult = style({})

globalStyle(`${snippetResult} pre`, {
  padding: theme.space[2],
})

export const themeGeneratorStepper = style({
  padding: `0 ${theme.space[2]}`,
})

export const themeGeneratorStepList = style({ margin: 0 })

export const themeGeneratorStack = style({ gap: 6 })

export const themeGeneratorContainer = style({
  background: theme.colors.neutral.background,
  borderRadius: theme.radii.large,
  boxShadow: theme.shadows.hoverNeutral,
  padding: theme.space[4],
})
