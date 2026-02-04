import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Plans } from '..'

export const Template: StoryFn<ComponentProps<typeof Plans>> = ({
  ...props
}) => <Plans {...props} />
