import { DecoratorFunction } from '@storybook/addons'
import { ComponentProps } from 'react'
import Alert, { alertTypes } from '..'
import Stack from '../../Stack'

export const Types = (props: ComponentProps<typeof Alert>) =>
  alertTypes.map(type => (
    <Alert {...props} type={type}>
      This is a notification bar with the {type} variant.
    </Alert>
  ))

Types.decorators = [
  StoryComponent => (
    <Stack gap={2}>
      <StoryComponent />
    </Stack>
  ),
] as DecoratorFunction<JSX.Element>[]

Types.parameters = {
  docs: {
    storyDescription:
      'Using `type` prop you can change the type of the component. Each type has a default icon set.',
  },
}
