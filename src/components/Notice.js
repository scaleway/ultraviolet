import React from 'react'
import { css } from '@emotion/core'
import { cx } from 'utils'
import { gray550 } from 'theming'
import { Icon } from './Icon'
import { Box } from './Box'

const style = p => css`
  color: ${gray550(p)};
  font-size: 12px;
  line-height: 20px;
`

export function Notice({ children, ...props }) {
  return (
    <Box css={cx(style)} role="alert" {...props}>
      <Icon name="information-outline" verticalAlign="top" mr={1} size={20} />
      {children}
    </Box>
  )
}
