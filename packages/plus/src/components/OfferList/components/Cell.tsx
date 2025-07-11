'use client'

import styled from '@emotion/styled'
import { List, Skeleton } from '@ultraviolet/ui'
import { ComponentProps } from 'react'
import { useOfferListContext } from '../OfferListProvider'

const StyledCell = styled(List.Cell)`
  white-space: pre-line;
`

const LoadingCell = styled(List.Cell)`
  height: 100%;
`
export const Cell = ({
  children,
  className,
  'data-testid': dataTestId,
  colSpan,
}: ComponentProps<typeof List.Cell>) => {
  const { loading } = useOfferListContext()

  return loading ? (
    <LoadingCell>
      <Skeleton variant="line" data-state={loading} />
    </LoadingCell>
  ) : (
    <StyledCell
      className={className}
      data-testid={dataTestId}
      colSpan={colSpan}
    >
      {children}
    </StyledCell>
  )
}
