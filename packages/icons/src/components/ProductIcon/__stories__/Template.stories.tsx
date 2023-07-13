import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { ProductIcon } from '..'

export const Template: Story<ComponentProps<typeof ProductIcon>> = ({
  ...props
}) => <ProductIcon {...props} />
