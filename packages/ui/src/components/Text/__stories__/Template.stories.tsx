import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Text } from '../index'

export const Template: StoryFn<ComponentProps<typeof Text>> = args => (
  <Text {...args} />
)
