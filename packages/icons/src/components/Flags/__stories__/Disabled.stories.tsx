import type { StoryFn } from '@storybook/react-vite'
import { FranceFlag } from '../__generated__'

export const Disabled: StoryFn<typeof FranceFlag> = props => (
  <FranceFlag {...props} disabled />
)
