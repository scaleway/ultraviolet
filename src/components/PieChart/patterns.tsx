import type { SerializedStyles } from '@emotion/react'
import { css } from '@emotion/react'

const discountDot = (color?: string): SerializedStyles => css`
  opacity: 0.6;
  border: 0.3px solid ${color};
  background-size: 10px;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 1px,
    ${color} 1px,
    ${color} 3px
  );
`

const patterns = {
  'discount-dot': discountDot,
} as const

export default patterns
