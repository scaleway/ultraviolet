import styled from '@emotion/styled'
import { Stack, Text } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
import { useContext } from 'react'
import { Data, nextStep } from './helper'

const StyledContent = styled(Stack)`
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
}
export const SteppedListContent = ({
  subHeader,
  children,
  image,
  stepNumber,
}: SteppedListContentProps) => {
  const containerData = useContext(Data)

  if (stepNumber === containerData.currentStep) {
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
          ? children((completed: boolean) =>
              nextStep({
                completed,
                setCompleted: containerData.setDone,
                done: containerData.done,
                stepNumber,
                setCurrentStep: containerData.setCurrentStep,
                numberOfSteps: containerData.numberOfSteps,
                setHidden: containerData.setHidden,
                onClickHide: containerData.onClickHide,
              }),
            )
          : children}
        <StyledImage>{image}</StyledImage>
      </StyledContent>
    )
  }

  return null
}
