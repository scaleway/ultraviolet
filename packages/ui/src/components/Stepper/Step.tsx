'use client'

import { CheckIcon } from '@ultraviolet/icons'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { Bullet } from '../Bullet'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { useStepper } from './StepperProvider'
import {
  animationStepperContainer,
  stepBullet,
  stepContainer,
  stepperContainerRecipe,
  stepperInteractive,
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
  const {
    separator,
    labelPosition,
    animated,
    size,
    interactive,
    step,
    setStep,
  } = useStepper()
  const isActive = index === step
  const isDone = index < step
  const separatorBottom = separator && labelPosition === 'bottom'
  const interactiveDone = isDone && interactive

  const textVariant = useMemo(() => {
    if (size === 'medium') {
      return isActive ? 'bodyStrong' : 'body'
    }

    return isActive ? 'bodySmallStrong' : 'bodySmall'
  }, [size, isActive])

  return (
    <Stack
      alignItems="center"
      className={`${className ? `${className} ` : 'step '}${stepContainer} ${separatorBottom ? stepperContainerRecipe({ animated, disabled, done: isDone, labelPosition, separator, size }) : ''} ${isActive && separator && animated ? animationStepperContainer[size] : ''} ${interactiveDone && !disabled ? stepperInteractive[isActive ? 'active' : 'inactive'] : ''}`}
      data-testid={dataTestId ?? `stepper-step-${index}`}
      direction={labelPosition === 'right' ? 'row' : 'column'}
      gap={labelPosition === 'right' ? 1 : 0}
      justifyContent="flex-start"
      onClick={() => {
        if (interactive && !disabled) {
          if (index < step) {
            setStep(index)
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
            size,
          })}
          prominence="strong"
          sentiment="primary"
          size={size}
        >
          <CheckIcon />
        </Bullet>
      ) : (
        <Bullet
          className={stepBullet({
            disabled,
            isActive,
            size,
          })}
          prominence="strong"
          sentiment={isDone || isActive ? 'primary' : 'neutral'}
          size={size}
        >
          {(index + 1).toString()}
        </Bullet>
      )}
      {title ? (
        <Text
          as="span"
          className={stepText({
            addMarginTop: separator && labelPosition !== 'right',
            disabled,
          })}
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
