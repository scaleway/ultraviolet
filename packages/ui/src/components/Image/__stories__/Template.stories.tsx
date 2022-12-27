import type { ComponentStory } from '@storybook/react'
import Image from '..'
import defaultLogo from './scaleway-text.png'

export const Template: ComponentStory<typeof Image> = ({ src, ...args }) => (
  <Image src={src ?? defaultLogo} alt="Scaleway logo" {...args} />
)
