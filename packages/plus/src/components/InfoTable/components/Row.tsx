'use client'

import styled from '@emotion/styled'
import { Row } from '@ultraviolet/ui'
import type { ReactNode } from 'react'

export const StyledRow = styled(Row)`
  border-bottom: 1px ${({ theme }) => theme.colors.neutral.border} solid;
  padding-block: ${({ theme }) => theme.space[2]};

  :first-of-type {
    padding-top: 0;
  }

  :last-of-type {
    padding-bottom: 0;
    border-bottom-color: transparent;

  }

  & > *:not(:last-child) {
    padding-right: ${({ theme }) => theme.space[2]}; // Use this instead of gap so that elements can be aligned even if there is not the same number of columns

  }
`
type RowProps = {
  children: ReactNode
  templateColumns: string
}

export const InfoTableRow = ({ children, templateColumns }: RowProps) => (
  <StyledRow templateColumns={templateColumns}>{children}</StyledRow>
)
