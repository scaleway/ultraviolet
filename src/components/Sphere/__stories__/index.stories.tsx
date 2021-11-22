import { Meta, Story } from '@storybook/react'
import React from 'react'
import Sphere, { SphereProps } from '..'

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

const Template: Story<SphereProps> = args => <Sphere {...args} />

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
  bgColors: ['#333', '#666'],
}

export const Text = Template.bind({})

Text.args = {
  bgColors: ['#000'],
  size: 20,
  text: '★',
  textColor: '#fff',
  textSize: 10,
}
