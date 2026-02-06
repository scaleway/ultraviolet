import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { EstimateCost } from '..'

export const Template: StoryFn<ComponentProps<typeof EstimateCost>> = props => (
  <EstimateCost {...props} hideOverlay />
)
