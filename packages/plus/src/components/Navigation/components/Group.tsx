'use client'

import styled from '@emotion/styled'
import { Stack, Text } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
import { Children } from 'react'
import { useNavigation } from '../NavigationProvider'
import { ANIMATION_DURATION, groupAnimation } from '../constants'

type GroupProps = {
  children: ReactNode
  label: string
}

const StyledText = styled(Text)`
  padding-bottom: ${({ theme }) => theme.space['1']};
  padding-left: ${({ theme }) => theme.space['1']};

  transition:
    opacity ${ANIMATION_DURATION}ms ease-in-out,
    height ${ANIMATION_DURATION}ms ease-in-out;
  height: ${({ theme }) =>
    `calc(${theme.typography.bodySmallStrong.lineHeight} + ${theme.space['1']})`}; // This is only for animation
`

const StyledStack = styled(Stack)`
  padding-top: ${({ theme }) => theme.space['1']};
`

const Container = styled.div`
  &[data-animation='expand'][data-animation-type="complex"] {
    ${StyledText} {
      animation: ${groupAnimation} ${ANIMATION_DURATION}ms ease-in-out;
    }
  }

  &[data-animation='collapse'][data-animation-type="complex"] {
    ${StyledText} {
      animation: ${groupAnimation} ${ANIMATION_DURATION}ms ease-in-out reverse;
    }
  }
`

export const Group = ({ children, label }: GroupProps) => {
  const context = useNavigation()

  if (!context) {
    throw new Error(
      'Navigation.Group can only be used inside a NavigationProvider.',
    )
  }

  const { expanded, animation, animationType } = context

  const isDiplay = !animation && expanded

  if (Children.count(children) > 0) {
    return (
      <Container
        data-animation={animation}
        data-animation-type={animationType}
        style={{ width: animation ? '100%' : undefined }}
      >
        <StyledStack direction="column">
          {isDiplay ? (
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
