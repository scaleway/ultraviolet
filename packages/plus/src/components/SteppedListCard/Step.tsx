'use client'

import { CheckIcon } from '@ultraviolet/icons'
import { StepList, Text } from '@ultraviolet/ui'
import { useContext } from 'react'
import { Data } from './helper'
import { steppedListCardStep, steppedListCardStepTitle } from './styles.css'

type StepProps = {
  /**
   * The number of the step, max 5 steps.
   */
  stepNumber: number
  /**
   * Title of the step
   */
  stepTitle: string
  /**
   * State of the step
   */
  completed: boolean
  'data-testid'?: string
}

export const SteppedList = ({
  stepNumber,
  stepTitle,
  completed,
  'data-testid': dataTestId,
}: StepProps) => {
  const containerData = useContext(Data)
  const active = containerData.currentStep === stepNumber

  return completed ? (
    <StepList.Item
      bulletContent={<CheckIcon />}
      className={steppedListCardStep}
      data-testid={dataTestId}
      onClick={() => containerData.setCurrentStep(stepNumber)}
      prominence={active ? 'strong' : 'default'}
      sentiment="primary"
    >
      <Text
        as="h3"
        className={steppedListCardStepTitle}
        variant={active ? 'bodyStrong' : 'body'}
      >
        {stepTitle}
      </Text>
    </StepList.Item>
  ) : (
    <StepList.Item
      bulletContent={String(stepNumber)}
      className={steppedListCardStep}
      data-testid={dataTestId}
      onClick={() => containerData.setCurrentStep(stepNumber)}
      prominence={active ? 'strong' : undefined}
      sentiment={active ? 'primary' : undefined}
    >
      <Text
        as="h3"
        className={steppedListCardStepTitle}
        variant={active ? 'bodyStrong' : 'body'}
      >
        {stepTitle}
      </Text>
    </StepList.Item>
  )
}
