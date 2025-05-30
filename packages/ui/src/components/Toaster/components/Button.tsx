'use client'

import styled from '@emotion/styled'
import type { ComponentProps } from 'react'
import { Button } from '../../Button'

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.colors.neutral.textStronger};
`

export const ToastButton = ({
  variant,
  ...props
}: ComponentProps<typeof Button>) => {
  if (variant === 'ghost') {
    return <StyledButton {...props} variant={variant} size="xsmall" />
  }

  return <Button {...props} variant={variant} size="xsmall" />
}
