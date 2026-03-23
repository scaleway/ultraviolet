import { Link } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Link> = args => (
  <Link {...args}>Basic Link</Link>
)
