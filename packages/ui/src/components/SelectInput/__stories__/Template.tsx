import type { ComponentStory } from '@storybook/react'
import { SelectInput } from '..'

export const Template: ComponentStory<typeof SelectInput> = ({ ...props }) => (
  <SelectInput {...props} />
)
