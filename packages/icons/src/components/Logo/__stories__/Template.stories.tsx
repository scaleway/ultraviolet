import { GoogleLogo } from '../__generated__'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Template: StoryFn<ComponentProps<typeof GoogleLogo>> = ({
  ...props
}) => <GoogleLogo {...props} />
