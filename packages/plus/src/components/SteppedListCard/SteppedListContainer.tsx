import styled from '@emotion/styled'
import { Button, Card, Row, Stack, StepList, Text } from '@ultraviolet/ui'
import { Children, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { SteppedList } from './Step'
import { SteppedListContent } from './SteppedListContent'
import { Data } from './helper'

const StyledCard = styled(Card)`
  padding: 0;
`
const ContentStack = styled(Stack)`
  padding: ${({ theme }) => theme.space['3']};
  border-right: solid ${({ theme }) => theme.colors.neutral.border};
`

type SteppedListContainerProps = {
  /**
   * Title of the section, introduces the feature.
   */
  header: string
  /**
   * Text of the tooltip on the hide button
   */
  hideTooltipText: string
  /**
   * Text of the "hide" button
   */
  hideButtonText: string
  /**
   * List of steps
   */
  steps: string[]
  /**
   * Define here the content of each step
   */
  children: ReactNode
}

/**
 * SteppedListContainer is a component created for guiding users through steps in a structured and linear manner.
 * It can pass prop "nextStep" to its children.
 */
const SteppedListContainer = ({
  header,
  hideTooltipText,
  hideButtonText,
  children,
  steps,
}: SteppedListContainerProps) => {
  const numberOfSteps = Children.count(children)
  const [currentStep, setCurrentStep] = useState(1)
  const [hidden, setHidden] = useState(false)
  const [done, setDone] = useState(Array<boolean>(steps.length).fill(false))

  const values = useMemo(
    () => ({
      currentStep,
      setCurrentStep,
      numberOfSteps,
      done,
      setDone,
      setHidden,
    }),
    [currentStep, setCurrentStep, numberOfSteps, done, setDone, setHidden],
  )

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
          <Button
            onClick={() => setHidden(!hidden)}
            variant="ghost"
            sentiment="neutral"
            size="small"
            tooltip={hideTooltipText}
          >
            {hideButtonText}
          </Button>
        </Row>
        {hidden ? null : (
          <StyledCard>
            <Row templateColumns="1fr 3fr">
              <ContentStack direction="column" gap={4}>
                <StepList>
                  {steps.map((step, index) => (
                    <SteppedList
                      key={step}
                      stepNumber={index + 1}
                      stepTitle={step}
                      completed={done[index]}
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

SteppedListContainer.Step = SteppedListContent

export { SteppedListContainer }
