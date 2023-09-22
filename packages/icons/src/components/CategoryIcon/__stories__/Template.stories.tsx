import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { CategoryIcon } from '..'

export const Template: StoryFn<ComponentProps<typeof CategoryIcon>> = ({
  ...props
}) => <CategoryIcon {...props} />
