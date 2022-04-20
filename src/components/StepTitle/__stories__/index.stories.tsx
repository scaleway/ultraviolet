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
  bulletText: '1',
  children: 'First',
}

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
    <div style={{ display: 'flex', gap: '8px' }}>
      {['small', 'medium'].map((size, index) => (
        <StepTitle bulletText={(index + 1).toString()} size={size as SizesType}>
          {size}
        </StepTitle>
      ))}
    </div>
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
Disabled.args = {
  ...Template.args,
  bulletText: 'A',
  children: 'First',
  disabled: true,
}

export const List = Template.bind({})
List.parameters = {
  docs: {
    story: {
      description: 'Example to populate a step list.',
    },
  },
}
List.decorators = [
  () => (
    <div>
      {['First', 'Second', 'Third'].map((rank, index) => (
        <StepTitle bulletText={(index + 1).toString()}>{rank}</StepTitle>
      ))}
    </div>
  ),
]
