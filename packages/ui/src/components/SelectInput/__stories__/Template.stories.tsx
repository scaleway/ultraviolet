import type { ComponentStory } from '@storybook/react'
import { RichSelect } from '..'

export const Template: ComponentStory<typeof RichSelect> = ({ ...props }) => (
  <RichSelect {...props} />
)
