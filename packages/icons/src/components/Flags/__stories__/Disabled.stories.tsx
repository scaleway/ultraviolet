import { FranceFlag } from '../__generated__'

import type { StoryFn } from '@storybook/react-vite'

export const Disabled: StoryFn<typeof FranceFlag> = props => (
  <FranceFlag {...props} disabled />
)
