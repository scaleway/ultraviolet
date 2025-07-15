'use client'

import styled from '@emotion/styled'
import { Stack, Text } from '@ultraviolet/ui'
import type { ReactNode } from 'react'

export const Term = styled.dt`
  font-weight: ${({ theme }) => theme.typography.bodyStrong.weight};
  color: ${({ theme }) => theme.colors.neutral.textStrong};
  display: inline-flex;
  align-items: center;
  min-width: 0;
`

const Desc = styled.dd`
  color: ${({ theme }) => theme.colors.neutral.text};
  margin: 0;
  min-width: 0;
  width: 100%;
`

type CellProps = {
  children: ReactNode
  title: string
  multiline?: boolean
}

const StyledText = styled(Text)`
  display: block; // To work with ellipsis (multiLine = false)
  min-width: 0;
  width: 100%;

  & > * {
    display: inline-flex;  // Children should be inline
    align-items: center;
    margin-right: ${({ theme }) => theme.space[1]}; // Replaces gap
  }
`

export const InfoTableCell = ({
  children,
  title,
  multiline = false,
}: CellProps) => (
  <Stack gap="0.5" width="100%" minWidth="0">
    <Term>
      <Text
        as="p"
        variant="bodySmallStrong"
        sentiment="neutral"
        prominence="weak"
      >
        {title}
      </Text>
    </Term>
    <Desc>
      <StyledText
        as="div"
        variant="body"
        sentiment="neutral"
        prominence="default"
        oneLine={!multiline}
      >
        {children}
      </StyledText>
    </Desc>
  </Stack>
)
