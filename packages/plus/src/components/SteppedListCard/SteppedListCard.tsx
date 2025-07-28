'use client'

import styled from '@emotion/styled'
import { Button, Card, Row, Stack, StepList, Text } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
import { Children, useMemo, useState } from 'react'
import { Data } from './helper'
import { SteppedList } from './Step'
import { SteppedListContent } from './SteppedListContent'

const StyledCard = styled(Card)`
  padding: 0;
`
const ContentStack = styled(Stack)`
  padding: ${({ theme }) => theme.space['3']};
  border-right: solid ${({ theme }) => theme.colors.neutral.border} 1px;
`

type SteppedListContainerProps = {
  /**
   * Title of the section, introduces the feature.
   */
  header: ReactNode
  /**
   * List of steps
   */
  steps: string[]
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
    if (onClickHide) {onClickHide()}
    else {setHidden(!hidden)}
  }

  return (
    <Data.Provider value={values}>
      <Stack gap={3}>
        <Row templateColumns="9fr 1fr">
          {typeof header === 'string' ? (
            <Text as="h3" variant="heading">
              {header}
            </Text>
          ) : (
            header
          )}
          {showToggleOption ? (
            <Button
              onClick={onClickHideButton}
              sentiment="neutral"
              size="small"
              tooltip={hidden ? showTooltipText : hideTooltipText}
              variant="ghost"
            >
              {hidden ? showText : hideText}
            </Button>
          ) : null}
        </Row>
        {hidden ? null : (
          <StyledCard>
            <Row templateColumns="1fr 3fr">
              <ContentStack direction="column" gap={4}>
                <StepList>
                  {steps.map((step, index) => (
                    <SteppedList
                      completed={done[index]}
                      key={step}
                      stepNumber={index + 1}
                      stepTitle={step}
                    />
                  ))}
                </StepList>
              </ContentStack>
              {children}
            </Row>
          </StyledCard>
        )}
      </Stack>
    </Data.Provider>
  )
}

SteppedListCard.Step = SteppedListContent

export { SteppedListCard }
