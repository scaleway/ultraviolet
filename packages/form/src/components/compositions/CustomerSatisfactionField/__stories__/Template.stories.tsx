import type { StoryFn } from '@storybook/react-vite'
import { CustomerSatisfactionField } from '..'

export const Template: StoryFn<typeof CustomerSatisfactionField> = args => (
  <CustomerSatisfactionField {...args} />
)
