import type { StoryFn } from '@storybook/react'
import { SelectInputField } from '..'
import { cities } from './resources'

export const Template: StoryFn<typeof SelectInputField> = args => (
  <SelectInputField {...args} options={cities} />
)
