import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { Bullet } from '../Bullet'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { useStepper } from './StepperProvider'

type StepProps = {
  onClick?: (index: number) => void
  /**
   * Automatically attribued by the parent Stepper
   */
  index?: number
  /**
   * Whether the step is disabled
   */
  disabled?: boolean
  /**
   * Title of the step
   */
  title?: ReactNode
  /**
   * @deprecated
   * Do not use with Stepper.Step: use prop "title" instead
   */
  children?: ReactNode
  className?: string
  'data-testid'?: string
}

const StyledBullet = styled(Bullet)<{
  size: 'small' | 'medium'
  isActive: boolean
}>`
  margin-top: ${({ theme, size }) =>
    size === 'small' ? theme.space['0.5'] : 0};
  transition: box-shadow 300ms;

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

const StyledStepContainer = styled(Stack)<{
  isActive: boolean
  isDone: boolean
  'data-disabled': boolean
  'data-interactive': boolean
}>`
  display: flex;
  white-space: nowrap;
  transition: text-decoration 300ms;

  &[data-interactive='true']:not([data-disabled='true']) {
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

  &[data-disabled='true'] {
    cursor: not-allowed;

    & > ${StyledText} {
      color: ${({ theme }) => theme.colors.neutral.textDisabled};
    }

    & > ${StyledBullet} {
      background-color: ${({ theme }) =>
        theme.colors.neutral.backgroundDisabled};
      box-shadow: none;
      color: ${({ theme }) => theme.colors.neutral.textDisabled};
      border-color: ${({ theme }) => theme.colors.neutral.borderDisabled};
    }
  }
`

export const Step = ({
  index = 0,
  onClick,
  disabled = false,
  title,
  children,
  className,
  'data-testid': dataTestId,
}: StepProps) => {
  const currentState = useStepper()
  const isActive = index === currentState.step
  const isDone = index < currentState.step

  const textVariant = useMemo(() => {
    if (currentState.size === 'medium') {
      return isActive ? 'bodyStrong' : 'body'
    }

    return isActive ? 'bodySmallStrong' : 'bodySmall'
  }, [currentState.size, isActive])

  return (
    <StyledStepContainer
      gap={currentState.labelPosition === 'right' ? 1 : 0.5}
      direction={currentState.labelPosition === 'right' ? 'row' : 'column'}
      alignItems={
        currentState.labelPosition === 'right' ? 'baseline' : 'center'
      }
      justifyContent="flex-start"
      className={className ?? 'step'}
      data-interactive={currentState.interactive && isDone}
      isActive={isActive}
      isDone={isDone}
      onClick={() => {
        if (currentState.interactive && !disabled) {
          if (index < currentState.step) {
            currentState.setStep(index)
          }
          onClick?.(index)
        }
      }}
      data-disabled={disabled}
      data-testid={dataTestId ?? `stepper-step-${index}`}
    >
      {isDone && !disabled ? (
        <StyledBullet
          sentiment="primary"
          icon="check"
          prominence="strong"
          size={currentState.size}
          isActive={isActive}
        />
      ) : (
        <StyledBullet
          sentiment={isDone || isActive ? 'primary' : 'neutral'}
          text={index.toString()}
          prominence="strong"
          size={currentState.size}
          isActive={isActive}
        />
      )}
      <StyledText
        as="span"
        variant={textVariant}
        prominence={isDone || isActive ? 'default' : 'weak'}
        sentiment={isActive ? 'primary' : 'neutral'}
      >
        {title ?? children}
      </StyledText>
    </StyledStepContainer>
  )
}
