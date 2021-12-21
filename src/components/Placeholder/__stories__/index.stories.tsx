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
Block.decorators = [() => <Placeholder variant="block" />]

export const Blocks = Template.bind({})
Blocks.decorators = [() => <Placeholder variant="blocks" />]

export const Box = Template.bind({})
Box.decorators = [
  () => (
    <Placeholder
      display="flex"
      height={130}
      width={180}
      length={4}
      variant="box"
    />
  ),
]

export const Donut = Template.bind({})
Donut.decorators = [() => <Placeholder variant="donut" />]

export const Line = Template.bind({})
Line.decorators = [() => <Placeholder variant="line" />]

export const Slider = Template.bind({})
Slider.decorators = [() => <Placeholder variant="slider" />]

export const List = Template.bind({})
List.decorators = [() => <Placeholder variant="list" />]
