import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { Children, Fragment } from 'react'
import flattenChildren from 'react-flatten-children'
import { Bullet } from '../Bullet'
import { Text } from '../Text'

type Temporal = 'previous' | 'next' | 'current'

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

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 0 ${({ theme }) => theme.space['1']};

  ${StyledStepContainer} {
    width: ${({ theme }) => theme.space['4']};
    white-space: nowrap;
  }

  ${StyledLine} {
    height: ${({ theme }) => theme.space['0.5']};
    margin-top: ${({ theme }) => theme.space['2']};
    margin-bottom: ${({ theme }) => theme.space['2']};
  }
`

type StepperNumbersProps = {
  temporal: Temporal
  children: ReactNode
  CurrentStep: number
}

const StepperNumbers = ({
  temporal,
  children,
  CurrentStep,
}: StepperNumbersProps) => (
  <StyledStepContainer>
    <Bullet
      sentiment={temporal === 'next' ? 'neutral' : 'primary'}
      {...(temporal === 'previous'
        ? {
            icon: 'check',
          }
        : {
            text: CurrentStep.toString(),
          })}
      prominence={temporal !== 'current' ? 'default' : 'strong'}
    />

    <StyledText
      as="span"
      variant="bodySmall"
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
  'data-testid': dataTestId,
}: StepperProps) => {
  const lastStep = Children.count(children) - 1

  return (
    <StyledContainer className={className} data-testid={dataTestId}>
      {flattenChildren(children).map((child, index) => {
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
            <StepperNumbers CurrentStep={index + 1} temporal={temporal}>
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
