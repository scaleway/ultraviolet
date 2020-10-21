import { css } from '@emotion/core'
import React from 'react'
import { borderRadius, gray350 } from 'theming'
import { cx, sp } from 'utils'
import { Box } from './Box'

const style = p => css`
  padding: ${sp(1)(p)} ${sp(2)(p)};
  border-radius: ${borderRadius(p)};
  border: 1px solid ${gray350(p)};
`

export function BorderedBox(props) {
  return <Box css={cx(style)} {...props} />
}
