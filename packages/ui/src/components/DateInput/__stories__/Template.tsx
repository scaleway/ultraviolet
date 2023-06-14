import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { DateInput } from '..'

export const Template: StoryFn<ComponentProps<typeof DateInput>> = props => (
  <DateInput {...props} />
)
