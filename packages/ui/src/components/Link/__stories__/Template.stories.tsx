import type { StoryFn } from '@storybook/react'
import { Link } from '..'

export const Template: StoryFn<typeof Link> = args => (
  <Link {...args}>Basic Link</Link>
)
