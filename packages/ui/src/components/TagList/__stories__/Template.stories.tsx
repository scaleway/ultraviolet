import type { StoryFn } from '@storybook/react'
import { TagList } from '..'

export const Template: StoryFn<typeof TagList> = args => (
  // @ts-expect-error we want to set a default title
  <TagList popoverTitle="Additional" {...args} />
)
