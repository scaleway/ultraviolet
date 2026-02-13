import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'

export const url = createVar()

export const illustration = style({
  height: 200,
  mask: 'url(https://assets.scaleway.com/illustrations/products/blockStorage/block-storage-wire.svg) center center / contain no-repeat',
  maskSize: 'contain',
  WebkitMask:
    'url(https://assets.scaleway.com/illustrations/products/blockStorage/block-storage-wire.svg) center center / contain no-repeat',
  width: 200,
  backgroundColor: theme.colors.neutral.icon,
})
