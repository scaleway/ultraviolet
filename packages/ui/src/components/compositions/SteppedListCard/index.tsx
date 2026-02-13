'use client'

import type { ReactNode } from 'react'
import { Children, useMemo, useState } from 'react'
import { Button } from '../../Button'
import { Card } from '../../Card'
import { Row } from '../../Row'
import { Stack } from '../../Stack'
import { StepList } from '../../StepList'
import { Text } from '../../Text'
import { Data } from './helper'
import { SteppedList } from './Step'
import { SteppedListContent } from './SteppedListContent'
import {
  hideButton,
  steppedListCard,
  steppedListCardWrapper,
} from './styles.css'

type SteppedListContainerProps = {
  /**
   * Title of the section, introduces the feature.
   */
  header: ReactNode
  /**
   * List of steps
   */
  steps: (string | { title: string; icon: ReactNode })[]
  /**
   * Define here the content of each step
   */
  children: ReactNode
  /**
   * Function called when the component is closed. This function will overload the default behavior.
   */
  onClickHide?: () => void
} & (
  | {
      /**
       * Show the toggle option
       */
      showToggleOption: false
      hideTooltipText?: never
      hideText?: never
      showText?: never
      showTooltipText?: never
    }
  | {
      /**
       * Show the toggle option
       */
      showToggleOption?: true
      /**
       * Text of the tooltip on the hide button
       */
      hideTooltipText?: string
      /**
       * Text of the "hide" button
       */
      hideText?: string
      /**
       * Text of the "show" button
       */
      showText?: string
      /**
       * Text of tooltip on the "show" button
       */
      showTooltipText?: string
    }
)

/**
 * SteppedListCard is a component created for guiding users through steps in a structured and linear manner.
 * It can pass prop "nextStep" to its children.
 */
const SteppedListCard = ({
  header,
  showToggleOption = true,
  hideTooltipText,
  hideText = 'Hide',
  showText = 'Show',
  showTooltipText,
  children,
  steps,
  onClickHide,
}: SteppedListContainerProps) => {
  const numberOfSteps = Children.count(children)
  const [currentStep, setCurrentStep] = useState(1)
  const [hidden, setHidden] = useState(false)
  const [done, setDone] = useState(new Array<boolean>(steps.length).fill(false))

  const values = useMemo(
    () => ({
      currentStep,
      done,
      numberOfSteps,
      onClickHide,
      setCurrentStep,
      setDone,
      setHidden,
    }),
    [
      currentStep,
      setCurrentStep,
      numberOfSteps,
      done,
      setDone,
      setHidden,
      onClickHide,
    ],
  )

  const onClickHideButton = () => {
    if (onClickHide) {
      onClickHide()
    } else {
      setHidden(!hidden)
    }
  }

  return (
    <Data.Provider value={values}>
      <Stack gap={2} width="100%">
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          {typeof header === 'string' ? (
            <Text as="h3" variant="heading">
              {header}
            </Text>
          ) : (
            header
          )}
          {showToggleOption ? (
            <Button
              className={hideButton}
              onClick={onClickHideButton}
              sentiment="neutral"
              size="small"
              tooltip={hidden ? showTooltipText : hideTooltipText}
              variant="ghost"
            >
              {hidden ? showText : hideText}
            </Button>
          ) : null}
        </Stack>
        {hidden ? null : (
          <Card className={steppedListCard}>
            <Row templateColumns="1fr 3fr">
              <Stack
                className={steppedListCardWrapper}
                direction="column"
                gap={4}
              >
                <StepList>
                  {steps.map((step, index) => {
                    const stepTitle =
                      typeof step === 'string' ? step : step.title
                    const stepIcon =
                      typeof step === 'string' ? undefined : step.icon

                    return (
                      <SteppedList
                        completed={done[index]}
                        key={stepTitle}
                        stepIcon={stepIcon}
                        stepNumber={index + 1}
                        stepTitle={stepTitle}
                      />
                    )
                  })}
                </StepList>
              </Stack>
              {children}
            </Row>
          </Card>
        )}
      </Stack>
    </Data.Provider>
  )
}

SteppedListCard.Step = SteppedListContent

export { SteppedListCard }
