'use client'

import styled from '@emotion/styled'
import { CheckIcon } from '@ultraviolet/icons'
import { StepList, Text } from '@ultraviolet/ui'
import { useContext } from 'react'
import { Data } from './helper'

const CustomText = styled(Text)`
  cursor: pointer;
  transition: text-decoration-color 250ms ease-out;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  text-decoration-color: transparent;

  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
  }
  &:active {
    text-decoration-thickness: 2px;
  }
`

const StyledItem = styled(StepList.Item)`
align-items: center;
`

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
    <StyledItem
      bulletContent={<CheckIcon />}
      prominence={active ? 'strong' : 'default'}
      sentiment="primary"
      onClick={() => containerData.setCurrentStep(stepNumber)}
      data-testid={dataTestId}
    >
      <CustomText as="h3" variant={active ? 'bodyStrong' : 'body'}>
        {stepTitle}
      </CustomText>
    </StyledItem>
  ) : (
    <StyledItem
      bulletContent={String(stepNumber)}
      prominence={active ? 'strong' : undefined}
      sentiment={active ? 'primary' : undefined}
      onClick={() => containerData.setCurrentStep(stepNumber)}
      data-testid={dataTestId}
    >
      <CustomText as="h3" variant={active ? 'bodyStrong' : 'body'}>
        {stepTitle}
      </CustomText>
    </StyledItem>
  )
}
