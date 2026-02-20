import { createVar } from '@vanilla-extract/css'

export const widthVar = createVar({
  inherits: false,
  initialValue: 'auto',
  syntax: '*',
})
export const maxWidthVar = createVar({
  inherits: false,
  initialValue: 'none',
  syntax: '*',
})
export const minWidthVar = createVar({
  inherits: false,
  initialValue: 'none',
  syntax: '*',
})
export const flexVar = createVar({
  inherits: false,
  initialValue: '0 1 auto',
  syntax: '*',
})
