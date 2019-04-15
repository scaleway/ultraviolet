import React from 'react'
import { css } from '@emotion/core'
import { Box } from '@smooth-ui/core-em'
import { cx } from 'utils'
import { monospace, gray100, gray700 } from 'theming'

const style = p => css`
  font-family: ${monospace(p)};
  font-size: 13px;
  font-weight: 500;
  border-radius: 5px;
  color: ${gray700(p)};
  background-color: ${gray100(p)};
  padding: 3px 5px;
`

export function Command(props) {
  return <Box css={cx(style)} as="code" {...props} />
}
