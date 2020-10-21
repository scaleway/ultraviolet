import { css } from '@emotion/core'
import React from 'react'
import { gray550 } from 'theming'
import { cx } from 'utils'
import { Box } from './Box'
import { Icon } from './Icon'

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
