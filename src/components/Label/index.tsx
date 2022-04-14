import styled from '@emotion/styled'
import React, { ComponentProps } from 'react'

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.colors.neutral.text};
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  margin-bottom: 8px;
`

const Label = (props: ComponentProps<typeof StyledLabel>) => (
  <StyledLabel {...props} />
)

export default Label
