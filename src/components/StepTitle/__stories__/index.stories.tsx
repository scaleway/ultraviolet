import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import StepTitle, { Sizes as SizesType } from '..'

export default {
  component: StepTitle,
  parameters: {
    docs: {
      description: {
        component: 'Make a list with sub components in it.',
      },
    },
  },
  title: 'Components/Data Display/StepTitle',
} as Meta

const Template: Story<ComponentProps<typeof StepTitle>> = args => (
  <StepTitle {...args} />
)

export const Default = Template.bind({})

Default.args = {
  ...Template.args,
  children: 'First',
  index: 1,
}

export const Sizes = Template.bind({})
Sizes.parameters = {
  docs: {
    storyDescription: 'Set `size` using size property.',
  },
}
Sizes.decorators = [
  () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      {['medium', 'large'].map((size, index) => (
        <StepTitle index={index + 1} size={size as SizesType}>
          {size}
        </StepTitle>
      ))}
    </div>
  ),
]

export const Disabled = Template.bind({})
Disabled.parameters = {
  docs: {
    storyDescription: 'Set a disable state using `disabled` property.',
  },
}
Disabled.args = {
  ...Template.args,
  children: 'First',
  disabled: true,
  index: 1,
}

export const List = Template.bind({})
List.parameters = {
  docs: {
    storyDescription: 'Example to populate a step list.',
  },
}
List.decorators = [
  () => (
    <div>
      {['First', 'Second', 'Third'].map((rank, index) => (
        <StepTitle index={index + 1}>{rank}</StepTitle>
      ))}
    </div>
  ),
]
