import type { Decorator } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Stack } from '../../Stack'
import { GlobalAlert } from '../index'

export const Variants = (props: ComponentProps<typeof GlobalAlert>) =>
  (['info', 'danger', 'promotional'] as const).map(variant => (
    <GlobalAlert {...props} key={variant} variant={variant}>
      This is a global alert with the {variant} variant
    </GlobalAlert>
  ))

Variants.decorators = [
  StoryComponent => (
    <Stack gap={2}>
      <StoryComponent />
    </Stack>
  ),
] as Decorator[]

Variants.parameters = {
  docs: {
    description: {
      story:
        'Using `variant` prop you can change the variant of the component. Each variant has a default icon set.',
    },
  },
}
