import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { WireIllustration } from '..'

export const Template: StoryFn<ComponentProps<typeof WireIllustration>> = ({
  ...props
}) => <WireIllustration {...props} />
