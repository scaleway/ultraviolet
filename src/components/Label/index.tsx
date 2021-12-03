import styled from '@emotion/styled'
import React, { FunctionComponent, LabelHTMLAttributes } from 'react'

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.colorsDeprecated.gray950};
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  margin-bottom: 8px;
`

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

const Label: FunctionComponent<LabelProps> = props => <StyledLabel {...props} />

export default Label
