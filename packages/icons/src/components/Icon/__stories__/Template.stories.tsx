import type { StoryFn } from '@storybook/react'
import { AddressIcon } from '..'

export const Template: StoryFn<typeof AddressIcon> = args => (
  <AddressIcon {...args} />
)
