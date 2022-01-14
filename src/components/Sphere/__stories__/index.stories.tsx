import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Sphere from '..'

export default {
  component: Sphere,
  parameters: {
    docs: {
      description: {
        component: 'Circle filled with color and, or text.',
      },
    },
  },
  title: 'Components/Data Display/Sphere',
} as Meta

const Template: Story<ComponentProps<typeof Sphere>> = args => (
  <Sphere {...args} />
)

export const Default = Template.bind({})
export const Halved = Template.bind({})

Halved.parameters = {
  docs: {
    description: {
      story:
        'Easily add two different colors inside of Sphere component by adding them into `bgColors` property.',
    },
  },
}

Halved.args = {
  colors: ['#333', '#666'],
}

export const Text = Template.bind({})

Text.args = {
  colors: ['#000'],
  size: 20,
  text: '★',
  textColor: '#fff',
}
