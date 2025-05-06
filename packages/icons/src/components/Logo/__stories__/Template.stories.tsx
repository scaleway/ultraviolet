import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { GoogleLogo } from '../__generated__'

export const Template: StoryFn<ComponentProps<typeof GoogleLogo>> = ({
  ...props
}) => <GoogleLogo {...props} />
