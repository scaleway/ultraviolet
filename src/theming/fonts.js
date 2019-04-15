import { thd } from '@smooth-ui/core-em'

export const monospace = thd(
  'monospace',
  "'Lucida Console', Monaco, 'Courier New', Courier, monospace",
)

export const sansSerif = thd('sansSerif', 'Asap, System, sans-serif')

export const fonts = thd('fonts', {
  sansSerif,
  monospace,
})
