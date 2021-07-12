import styled from '@emotion/styled'
import React from 'react'
import Box from '../Box'

const StyledScrollView = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`

const ScrollView = props => <StyledScrollView {...props} />

export default ScrollView
