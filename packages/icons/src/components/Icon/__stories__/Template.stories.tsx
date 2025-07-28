import type { StoryFn } from '@storybook/react-vite'
import { AddressIcon } from '../__generated__'

export const Template: StoryFn<typeof AddressIcon> = args => (
  <AddressIcon {...args} />
)
