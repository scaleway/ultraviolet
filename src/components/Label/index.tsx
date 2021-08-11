import styled from '@emotion/styled'
import React, { FunctionComponent } from 'react'

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.colors.gray950};
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  margin-bottom: 8px;
`

const Label: FunctionComponent = props => <StyledLabel {...props} />

export default Label
