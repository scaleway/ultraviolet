import type { StoryFn } from '@storybook/react-vite'
import { PlansField } from '..'

export const Template: StoryFn<typeof PlansField> = args => (
  <PlansField {...args} />
)
