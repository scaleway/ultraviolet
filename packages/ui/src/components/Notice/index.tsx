'use client'

import styled from '@emotion/styled'
import { InformationOutlineIcon } from '@ultraviolet/icons'
import type { ReactNode } from 'react'
import { Text } from '../Text'

type NoticeProps = {
  children: ReactNode
  className?: string
  'data-testid'?: string
}

const StyledSpan = styled(Text)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space['1']};
`

/**
 * A Notice is used to display a short message to the user.
 */
export const Notice = ({
  children,
  className,
  'data-testid': dataTestId,
}: NoticeProps) => (
  <StyledSpan
    as="span"
    variant="caption"
    sentiment="neutral"
    prominence="weak"
    data-testid={dataTestId}
    className={className}
  >
    <InformationOutlineIcon
      size="small"
      sentiment="neutral"
      prominence="weak"
    />
    {children}
  </StyledSpan>
)
