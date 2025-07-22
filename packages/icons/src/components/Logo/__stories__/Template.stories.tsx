import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { GoogleLogo } from '../__generated__'

export const Template: StoryFn<ComponentProps<typeof GoogleLogo>> = ({
  ...props
}) => <GoogleLogo {...props} />
