import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { InstanceProductIcon } from '../__generated__'

export const Template: StoryFn<ComponentProps<typeof InstanceProductIcon>> = ({
  ...props
}) => <InstanceProductIcon {...props} />
