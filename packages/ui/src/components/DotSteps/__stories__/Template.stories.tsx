import type { ComponentStory } from '@storybook/react'
import { useState } from 'react'
import { DotSteps } from '..'

export const Template: ComponentStory<typeof DotSteps> = args => {
  const [step, setStep] = useState(1)

  return (
    <>
      {step === 1 && 'Content of 1st step'}
      {step === 2 && 'Content of the 2nd step'}
      <DotSteps {...{ setStep, step }} {...args} />
    </>
  )
}
