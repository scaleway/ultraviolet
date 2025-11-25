import { createVar } from '@vanilla-extract/css'
import type { theme } from '@ultraviolet/themes'

export const templateColumn: Record<
  keyof typeof theme.breakpoints,
  ReturnType<typeof createVar>
> = {
  large: createVar({
    syntax: '*',
    inherits: false,
    initialValue: 'none',
  }),
  xlarge: createVar({
    syntax: '*',
    inherits: false,
    initialValue: 'none',
  }),
  medium: createVar({
    syntax: '*',
    inherits: false,
    initialValue: 'none',
  }),
  small: createVar({
    syntax: '*',
    inherits: false,
    initialValue: 'none',
  }),
  xsmall: createVar({
    syntax: '*',
    inherits: false,
    initialValue: 'none',
  }),
  xxsmall: createVar({
    syntax: '*',
    inherits: false,
    initialValue: 'none',
  }),
}

export const paddings: Record<
  keyof typeof theme.breakpoints,
  ReturnType<typeof createVar>
> = {
  large: createVar({
    syntax: '*',
    inherits: false,
    initialValue: '0',
  }),
  xlarge: createVar({
    syntax: '*',
    inherits: false,
    initialValue: '0',
  }),
  medium: createVar({
    syntax: '*',
    inherits: false,
    initialValue: '0',
  }),
  small: createVar({
    syntax: '*',
    inherits: false,
    initialValue: '0',
  }),
  xsmall: createVar({
    syntax: '*',
    inherits: false,
    initialValue: '0',
  }),
  xxsmall: createVar({
    syntax: '*',
    inherits: false,
    initialValue: '0',
  }),
}
