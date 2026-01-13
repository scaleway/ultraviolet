import type { theme } from '@ultraviolet/themes'
import { createVar } from '@vanilla-extract/css'

export const templateColumn: Record<
  keyof typeof theme.breakpoints,
  ReturnType<typeof createVar>
> = {
  large: createVar({
    inherits: false,
    initialValue: 'none',
    syntax: '*',
  }),
  medium: createVar({
    inherits: false,
    initialValue: 'none',
    syntax: '*',
  }),
  small: createVar({
    inherits: false,
    initialValue: 'none',
    syntax: '*',
  }),
  xlarge: createVar({
    inherits: false,
    initialValue: 'none',
    syntax: '*',
  }),
  xsmall: createVar({
    inherits: false,
    initialValue: 'none',
    syntax: '*',
  }),
  xxsmall: createVar({
    inherits: false,
    initialValue: 'none',
    syntax: '*',
  }),
}

export const paddings: Record<
  keyof typeof theme.breakpoints,
  ReturnType<typeof createVar>
> = {
  large: createVar({
    inherits: false,
    initialValue: '0',
    syntax: '*',
  }),
  medium: createVar({
    inherits: false,
    initialValue: '0',
    syntax: '*',
  }),
  small: createVar({
    inherits: false,
    initialValue: '0',
    syntax: '*',
  }),
  xlarge: createVar({
    inherits: false,
    initialValue: '0',
    syntax: '*',
  }),
  xsmall: createVar({
    inherits: false,
    initialValue: '0',
    syntax: '*',
  }),
  xxsmall: createVar({
    inherits: false,
    initialValue: '0',
    syntax: '*',
  }),
}
