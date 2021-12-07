import styled from '@emotion/styled'
import React, { FunctionComponent, HTMLAttributes } from 'react'

const StyledScrollView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`

type ScrollViewProps = HTMLAttributes<HTMLDivElement>

const ScrollView: FunctionComponent<ScrollViewProps> = props => (
  <StyledScrollView {...props} />
)

export default ScrollView
