import { Meta, Story } from '@storybook/react'
import React from 'react'
import ProgressBar, { ProgressBarProps, progressBarVariants } from '..'
import Boxer from '../../Boxer'
import UncontrolledProgressBar from './UncontrolledProgressBar'

export default {
  component: ProgressBar,
  title: 'Components/Data Display/ProgressBar',
} as Meta

const Template: Story<ProgressBarProps> = args => <ProgressBar {...args} />

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    storyDescription: 'An horizontal progress bar.',
  },
}
Default.args = {
  value: 40,
}

export const Variants = Template.bind({})
Variants.parameters = {
  docs: {
    storyDescription: 'Set variant using `variant` prop.',
  },
}
Variants.decorators = [
  () => (
    <Boxer my={1}>
      {progressBarVariants.map(variant => (
        <UncontrolledProgressBar key={variant} variant={variant} />
      ))}
    </Boxer>
  ),
]

export const Progress = Template.bind({})
Progress.parameters = {
  docs: {
    storyDescription:
      'Progress is used to show a loading state of the component.',
  },
}
Progress.decorators = [() => <ProgressBar progress my={3} />]

export const Background = Template.bind({})
Background.parameters = {
  docs: {
    storyDescription:
      'You can set the `backgroundColor` property to set the background progress color',
  },
}
Background.decorators = [
  () => <ProgressBar value={60} backgroundColor="green" />,
]

export const Cap = Template.bind({})
Cap.parameters = {
  docs: {
    storyDescription:
      'Value will be capped out above 0 and below 100, so you&apos;re safe to pass an even greater/lower value',
  },
}
Cap.decorators = [
  () => (
    <Boxer my={1}>
      <ProgressBar value={600} />
      <ProgressBar value={-600} />
    </Boxer>
  ),
]
