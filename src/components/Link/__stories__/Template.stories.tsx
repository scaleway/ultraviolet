import type { ComponentStory } from '@storybook/react'
import Link from '..'

export const Template: ComponentStory<typeof Link> = args => (
  <Link {...args}>Basic Link</Link>
)
