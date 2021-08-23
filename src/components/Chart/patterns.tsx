import { SerializedStyles, css } from '@emotion/react'
import React, { ReactElement } from 'react'

const DiscountPattern = (color: string): ReactElement => (
  <pattern
    key="pattern-discount"
    id="discount"
    width="5"
    height="5"
    patternUnits="userSpaceOnUse"
  >
    <circle cx="0" cy="0" r="10" fill="#ffffff" fillOpacity="1" />
    <line
      x1="0"
      y1="0"
      x2="0"
      y2="100"
      stroke={color}
      strokeWidth={5}
      opacity={0.6}
    />
  </pattern>
)
const discountDot = (color: string): SerializedStyles => css`
  opacity: 0.6;
  border: 0.3px solid ${color};
  background-size: 10px;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 1px,
    ${color} 1px,
    ${color} 2px
  );
`

export default {
  discount: DiscountPattern,
  'discount-dot': discountDot,
}
