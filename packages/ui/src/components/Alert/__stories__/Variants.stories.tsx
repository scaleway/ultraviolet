import { DecoratorFunction } from '@storybook/addons'
import { ComponentProps } from 'react'
import Alert, { alertVariants } from '..'
import Stack from '../../Stack'

export const Variants = (props: ComponentProps<typeof Alert>) =>
  alertVariants.map(variant => (
    <Alert {...props} key={variant} type="info" variant={variant}>
      This is a notification bar with the {variant} variant.
    </Alert>
  ))

Variants.decorators = [
  StoryComponent => (
    <Stack gap={2}>
      <StoryComponent />
    </Stack>
  ),
] as DecoratorFunction<JSX.Element>[]

Variants.parameters = {
  docs: {
    storyDescription:
      'Using `variant` prop you can change the style of the component.',
  },
}
