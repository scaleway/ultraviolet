import { CustomerSatisfactionField } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof CustomerSatisfactionField> = args => (
  <CustomerSatisfactionField {...args} />
)
