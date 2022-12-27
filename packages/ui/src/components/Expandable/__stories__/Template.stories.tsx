import type { ComponentStory } from '@storybook/react'
import Expandable from '..'

export const Template: ComponentStory<typeof Expandable> = ({
  opened,
  ...args
}) => (
  <Expandable opened={opened ?? true} {...args}>
    I&lsquo;m in an Expandable component
  </Expandable>
)
