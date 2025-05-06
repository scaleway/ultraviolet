import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { StepList } from '..'

export const Template: StoryFn<ComponentProps<typeof StepList>> = args => (
  <StepList {...args}>
    <StepList.Item bulletContent="1">First</StepList.Item>
    <StepList.Item bulletContent="2">Second</StepList.Item>
    <StepList.Item bulletContent="3">Third</StepList.Item>
  </StepList>
)
