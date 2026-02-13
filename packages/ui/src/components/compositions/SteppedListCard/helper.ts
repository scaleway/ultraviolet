import { createContext } from 'react'

type ContextType = {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  numberOfSteps: number
  done: boolean[]
  setDone: React.Dispatch<React.SetStateAction<boolean[]>>
  setHidden: React.Dispatch<React.SetStateAction<boolean>>
  onClickHide?: () => void
}

export const Data = createContext<ContextType>({
  currentStep: 1,
  done: [false, false, false, false, false],
  numberOfSteps: 1,
  onClickHide: () => {},
  setCurrentStep: () => {},
  setDone: () => {},
  setHidden: () => {},
})

type NextStepProps = {
  completed?: boolean
  setCompleted: React.Dispatch<React.SetStateAction<boolean[]>>
  stepNumber: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  numberOfSteps: number
  setHidden: React.Dispatch<React.SetStateAction<boolean>>
  done: boolean[]
  onClickHide?: () => void
}

/**
 * Go to next step with or without validation of the current step
 * Close the component for the last step
 */
export const nextStep = ({
  completed,
  setCompleted,
  stepNumber,
  setCurrentStep,
  numberOfSteps,
  setHidden,
  done,
  onClickHide,
}: NextStepProps) => {
  const newValue = completed === undefined ? done[stepNumber - 1] : completed
  const tempDone = done.map((item, index) =>
    index === stepNumber - 1 ? newValue : item,
  )
  setCompleted(tempDone)
  if (numberOfSteps > stepNumber) {
    setCurrentStep(stepNumber + 1)
  } else if (onClickHide) {
    onClickHide()
  } else {
    setHidden(true)
  }
}
