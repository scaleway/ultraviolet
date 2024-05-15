import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import {
  Children,
  Fragment,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'
import { Bullet } from '../Bullet'
import { Text } from '../Text'

type Temporal = 'previous' | 'next' | 'current'

type ContextType = {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  interactive: boolean
}
const State = createContext<ContextType>({
  step: 0,
  setStep: () => {},
  interactive: false,
})

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

const StyledBullet = styled(Bullet)<{
  size: 'small' | 'medium'
  isActive: boolean
}>`
  margin-top: ${({ theme, size }) =>
    size === 'small' ? theme.space['0.5'] : 0};
  transition: all 300ms;

  ${({ theme, isActive }) =>
    isActive
      ? `background-color: ${theme.colors.primary.backgroundStrongHover}; 
      box-shadow: ${theme.shadows.focusPrimary};`
      : null}
`
const StyledText = styled(Text)`
  margin-top: ${({ theme }) => theme.space['1']};
  transition: text-decoration-color 250ms ease-out;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  text-decoration-color: transparent;
  }
`
const StyledStepContainer = styled.div<{
  isActive: boolean
  isDone: boolean
  'data-interactive': boolean
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transition: all 300ms;

  &[data-interactive='true'] {
    cursor: pointer;

    &:hover {
      & > ${StyledText} {
        color: ${({ theme, isActive }) =>
          isActive
            ? theme.colors.primary.textHover
            : theme.colors.neutral.textHover};
        text-decoration: underline
          ${({ theme, isActive }) =>
            isActive
              ? theme.colors.primary.text
              : theme.colors.neutral.textHover};
        text-decoration-thickness: 1px;
      }

      & > ${StyledBullet} {
        box-shadow: ${({ theme, isDone, isActive }) =>
          isDone || isActive ? theme.shadows.focusPrimary : 'none'};
      }
    }
  }
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
  separator: boolean
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: ${({ theme, labelPosition, separator }) => {
    if (separator) {
      return labelPosition === 'bottom' ? theme.space['0.5'] : theme.space['1']
    }

    return theme.space['4']
  }};

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
  children: ReactNode
  size?: 'small' | 'medium'
  onClick?: (index: number) => void
  index: number
}

const StepperNumbers = ({
  children,
  index,
  onClick,
  size = 'medium',
}: StepperNumbersProps) => {
  const currentState = useContext(State)
  const isActive = index === currentState.step
  const isDone = index < currentState.step

  const textVariant = useMemo(() => {
    if (size === 'medium') {
      return isActive ? 'bodyStrong' : 'body'
    }

    return isActive ? 'bodySmallStrong' : 'bodySmall'
  }, [isActive, size])

  return (
    <StyledStepContainer
      data-interactive={currentState.interactive}
      isActive={isActive}
      isDone={isDone}
      onClick={() => {
        if (currentState.interactive) {
          currentState.setStep(index)
        }
        onClick?.(index)
      }}
    >
      {isDone ? (
        <StyledBullet
          sentiment="primary"
          icon="check"
          prominence="strong"
          size={size}
          isActive={isActive}
        />
      ) : (
        <StyledBullet
          sentiment={isDone || isActive ? 'primary' : 'neutral'}
          text={index.toString()}
          prominence="strong"
          size={size}
          isActive={isActive}
        />
      )}
      <StyledText
        as="span"
        variant={textVariant}
        prominence={isDone || isActive ? 'default' : 'weak'}
        sentiment={isActive ? 'primary' : 'neutral'}
      >
        {children}
      </StyledText>
    </StyledStepContainer>
  )
}

type StepperProps = {
  animated?: boolean
  /**
   * When true, the user can navigate through the steps by clicking on the bullets
   */
  interactive?: boolean
  selected?: number
  children: ReactNode[]
  className?: string
  labelPosition?: 'bottom' | 'right'
  size?: 'small' | 'medium'
  'data-testid'?: string
  separator?: boolean
}

type StepperContentProps = {
  children: ReactNode
  animated: boolean
  separator: boolean
}
const StepperContent = ({
  children,
  animated,
  separator,
}: StepperContentProps) => {
  const cleanChildren = Children.toArray(children)
  const currentState = useContext(State)
  const lastStep = Children.count(cleanChildren) - 1

  return Children.map(cleanChildren, (child, index) => {
    const getTemporal = () => {
      if (currentState.step > index) return 'previous'

      if (currentState.step === index) return 'current'

      return 'next'
    }
    const isNotLast = index < lastStep
    const temporal = getTemporal()

    return (
      // eslint-disable-next-line react/no-array-index-key
      <Fragment key={`creation-progress-${index}`}>
        {child}
        {isNotLast && separator ? (
          <StyledLine temporal={temporal} animated={animated} />
        ) : null}
      </Fragment>
    )
  })
}
/**
 * Stepper component to show the progress of a process in a linear way.
 */
export const Stepper = ({
  children,
  interactive = false,
  selected = 0,
  animated = false,
  className,
  labelPosition = 'bottom',
  size = 'medium',
  'data-testid': dataTestId,
  separator = true,
}: StepperProps) => {
  const [step, setStep] = useState(selected ?? 0)
  const value = useMemo(
    () => ({ step, setStep, interactive }),
    [step, interactive],
  )

  return (
    <State.Provider value={value}>
      <StyledContainer
        className={className}
        data-testid={dataTestId}
        labelPosition={labelPosition}
        size={size}
        separator={separator}
      >
        <StepperContent animated={animated} separator={separator}>
          {children}
        </StepperContent>
      </StyledContainer>
    </State.Provider>
  )
}

Stepper.Step = StepperNumbers
