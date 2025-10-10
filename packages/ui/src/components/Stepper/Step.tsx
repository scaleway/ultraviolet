'use client'

import { CheckIcon } from '@ultraviolet/icons'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { Bullet } from '../Bullet'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { useStepper } from './StepperProvider'
import {
  stepBullet,
  stepContainer,
  stepperContainerDone,
  stepperContainerRecipe,
  stepText,
} from './styles.css'

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
   * For additional information.
   * Use prop `title` to properly name the step
   */
  children?: ReactNode
  className?: string
  'data-testid'?: string
}

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
    <Stack
      alignItems="center"
      className={`${className ? `${className} ` : 'step '}${stepContainer} ${stepperContainerRecipe({ animated: currentState.animated, disabled, size: currentState.size })} ${isDone ? stepperContainerDone : ''}`}
      data-hide-separator={!currentState.separator}
      data-interactive={currentState.interactive && isDone}
      data-label-position={currentState.labelPosition}
      data-selected={isActive}
      data-testid={dataTestId ?? `stepper-step-${index}`}
      direction={currentState.labelPosition === 'right' ? 'row' : 'column'}
      gap={currentState.labelPosition === 'right' ? 1 : 0}
      justifyContent="flex-start"
      onClick={() => {
        if (currentState.interactive && !disabled) {
          if (index < currentState.step) {
            currentState.setStep(index)
          }
          onClick?.(index)
        }
      }}
    >
      {isDone && !disabled ? (
        <Bullet
          className={stepBullet({
            disabled,
            isActive,
            size: currentState.size,
          })}
          prominence="strong"
          sentiment="primary"
          size={currentState.size}
        >
          <CheckIcon />
        </Bullet>
      ) : (
        <Bullet
          className={stepBullet({
            disabled,
            isActive,
            size: currentState.size,
          })}
          prominence="strong"
          sentiment={isDone || isActive ? 'primary' : 'neutral'}
          size={currentState.size}
        >
          {(index + 1).toString()}
        </Bullet>
      )}
      {title ? (
        <Text
          as="span"
          className={stepText({ disabled })}
          prominence={isDone || isActive ? 'default' : 'weak'}
          sentiment={isActive ? 'primary' : 'neutral'}
          variant={textVariant}
          whiteSpace="normal"
        >
          {title}
        </Text>
      ) : null}
      {children ?? null}
    </Stack>
  )
}
