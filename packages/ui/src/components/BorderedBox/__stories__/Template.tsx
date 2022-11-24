import { ComponentStory } from '@storybook/react'
import BorderedBox from '..'

export const Template: ComponentStory<typeof BorderedBox> = ({ ...props }) => (
  <BorderedBox {...props} />
)
