import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import Placeholder from '..'

export default {
  component: Placeholder,
  parameters: {
    docs: {
      description: {
        component:
          'Placeholder will display empty blocks with animation. It can be used for loading screen or loading components. In terms of accessibility, do not forget to add aria-live and aria-busy true/false to the placeholder container.',
      },
    },
  },
  title: 'Components/Data Display/Placeholder',
} as Meta

const Template: Story<ComponentProps<typeof Placeholder>> = args => (
  <Placeholder {...args} />
)

export const Default = Template.bind({})

export const Block = Template.bind({})
Block.args = {
  variant: 'block',
}

export const Blocks = Template.bind({})
Blocks.args = {
  variant: 'blocks',
}

export const Box = Template.bind({})
Blocks.args = {
  length: 8,
  variant: 'box',
}

export const Donut = Template.bind({})
Donut.args = {
  variant: 'donut',
}

export const Line = Template.bind({})
Line.args = {
  variant: 'line',
}

export const Slider = Template.bind({})
Slider.args = {
  variant: 'slider',
}

export const List = Template.bind({})
List.args = {
  length: 2,
  variant: 'list',
}
