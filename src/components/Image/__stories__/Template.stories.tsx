import { ComponentStory } from '@storybook/react'
import Image from '..'
import logo from './scaleway-text.png'

export const Template: ComponentStory<typeof Image> = args => (
  <Image src={logo} alt="Scaleway logo" {...args} />
)
