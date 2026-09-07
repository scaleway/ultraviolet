import type { StoryFn } from '@storybook/react-vite'
import { Expandable } from '..'

export const Template: StoryFn<typeof Expandable> = ({ opened, ...args }) => (
  <Expandable opened={opened ?? true} {...args}>
    I&lsquo;m in an Expandable component
  </Expandable>
)
