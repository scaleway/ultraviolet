import { Meta, Story } from '@storybook/react'
import React from 'react'
import Image, { ImageProps } from '..'
import logo from './scaleway-text.png'

export default {
  component: Image,
  title: 'Components/Image',
} as Meta

const Template: Story<ImageProps> = args => <Image {...args} />

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    storyDescription:
      'A native img html tag. You can pass props that you used to pass to the native element',
  },
}
Default.decorators = [() => <Image src={logo} alt="Scaleway logo" />]
