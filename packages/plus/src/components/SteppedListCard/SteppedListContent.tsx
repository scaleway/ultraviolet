'use client'

import { Stack, Text } from '@ultraviolet/ui'
import type { CSSProperties, ReactNode } from 'react'
import { useContext, useEffect } from 'react'
import { Data, nextStep } from './helper'
import {
  steppedListCardContent,
  steppedListCardImage,
  steppedListCardSubHeader,
} from './styles.css'

type SteppedListContentProps = {
  subHeader?: ReactNode
  children: ((nextStep: (completed: boolean) => void) => ReactNode) | ReactNode
  image?: ReactNode
  stepNumber: number
  completed?: boolean
  style?: CSSProperties
}
export const SteppedListContent = ({
  subHeader,
  children,
  image,
  stepNumber,
  completed = false,
  style,
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
      <Stack className={steppedListCardContent} style={style}>
        <div className={steppedListCardSubHeader}>
          {typeof subHeader === 'string' ? (
            <Text as="h3" variant="headingSmallStrong">
              {subHeader}
            </Text>
          ) : (
            subHeader
          )}
        </div>
        {typeof children === 'function'
          ? children((completedArg: boolean) =>
              nextStep({
                completed: completedArg,
                done,
                numberOfSteps,
                onClickHide,
                setCompleted: setDone,
                setCurrentStep,
                setHidden,
                stepNumber,
              }),
            )
          : children}
        <div className={steppedListCardImage}>{image}</div>
      </Stack>
    )
  }

  return null
}
