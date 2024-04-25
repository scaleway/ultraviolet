import type { StoryFn } from '@storybook/react'
import { SelectInputFieldV2 } from '..'
import { cities } from './resources'

export const Template: StoryFn<typeof SelectInputFieldV2> = args => (
  <SelectInputFieldV2 {...args} options={cities} />
)
