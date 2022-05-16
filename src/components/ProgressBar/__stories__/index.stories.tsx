import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import ProgressBar, { progressBarVariants } from '..'
import UncontrolledProgressBar from './UncontrolledProgressBar'

export default {
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component: 'An horizontal progress bar.',
      },
    },
  },
  title: 'Components/Data Display/ProgressBar',
} as Meta

const Template: Story<ComponentProps<typeof ProgressBar>> = args => (
  <ProgressBar value={40} {...args} />
)

export const Default = Template.bind({})

export const Variants = Template.bind({})
Variants.parameters = {
  docs: {
    storyDescription: 'Set variant using `variant` prop.',
  },
}
Variants.decorators = [
  () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {progressBarVariants.map(variant => (
        <UncontrolledProgressBar key={variant} variant={variant} />
      ))}
    </div>
  ),
]

export const Progress = Template.bind({})
Progress.parameters = {
  docs: {
    storyDescription:
      'Progress is used to show a loading state of the component.',
  },
}
Progress.decorators = [() => <ProgressBar progress />]

export const Cap = Template.bind({})
Cap.parameters = {
  docs: {
    storyDescription:
      'Value will be capped out above 0 and below 100, so you&apos;re safe to pass an even greater/lower value',
  },
}
Cap.decorators = [
  () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <ProgressBar value={600} />
      <ProgressBar value={-600} />
    </div>
  ),
]
