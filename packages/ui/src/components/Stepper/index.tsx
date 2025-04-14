'use client'

import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { Children, Fragment, isValidElement } from 'react'
import { Step } from './Step'
import { StepperProvider } from './StepperProvider'

const LINE_HEIGHT_SIZES = {
  small: 2,
  medium: 4,
} as const

type Temporal = 'done' | 'current' | 'next'

type StepperProps = {
  animated?: boolean
  /**
   * When true, the user can navigate through the steps by clicking on the bullets
   */
  interactive?: boolean
  /**
   * Number of the active step
   */
  selected?: number
  children: ReactNode
  className?: string
  labelPosition?: 'bottom' | 'right'
  size?: 'small' | 'medium'
  'data-testid'?: string
  separator?: boolean
}

const StyledContainer = styled.div<{
  size: 'small' | 'medium'
  labelPosition: 'bottom' | 'right'
  separator: boolean
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: ${({ separator, labelPosition }) =>
    !separator && labelPosition === 'right' ? 'flex-end' : 'flex-start'};
  gap: ${({ theme, labelPosition, separator }) => {
    if (separator) {
      return labelPosition === 'bottom' ? theme.space['0.5'] : theme.space['1']
    }

    return theme.space['4']
  }};
`

const loadingAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`

const loadingStyle = css`
  animation: ${loadingAnimation} 1s linear infinite;
`

const StyledLine = styled.div<{
  temporal: Temporal
  animated: boolean
  'data-size': 'small' | 'medium'
}>`
    border-radius: ${({ theme }) => theme.radii.default};
    flex-grow: 1;
    border-radius: ${({ theme }) => theme.radii.default};
    background-color: ${({ theme, temporal }) => (temporal === 'done' ? theme.colors.primary.backgroundStrong : theme.colors.neutral.backgroundStrong)};
    position: relative;
    height: ${LINE_HEIGHT_SIZES.medium}px;
    margin-top: ${({ theme }) => theme.space['2']};
    margin-bottom: ${({ theme }) => theme.space['2']};

    &[data-size='small'] {
      height: ${LINE_HEIGHT_SIZES.small}px;
    }
    ::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      border-radius: ${({ theme }) => theme.radii.default};
      background-color: ${({ theme }) => theme.colors.primary.backgroundStrong};
      ${({ temporal }) => {
        if (temporal === 'done') return 'width: 100%;'

        return null
      }}
      ${({ temporal, animated }) =>
        temporal === 'current' && animated && loadingStyle}
    }
  `

export const Stepper = ({
  children,
  interactive = false,
  selected = 1,
  animated = false,
  className,
  labelPosition = 'bottom',
  size = 'medium',
  'data-testid': dataTestId,
  separator = true,
}: StepperProps) => {
  const cleanChildren = Children.toArray(children).filter(isValidElement)
  const lastStep = Children.count(cleanChildren) - 1

  return (
    <StepperProvider
      interactive={interactive}
      selected={selected}
      animated={animated}
      labelPosition={labelPosition}
      size={size}
      separator={separator}
    >
      <StyledContainer
        className={className}
        data-testid={dataTestId}
        labelPosition={labelPosition}
        size={size}
        separator={separator}
      >
        {Children.map(cleanChildren, (child, index) => {
          const getTemporal = () => {
            if (index < selected) return 'done'

            if (index === selected) return 'current'

            return 'next'
          }
          const isNotLast = index < lastStep
          const temporal = getTemporal()

          return (
            <Fragment key={`creation-progress-${index}`}>
              <Step index={index} {...(child.props as object)} />

              {isNotLast && separator && labelPosition === 'right' ? (
                <StyledLine
                  temporal={temporal}
                  animated={animated}
                  data-size={size}
                />
              ) : null}
            </Fragment>
          )
        })}
      </StyledContainer>
    </StepperProvider>
  )
}

Stepper.Step = Step
