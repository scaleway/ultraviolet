import { createVar, style, styleVariants } from '@vanilla-extract/css'
import { theme } from '@ultraviolet/themes'

export const COLORS = [
  'primary',
  'secondary',
  'neutral',
  'success',
  'danger',
  'warning',
  'info',
] as const

export const widthVar = createVar()
export const heightVar = createVar()
export const url = createVar()

const illustrationBase = style({
  maskSize: 'contain',
  WebkitMask: url,
  mask: url,
  width: widthVar,
  height: heightVar,
})

export const illustrationVariants = styleVariants(
  COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [color]: [
        illustrationBase,
        { backgroundColor: theme.colors[color].icon },
      ],
    }),
    {} as Record<
      (typeof COLORS)[number],
      (string | { backgroundColor: string })[]
    >,
  ),
)
