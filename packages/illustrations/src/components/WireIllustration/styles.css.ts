import { theme } from '@ultraviolet/themes'
import { createVar, style, styleVariants } from '@vanilla-extract/css'

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
  height: heightVar,
  mask: url,
  maskSize: 'contain',
  WebkitMask: url,
  width: widthVar,
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
