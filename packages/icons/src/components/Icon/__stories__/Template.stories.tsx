import { AddressIcon } from '../__generated__'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof AddressIcon> = args => (
  <AddressIcon {...args} />
)
