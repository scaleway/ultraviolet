import { styleVariants } from '@vanilla-extract/css'
import { SIZES } from './constant'
import { theme } from '@ultraviolet/themes'

export const logo = styleVariants(
  Object.fromEntries(
    Object.keys(SIZES).map(size => [
      size,
      {
        width: theme.sizing[SIZES[size as keyof typeof SIZES]],
        minWidth: theme.sizing[SIZES[size as keyof typeof SIZES]],
        height: theme.sizing[SIZES[size as keyof typeof SIZES]],
      },
    ]),
  ),
)
