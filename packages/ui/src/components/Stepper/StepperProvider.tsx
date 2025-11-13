'use client'

import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type ContextType = {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  interactive: boolean
  size: 'medium' | 'small'
  animated: boolean
  labelPosition: 'bottom' | 'right'
  separator: boolean
}

const StepperContext = createContext<ContextType>({
  animated: false,
  interactive: false,
  labelPosition: 'bottom',
  separator: true,
  setStep: () => {},
  size: 'medium',
  step: 0,
})

type StepperProviderProps = {
  children: ReactNode
  interactive: boolean
  animated: boolean
  selected: number
  labelPosition: 'bottom' | 'right'
  size: 'small' | 'medium'
  separator: boolean
}

// oxlint-disable-next-line react/only-export-components
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
  separator,
}: StepperProviderProps) => {
  const currentSelected = useMemo(() => selected, [selected])
  const [step, setStep] = useState(currentSelected)
  const value = useMemo(
    () => ({
      animated,
      interactive,
      labelPosition,
      separator,
      setStep,
      size,
      step,
    }),
    [step, interactive, size, animated, labelPosition, separator],
  )
  useEffect(() => setStep(selected), [selected])

  return (
    <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
  )
}
