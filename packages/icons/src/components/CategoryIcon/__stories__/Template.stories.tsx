import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { BaremetalCategoryIcon } from '../__generated__'

export const Template: StoryFn<
  ComponentProps<typeof BaremetalCategoryIcon>
> = ({ ...props }) => <BaremetalCategoryIcon {...props} />
