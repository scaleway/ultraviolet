import styled from '@emotion/styled'
import React, { FunctionComponent, HTMLAttributes } from 'react'

const StyledScrollView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`

const ScrollView: FunctionComponent<HTMLAttributes<HTMLDivElement>> = props => (
  <StyledScrollView {...props} />
)

export default ScrollView
