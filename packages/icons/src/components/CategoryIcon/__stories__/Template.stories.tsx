import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { CategoryIcon } from '..'

export const Template: Story<ComponentProps<typeof CategoryIcon>> = ({
  ...props
}) => <CategoryIcon {...props} />
