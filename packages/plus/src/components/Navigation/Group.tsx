import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { Separator, Stack, Text } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
import { Children } from 'react'
import { useNavigation } from './NavigationProvider'
import { ANIMATION_DURATION } from './constants'

type GroupProps = {
  children: ReactNode
  label: string
}

const animateGroup = keyframes`
  0% {
    opacity: 0;
    max-height: 0;
    margin-bottom: -8px;
  }

  100% {
    opacity: 1;
    max-height: 40px;
    margin-bottom: 0;
  }
`

const StyledText = styled(Text)`
  padding-bottom: ${({ theme }) => theme.space['1']};

  transition:
    opacity ${ANIMATION_DURATION}ms ease-in-out,
    height ${ANIMATION_DURATION}ms ease-in-out;
  height: ${({ theme }) =>
    `calc(${theme.typography.bodySmallStrong.lineHeight} + ${theme.space['1']})`}; // This is only for animation
`

const StyledStack = styled(Stack)`
  padding-top: ${({ theme }) => theme.space['2']};
`

const StyledSeparator = styled(Separator)`
  margin: ${({ theme }) => `${theme.space['2']} -${theme.space['2']}`};
`

const Container = styled.div`
  &[data-animation='expand'] {
    ${StyledText} {
      animation: ${animateGroup} ${ANIMATION_DURATION}ms ease-in-out;
    }
  }

  &[data-animation='collapse'] {
    ${StyledText} {
      animation: ${animateGroup} ${ANIMATION_DURATION}ms ease-in-out reverse;
    }
  }
`

export const Group = ({ children, label }: GroupProps) => {
  const context = useNavigation()

  if (!context) {
    throw new Error('Navigation.Group can only be used inside a Navigation')
  }

  const { expanded, animation } = context

  if (Children.count(children) > 0) {
    return (
      <Container data-animation={animation}>
        <StyledSeparator />
        <StyledStack direction="column">
          {expanded || animation === 'expand' ? (
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
      </Container>
    )
  }

  return null
}
