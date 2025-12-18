'use client'

import { cn } from '@ultraviolet/utils'
import type { CSSProperties, ReactNode } from 'react'
import { Children, Fragment, isValidElement } from 'react'
import { Step } from './Step'
import { StepperProvider } from './StepperProvider'
import { stepperContainer, stepperLine } from './styles.css'

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
  style?: CSSProperties
}

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
  style,
}: StepperProps) => {
  const cleanChildren = Children.toArray(children).filter(child =>
    isValidElement(child),
  )
  const lastStep = Children.count(cleanChildren) - 1

  return (
    <StepperProvider
      animated={animated}
      interactive={interactive}
      labelPosition={labelPosition}
      selected={selected}
      separator={separator}
      size={size}
    >
      <div
        className={cn(
          className,
          stepperContainer({ labelPosition, separator }),
        )}
        data-testid={dataTestId}
        style={style}
      >
        {Children.map(cleanChildren, (child, index) => {
          const getTemporal = () => {
            if (index < selected) {
              return 'done'
            }

            if (index === selected) {
              return 'current'
            }

            return 'next'
          }
          const isNotLast = index < lastStep
          const temporal = getTemporal()

          return (
            <Fragment key={`creation-progress-${index}`}>
              <Step index={index} {...(child.props as object)} />
              {isNotLast && separator && labelPosition === 'right' ? (
                <div
                  className={stepperLine({ animated, temporal })}
                  data-size={size}
                />
              ) : null}
            </Fragment>
          )
        })}
      </div>
    </StepperProvider>
  )
}

Stepper.Step = Step
