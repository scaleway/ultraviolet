import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { Children, Fragment } from 'react'
import { Bullet } from '../Bullet'
import { Text } from '../Text'

type Temporal = 'previous' | 'next' | 'current'

const LINE_HEIGHT_SIZES = {
  small: 2,
  medium: 4,
} as const

const loadingAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`

const StyledStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

const StyledText = styled(Text)`
  margin-top: ${({ theme }) => theme.space['1']};
`

const StyledBullet = styled(Bullet)<{ size: 'small' | 'medium' }>`
  margin-top: ${({ theme, size }) =>
    size === 'small' ? theme.space['0.5'] : 0};
`

const loadingStyle = css`
  animation: ${loadingAnimation} 1s linear infinite;
`

const StyledLine = styled.div<{ temporal: Temporal; animated: boolean }>`
  border-radius: ${({ theme }) => theme.radii.default};
  flex-grow: 1;
  border-radius: ${({ theme }) => theme.radii.default};
  background-color: ${({ theme }) => theme.colors.neutral.backgroundStrong};
  position: relative;

  ::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    border-radius: ${({ theme }) => theme.radii.default};
    background-color: ${({ theme }) => theme.colors.primary.backgroundStrong};
    ${({ temporal }) => temporal === 'previous' && `width: 100%;`}
    ${({ temporal, animated }) =>
      temporal === 'current' && animated && loadingStyle}
  }
`

const StyledContainer = styled.div<{
  size: 'small' | 'medium'
  labelPosition: 'bottom' | 'right'
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 0 ${({ theme }) => theme.space['1']};
  gap: ${({ theme, labelPosition, size }) =>
    size === 'medium' && labelPosition === 'bottom'
      ? theme.space['0']
      : theme.space['1']};

  ${StyledStepContainer} {
    display: flex;
    flex-direction: ${({ labelPosition }) =>
      labelPosition === 'bottom' ? 'column' : 'row'};
    align-items: ${({ labelPosition }) =>
      labelPosition === 'bottom' ? 'center' : 'baseline'};
    gap: ${({ theme, labelPosition }) =>
      labelPosition === 'bottom' ? theme.space['0.5'] : theme.space['1']};
    white-space: nowrap;
  }

  ${StyledLine} {
    height: ${({ size }) => LINE_HEIGHT_SIZES[size]}px;
    margin-top: ${({ theme }) => theme.space['2']};
    margin-bottom: ${({ theme }) => theme.space['2']};
  }
`

type StepperNumbersProps = {
  temporal: Temporal
  children: ReactNode
  CurrentStep: number
  size?: 'small' | 'medium'
}

const StepperNumbers = ({
  temporal,
  children,
  CurrentStep,
  size = 'medium',
}: StepperNumbersProps) => (
  <StyledStepContainer>
    <StyledBullet
      sentiment={temporal === 'next' ? 'neutral' : 'primary'}
      {...(temporal === 'previous'
        ? {
            icon: 'check',
          }
        : {
            text: CurrentStep.toString(),
          })}
      prominence={temporal !== 'current' ? 'default' : 'strong'}
      size={size}
    />

    <StyledText
      as="span"
      variant={size === 'medium' ? 'body' : 'bodySmall'}
      prominence={temporal === 'next' ? 'weak' : 'default'}
    >
      {children}
    </StyledText>
  </StyledStepContainer>
)

type StepperProps = {
  animated?: boolean
  selected?: number
  children: ReactNode[]
  className?: string
  labelPosition?: 'bottom' | 'right'
  size?: 'small' | 'medium'
  'data-testid'?: string
}

/**
 * Stepper component to show the progress of a process in a linear way.
 */
export const Stepper = ({
  children,
  selected = 0,
  animated = false,
  className,
  labelPosition = 'bottom',
  size = 'medium',
  'data-testid': dataTestId,
}: StepperProps) => {
  const lastStep = Children.count(children) - 1

  return (
    <StyledContainer
      className={className}
      data-testid={dataTestId}
      labelPosition={labelPosition}
      size={size}
    >
      {Children.map(children, (child, index) => {
        const getTemporal = () => {
          if (selected > index) return 'previous'

          if (selected === index) return 'current'

          return 'next'
        }
        const isNotLast = index < lastStep
        const temporal = getTemporal()

        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={`creation-progress-${index}`}>
            <StepperNumbers
              CurrentStep={index + 1}
              temporal={temporal}
              size={size}
            >
              {child}
            </StepperNumbers>
            {isNotLast ? (
              <StyledLine temporal={temporal} animated={animated} />
            ) : null}
          </Fragment>
        )
      })}
    </StyledContainer>
  )
}
