import { SelectInputField } from '..'

import { cities } from './resources'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof SelectInputField> = args => (
  <SelectInputField {...args} options={args.options || cities} />
)
