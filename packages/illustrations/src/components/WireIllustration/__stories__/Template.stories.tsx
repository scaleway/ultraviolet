import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { SupportPlansWire } from '../__generated__'

export const Template: StoryFn<ComponentProps<typeof SupportPlansWire>> = ({
  ...props
}) => <SupportPlansWire {...props} />
