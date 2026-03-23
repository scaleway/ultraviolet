import { Badge } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Badge> = ({ ...props }) => (
  <Badge {...props} />
)
