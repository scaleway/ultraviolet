'use client'

import styled from '@emotion/styled'
import { Children, type ReactNode } from 'react'
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
        <Stack gap={1} alignItems="center" direction="row">
          <Text
            variant="captionStrong"
            as="span"
            prominence="weak"
            sentiment="neutral"
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
