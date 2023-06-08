import type { ComponentStory } from '@storybook/react'
import { TagList } from '..'

export const Template: ComponentStory<typeof TagList> = args => (
  // @ts-expect-error we want to set a default title
  <TagList popoverTitle="Additional" {...args} />
)
