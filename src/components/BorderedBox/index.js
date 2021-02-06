import { css } from '@emotion/react'
import React from 'react'
import { colors, radii, space } from '../../theme'
import { Box } from '../Box'

const style = css`
  padding: ${space['1']} ${space['2']};
  border-radius: ${radii.default};
  border: 1px solid ${colors.gray350};
`

export function BorderedBox(props) {
  return <Box css={style} {...props} />
}
