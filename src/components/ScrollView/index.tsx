import styled from '@emotion/styled'
import React, { FunctionComponent } from 'react'
import Box from '../Box'

const StyledScrollView = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`

const ScrollView: FunctionComponent<XStyledProps> = props => (
  <StyledScrollView {...props} />
)

export default ScrollView
