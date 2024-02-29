import { createContext } from 'react'

type ContextType = {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  numberOfSteps: number
  done: boolean[]
  setDone: React.Dispatch<React.SetStateAction<boolean[]>>
  setHidden: React.Dispatch<React.SetStateAction<boolean>>
}

export const Data = createContext<ContextType>({
  currentStep: 1,
  setCurrentStep: () => {},
  numberOfSteps: 1,
  done: [false, false, false, false, false],
  setDone: () => {},
  setHidden: () => {},
})

type NextStepProps = {
  completed: boolean
  setCompleted: React.Dispatch<React.SetStateAction<boolean[]>>
  stepNumber: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  numberOfSteps: number
  setHidden: React.Dispatch<React.SetStateAction<boolean>>
  done: boolean[]
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
}: NextStepProps) => {
  const tempDone = done.map((item, index) =>
    index === stepNumber - 1 ? completed : item,
  )
  setCompleted(tempDone)
  if (numberOfSteps > stepNumber) {
    setCurrentStep(stepNumber + 1)
  } else {
    setHidden(true)
  }
}
