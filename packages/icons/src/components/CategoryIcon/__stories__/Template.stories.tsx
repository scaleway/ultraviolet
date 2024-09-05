import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Baremetal } from '..'

export const Template: StoryFn<ComponentProps<typeof Baremetal>> = ({
  ...props
}) => <Baremetal {...props} />
