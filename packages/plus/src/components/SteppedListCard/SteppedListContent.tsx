'use client'

import styled from '@emotion/styled'
import { Stack, Text } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
import { useContext, useEffect } from 'react'
import { Data, nextStep } from './helper'

const StyledContent = styled(Stack)`
  min-width: 0;
  padding: ${({ theme }) => theme.space['3']};
  padding-top: ${({ theme }) => theme.space['4']};
`

const StyledImage = styled.div`
  display: flex;
  justify-content: right;
`

const StyledSubHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.space['3']};
`
type SteppedListContentProps = {
  subHeader?: ReactNode
  children: ((nextStep: (completed: boolean) => void) => ReactNode) | ReactNode
  image?: ReactNode
  stepNumber: number
  completed?: boolean
}
export const SteppedListContent = ({
  subHeader,
  children,
  image,
  stepNumber,
  completed = false,
}: SteppedListContentProps) => {
  const {
    setDone,
    currentStep,
    done,
    setCurrentStep,
    numberOfSteps,
    setHidden,
    onClickHide,
  } = useContext(Data)

  useEffect(() => {
    setDone(prevDone => {
      const updatedDone = [...prevDone]
      updatedDone[stepNumber - 1] = completed

      return updatedDone
    })
  }, [completed, setDone, stepNumber])

  if (stepNumber === currentStep) {
    return (
      <StyledContent>
        <StyledSubHeader>
          {typeof subHeader === 'string' ? (
            <Text as="h3" variant="headingSmallStrong">
              {subHeader}
            </Text>
          ) : (
            subHeader
          )}
        </StyledSubHeader>
        {typeof children === 'function'
          ? children((completedArg: boolean) =>
              nextStep({
                completed: completedArg,
                setCompleted: setDone,
                done,
                stepNumber,
                setCurrentStep,
                numberOfSteps,
                setHidden,
                onClickHide,
              }),
            )
          : children}
        <StyledImage>{image}</StyledImage>
      </StyledContent>
    )
  }

  return null
}
