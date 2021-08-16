import styled from '@emotion/styled'
import React, { FunctionComponent, LabelHTMLAttributes } from 'react'

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.colors.gray950};
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  margin-bottom: 8px;
`

const Label: FunctionComponent<LabelHTMLAttributes<HTMLLabelElement>> =
  props => <StyledLabel {...props} />

export default Label
