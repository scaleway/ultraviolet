'use client'

import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { Children } from 'react'
import { Stack } from '../../Stack'
import { Text } from '../../Text'

const Container = styled.span`
  padding: ${({ theme }) => `${theme.space['0.5']} ${theme.space['1.5']}`};
  text-align: left;
`

type GroupProps = {
  label: string
  children: ReactNode
  labelDescription?: ReactNode
  /**
   * Empty state will be shown when there are no children
   */
  emptyState?: ReactNode
}

export const Group = ({
  label,
  children,
  labelDescription,
  emptyState,
}: GroupProps) => {
  const isChildrenEmpty = Children.count(children) === 0

  return (
    <>
      <Container>
        <Stack alignItems="center" direction="row" gap={1}>
          <Text
            as="span"
            prominence="weak"
            sentiment="neutral"
            variant="captionStrong"
          >
            {label}
          </Text>
          {labelDescription || null}
        </Stack>
      </Container>
      {isChildrenEmpty && emptyState ? emptyState : children}
    </>
  )
}
