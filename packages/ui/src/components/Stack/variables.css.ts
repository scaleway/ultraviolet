import { createVar } from '@vanilla-extract/css'

export const widthVar = createVar({
  syntax: '*',
  inherits: false,
  initialValue: 'auto',
})
export const maxWidthVar = createVar({
  syntax: '*',
  inherits: false,
  initialValue: 'none',
})
export const minWidthVar = createVar({
  syntax: '*',
  inherits: false,
  initialValue: 'none',
})
export const flexVar = createVar({
  syntax: '*',
  inherits: false,
  initialValue: '0 1 auto',
})
