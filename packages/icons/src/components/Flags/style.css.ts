import { theme } from '@ultraviolet/themes'
import { styleVariants } from '@vanilla-extract/css'
import { SIZES } from './constant'

export const flag = styleVariants(
  Object.fromEntries(
    Object.keys(SIZES).map(size => [
      size,
      {
        height: theme.sizing[SIZES[size as keyof typeof SIZES].size],
        minWidth: theme.sizing[SIZES[size as keyof typeof SIZES].size],
        width: theme.sizing[SIZES[size as keyof typeof SIZES].size],
        padding: SIZES[size as keyof typeof SIZES].padding,
      },
    ]),
  ),
)
