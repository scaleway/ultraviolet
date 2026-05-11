import { theme } from '@ultraviolet/themes'
import { styleVariants } from '@vanilla-extract/css'
import { SIZES } from './constant'

export const logo = styleVariants(
  Object.fromEntries(
    Object.keys(SIZES).map(size => [
      size,
      {
        height: theme.sizing[SIZES[size as keyof typeof SIZES]],
        minWidth: theme.sizing[SIZES[size as keyof typeof SIZES]],
        width: theme.sizing[SIZES[size as keyof typeof SIZES]],
      },
    ]),
  ),
)
