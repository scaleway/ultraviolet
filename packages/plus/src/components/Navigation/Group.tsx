import styled from '@emotion/styled'
import { Separator, Stack, Text } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
import { Children } from 'react'
import { useNavigation } from './NavigationProvider'

type GroupProps = {
  children: ReactNode
  label: string
}

const StyledText = styled(Text)`
  padding-bottom: ${({ theme }) => theme.space['1']};
`

const StyledStack = styled(Stack)`
  padding-top: ${({ theme }) => theme.space['2']};
`

const StyledSeparator = styled(Separator)`
  margin: ${({ theme }) => `${theme.space['2']} -${theme.space['2']}`};
`

export const Group = ({ children, label }: GroupProps) => {
  const context = useNavigation()

  if (!context) {
    throw new Error('Navigation.Group can only be used inside a Navigation')
  }

  const { expanded } = context

  if (Children.count(children) > 0) {
    return (
      <>
        <StyledSeparator />
        <StyledStack direction="column">
          {expanded ? (
            <StyledText
              as="span"
              variant="bodySmallStrong"
              sentiment="neutral"
              prominence="weak"
            >
              {label}
            </StyledText>
          ) : null}
          {children}
        </StyledStack>
      </>
    )
  }

  return null
}
