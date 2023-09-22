import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { ProductIcon } from '..'

export const Template: StoryFn<ComponentProps<typeof ProductIcon>> = ({
  ...props
}) => <ProductIcon {...props} />
