import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Conversation } from '..'

export const Template: StoryFn<ComponentProps<typeof Conversation>> = ({
  ...props
}) => <Conversation {...props} />
