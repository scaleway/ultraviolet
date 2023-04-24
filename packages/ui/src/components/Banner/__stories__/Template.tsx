import type { ComponentStory } from '@storybook/react'
import { Banner } from '..'

export const Template: ComponentStory<typeof Banner> = ({ ...props }) => (
  <Banner {...props} />
)
