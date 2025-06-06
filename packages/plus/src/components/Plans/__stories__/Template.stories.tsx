import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Plans } from '..'

export const Template: StoryFn<ComponentProps<typeof Plans>> = ({
  ...props
}) => <Plans {...props} />
