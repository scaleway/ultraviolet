import type { StoryFn } from '@storybook/react-vite'
import { Badge } from '..'

export const Template: StoryFn<typeof Badge> = ({ ...props }) => (
  <Badge {...props} />
)
