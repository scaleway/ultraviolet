import styled from '@emotion/styled'
import { Stack, Text } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
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

export const Group = ({ children, label }: GroupProps) => {
  const context = useNavigation()

  if (!context) {
    throw new Error('Navigation.Group can only be used inside a Navigation')
  }

  return (
    <StyledStack direction="column">
      <StyledText
        as="span"
        variant="bodySmallStrong"
        sentiment="neutral"
        prominence="weak"
      >
        {label}
      </StyledText>
      {children}
    </StyledStack>
  )
}
