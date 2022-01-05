import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import CreationProgress from '..'

export default {
  component: CreationProgress,
  title: 'Components/Navigation/CreationProgress',
} as Meta

const Template: Story<ComponentProps<typeof CreationProgress>> = args => (
  <CreationProgress selected={0} {...args}>
    <CreationProgress.Step>Step 1</CreationProgress.Step>
    <CreationProgress.Step>Step 2</CreationProgress.Step>
    <CreationProgress.Step>Step 3</CreationProgress.Step>
  </CreationProgress>
)

export const Default = Template.bind({})

export const SelectedOne = Template.bind({})
SelectedOne.decorators = [
  () => (
    <CreationProgress selected={1}>
      <CreationProgress.Step>Step 1</CreationProgress.Step>
      <CreationProgress.Step>Step 2</CreationProgress.Step>
      <CreationProgress.Step>Step 3</CreationProgress.Step>
    </CreationProgress>
  ),
]

export const SelectedAll = Template.bind({})
SelectedAll.decorators = [
  () => (
    <CreationProgress selected={2}>
      <CreationProgress.Step>Step 1</CreationProgress.Step>
      <CreationProgress.Step>Step 2</CreationProgress.Step>
      <CreationProgress.Step>Step 3</CreationProgress.Step>
    </CreationProgress>
  ),
]

export const WithoutAnimation = Template.bind({})
WithoutAnimation.decorators = [
  () => (
    <CreationProgress selected={1} animated={false}>
      <CreationProgress.Step>Step 1</CreationProgress.Step>
      <CreationProgress.Step>Step 2</CreationProgress.Step>
      <CreationProgress.Step>Step 3</CreationProgress.Step>
    </CreationProgress>
  ),
]

export const WithStepsNumber = Template.bind({})
WithStepsNumber.decorators = [
  () => (
    <CreationProgress selected={1} isStepsNumber>
      <CreationProgress.Step>Step 1</CreationProgress.Step>
      <CreationProgress.Step>Step 2</CreationProgress.Step>
      <CreationProgress.Step>Step 3</CreationProgress.Step>
    </CreationProgress>
  ),
]

export const Sizes = Template.bind({})
Sizes.parameters = {
  docs: {
    storyDescription:
      'You can change the size of the creation progress with the `size` props which accept `xsmall`, `small`, `medium`, `large`, `xlarge`. By default `xlarge` will be taken',
  },
}
Sizes.decorators = [
  () => (
    <>
      {['xsmall', 'small', 'medium', 'large', 'xlarge'].map(size => (
        <CreationProgress
          size={size as ComponentProps<typeof CreationProgress>['size']}
          selected={1}
          isStepsNumber
        >
          <CreationProgress.Step>Step 1</CreationProgress.Step>
          <CreationProgress.Step>Step 2</CreationProgress.Step>
          <CreationProgress.Step>Step 3</CreationProgress.Step>
        </CreationProgress>
      ))}
    </>
  ),
]
