import type { StoryFn } from '@storybook/react'
import { SelectInput } from '..'

export const Template: StoryFn<typeof SelectInput> = ({ ...props }) => (
  <SelectInput {...props} />
)
