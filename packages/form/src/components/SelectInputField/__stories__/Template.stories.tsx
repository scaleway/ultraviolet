import type { StoryFn } from '@storybook/react-vite'
import { SelectInputField } from '..'
import { cities } from './resources'

export const Template: StoryFn<typeof SelectInputField> = args => (
  <SelectInputField {...args} options={args.options || cities} />
)
