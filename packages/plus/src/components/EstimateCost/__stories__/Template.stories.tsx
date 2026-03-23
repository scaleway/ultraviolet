import { EstimateCost } from '..'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Template: StoryFn<ComponentProps<typeof EstimateCost>> = props => (
  <EstimateCost {...props} hideOverlay />
)
