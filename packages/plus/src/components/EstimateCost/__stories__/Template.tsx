import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { EstimateCost } from '..'

export const Template: Story<ComponentProps<typeof EstimateCost>> = props => (
  <EstimateCost {...props} hideOverlay />
)
