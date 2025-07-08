'use client'

import styled from '@emotion/styled'
import { LeafIcon } from '@ultraviolet/icons'
import { List, Skeleton, Stack } from '@ultraviolet/ui'
import { ComponentProps, useContext } from 'react'
import { useOfferListContext } from '../OfferListProvider'
import { RowContext } from './Row'

const StyledCell = styled(List.Cell)`
  white-space: pre-line;
`

const LoadingCell = styled(List.Cell)`
  height: 100%;
`
export const Cell = ({
  children,
  footPrint,
  ...props
}: ComponentProps<typeof List.Cell> & {
  footPrint?: { score: number; max?: number }
}) => {
  const greenLeavesCount = footPrint?.score ?? 0
  const greyLeavesCount = footPrint ? (footPrint.max ?? 3) - footPrint.score : 0

  const contextRow = useContext(RowContext)

  if (!contextRow)
    throw new Error(
      'OfferList.Cell should be used inside a OfferList.Row component',
    )

  const { loading } = useOfferListContext()

  return loading ? (
    <LoadingCell>
      <Skeleton variant="line" data-state={loading} />
    </LoadingCell>
  ) : (
    <StyledCell {...props}>
      {footPrint ? (
        <Stack direction="column">
          {children}
          <Stack direction="row" gap={0.5}>
            {Array.from({ length: greenLeavesCount }).map((_, i) => (
              <LeafIcon
                key={`green-${i}`}
                sentiment="success"
                size="small"
                disabled={contextRow.disabled}
              />
            ))}
            {Array.from({ length: greyLeavesCount }).map((_, i) => (
              <LeafIcon
                key={`grey-${i}`}
                sentiment="neutral"
                size="small"
                disabled
              />
            ))}
          </Stack>
        </Stack>
      ) : (
        children
      )}
    </StyledCell>
  )
}
