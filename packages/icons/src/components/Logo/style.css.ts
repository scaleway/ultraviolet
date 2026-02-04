import { theme } from '@ultraviolet/themes'
import { styleVariants } from '@vanilla-extract/css'
import { SIZES } from './constant'

type StyleVariant = ReturnType<typeof styleVariants>

export const logo: StyleVariant = styleVariants(
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
