import type { Decorator } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Alert } from '..'
import { Stack } from '../../Stack'

export const Variants = (props: ComponentProps<typeof Alert>) =>
  (['danger', 'warning', 'success', 'info'] as const).map(variant => (
    <Alert
      {...props}
      title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} title`}
      variant={variant}
      buttonText="More info"
      onClickButton={() => alert('Button clicked')}
    >
      This is an Alert with the {variant} variant.
    </Alert>
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
    storyDescription:
      'Using `type` prop you can change the type of the component. Each type has a default icon set.',
  },
}
