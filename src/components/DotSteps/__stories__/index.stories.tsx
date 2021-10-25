import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'
import DotSteps, { DotStepsProps } from '..'

export default {
  component: DotSteps,
  title: 'Components/Navigation/DotSteps',
} as Meta

const Template: Story<DotStepsProps> = args => <DotSteps {...args} />

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    storyDescription: 'Dot Steps control, to switch between pages/steps.',
  },
}
Default.decorators = [
  () => {
    const [step, setStep] = useState(1)

    return (
      <>
        {step === 1 && 'Content of 1st step'}
        {step === 2 && 'Content of the 2nd step'}
        <DotSteps {...{ setStep, step }} />
      </>
    )
  },
]
