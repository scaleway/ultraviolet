import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type ContextType = {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  interactive: boolean
  size: 'medium' | 'small'
  animated: boolean
  labelPosition: 'bottom' | 'right'
}

const StepperContext = createContext<ContextType>({
  step: 0,
  setStep: () => {},
  interactive: false,
  size: 'medium',
  animated: false,
  labelPosition: 'bottom',
})

type StepperProviderProps = {
  children: ReactNode
  interactive: boolean
  animated: boolean
  selected: number
  labelPosition: 'bottom' | 'right'
  size: 'small' | 'medium'
}

export const useStepper = () => useContext(StepperContext)
/**
 * Stepper component to show the progress of a process in a linear way.
 */
export const StepperProvider = ({
  children,
  interactive,
  selected,
  animated,
  labelPosition,
  size,
}: StepperProviderProps) => {
  const [step, setStep] = useState(selected)
  const value = useMemo(
    () => ({ step, setStep, interactive, size, animated, labelPosition }),
    [step, interactive, size, animated, labelPosition],
  )
  useEffect(() => setStep(selected), [selected])

  return (
    <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
  )
}
