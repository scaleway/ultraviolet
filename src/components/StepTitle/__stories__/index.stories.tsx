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
  bulletText: 'A',
  children: 'First',
  disabled: true,
}

export const Variant = Template.bind({})
Variant.parameters = {
  docs: {
    story: {
      description: 'Set a bullet variant state using `variant` property.',
    },
  },
}
Variant.args = {
  bulletText: 'A',
  children: 'First',
  variant: 'success',
}

export const BulletIcon = Template.bind({})
BulletIcon.parameters = {
  docs: {
    story: {
      description: 'Set a bullet icon state using `bulletIcon` property.',
    },
  },
}
BulletIcon.args = {
  bulletIcon: 'check',
  children: 'First',
  variant: 'success',
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
        <StepTitle key={rank} bulletText={(index + 1).toString()}>
          {rank}
        </StepTitle>
      ))}
    </div>
  ),
]
