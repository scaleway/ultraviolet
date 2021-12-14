import styled from '@emotion/styled'
import React, { FunctionComponent, LabelHTMLAttributes } from 'react'

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.colors.neutral.text};
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  margin-bottom: 8px;
`

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

const Label: FunctionComponent<LabelProps> = props => <StyledLabel {...props} />

export default Label
