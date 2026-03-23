import { Expandable } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Expandable> = ({ opened, ...args }) => (
  <Expandable opened={opened ?? true} {...args}>
    I&lsquo;m in an Expandable component
  </Expandable>
)
