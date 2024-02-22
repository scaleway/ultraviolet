import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { DynamicIllustration } from '..'

export const Template: StoryFn<ComponentProps<typeof DynamicIllustration>> = ({
  ...props
}) => <DynamicIllustration {...props} />
