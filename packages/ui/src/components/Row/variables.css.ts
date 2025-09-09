import { createVar } from '@vanilla-extract/css'
import type { theme } from '@ultraviolet/themes'

export const templateColumn: Record<
  keyof typeof theme.breakpoints,
  ReturnType<typeof createVar>
> = {
  large: createVar(),
  xlarge: createVar(),
  medium: createVar(),
  small: createVar(),
  xsmall: createVar(),
  xxsmall: createVar(),
}

export const paddings: Record<
  keyof typeof theme.breakpoints,
  ReturnType<typeof createVar>
> = {
  large: createVar(),
  xlarge: createVar(),
  medium: createVar(),
  small: createVar(),
  xsmall: createVar(),
  xxsmall: createVar(),
}
