'use client'

import styled from '@emotion/styled'
import { Stack, Text } from '@ultraviolet/ui'
import { ReactNode, useContext } from 'react'
import { Context } from '../Context'

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

const StyledStack = styled(Stack)`
width: 100%;
min-width: 0;
`
type CellProps = {
  children: ReactNode
  title: string
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

export const InfoTableCell = ({ children, title }: CellProps) => {
  const { ellipsis } = useContext(Context)
  if (ellipsis === undefined) {
    throw new Error(
      'InfoTable.Cell should be inside InfoTable to use it properly.',
    )
  }

  return (
    <StyledStack gap="0.5">
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
          oneLine={ellipsis}
        >
          {children}
        </StyledText>
      </Desc>
    </StyledStack>
  )
}
