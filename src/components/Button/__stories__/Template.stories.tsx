import { ComponentStory } from '@storybook/react'
import Button from '..'

export const Template: ComponentStory<typeof Button> = ({ ...props }) => (
  <Button {...props} />
)
