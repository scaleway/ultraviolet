import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import Badge, { PROMINENCES, SIZES } from '..'
import { SENTIMENTS } from '../../../theme'

export default {
  component: Badge,
  title: 'Components/Data Display/Badge',
} as Meta

const Template: Story<ComponentProps<typeof Badge>> = args => (
  <Badge {...args}>Badge</Badge>
)

export const Default = Template.bind({})

export const Variants = Template.bind({})
Variants.parameters = {
  docs: {
    description: {
      story:
        'Variants defines different colors of you component. You can define it using `variant` property.',
    },
  },
}
Variants.decorators = [
  () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {SENTIMENTS.map(sentiment => (
        <Badge key={sentiment} variant={sentiment}>
          {sentiment}
        </Badge>
      ))}
    </div>
  ),
]

export const Prominence = Template.bind({})
Prominence.parameters = {
  docs: {
    description: {
      story:
        'Prominence is defined by property `prominence`, this parameter will change color degree of badge.',
    },
  },
}
Prominence.decorators = [
  () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {Object.keys(PROMINENCES).map(prominence => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {prominence}:
          {SENTIMENTS.map(sentiment => (
            <Badge
              key={`${prominence}-${sentiment}`}
              variant={sentiment}
              prominence={prominence as keyof typeof PROMINENCES}
            >
              {sentiment}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
]

export const Size = Template.bind({})
Size.parameters = {
  docs: {
    description: {
      story: 'You can define size of a badge using `size` property.',
    },
  },
}
Size.decorators = [
  () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {Object.keys(SIZES).map(size => (
        <Badge key={size} variant="primary" size={size as keyof typeof SIZES}>
          {size}
        </Badge>
      ))}
    </div>
  ),
]

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const Icon = Template.bind({})
Icon.args = {
  icon: 'information-outline',
  variant: 'primary',
}
