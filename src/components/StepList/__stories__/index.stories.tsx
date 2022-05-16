import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import StepList, { Sizes as SizesType } from '..'

export default {
  component: StepList,
  parameters: {
    docs: {
      description: {
        component: 'Make a list with sub components in it.',
      },
    },
  },
  title: 'Components/Data Display/StepList',
} as Meta

const Template: Story<ComponentProps<typeof StepList>> = args => (
  <StepList {...args}>
    <StepList.Item bulletText="1">First</StepList.Item>
    <StepList.Item bulletText="2">Second</StepList.Item>
    <StepList.Item bulletText="3">Third</StepList.Item>
  </StepList>
)

export const Default = Template.bind({})

export const Sizes = Template.bind({})
Sizes.parameters = {
  docs: {
    story: {
      description: 'Set `size` using size property.',
    },
  },
}
Sizes.decorators = [
  () => (
    <StepList>
      {['small', 'medium'].map((size, index) => (
        <StepList.Item
          bulletText={(index + 1).toString()}
          size={size as SizesType}
        >
          {size}
        </StepList.Item>
      ))}
    </StepList>
  ),
]

export const Disabled = Template.bind({})
Disabled.parameters = {
  docs: {
    story: {
      description: 'Set a disable state using `disabled` property.',
    },
  },
}
Disabled.decorators = [
  () => (
    <StepList>
      <StepList.Item bulletText="A" disabled>
        disabled
      </StepList.Item>
      <StepList.Item bulletText="A">active</StepList.Item>
    </StepList>
  ),
]

export const Variant = Template.bind({})
Variant.parameters = {
  docs: {
    story: {
      description: 'Set a bullet variant state using `variant` property.',
    },
  },
}
Variant.decorators = [
  () => (
    <StepList>
      <StepList.Item bulletText="A" variant="success">
        success
      </StepList.Item>
      <StepList.Item bulletText="A">default</StepList.Item>
    </StepList>
  ),
]

export const BulletIcon = Template.bind({})
BulletIcon.parameters = {
  docs: {
    story: {
      description: 'Set a bullet icon state using `bulletIcon` property.',
    },
  },
}
BulletIcon.decorators = [
  () => (
    <StepList>
      <StepList.Item bulletIcon="check" variant="success">
        check success
      </StepList.Item>
      <StepList.Item bulletIcon="check">check default</StepList.Item>
    </StepList>
  ),
]
