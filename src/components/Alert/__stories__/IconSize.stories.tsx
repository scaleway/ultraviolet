import { DecoratorFunction } from '@storybook/addons'
import { ComponentProps } from 'react'
import Alert from '..'
import Stack from '../../Stack'

export const IconSize = (props: ComponentProps<typeof Alert>) => [
  <Alert {...props} iconSize={24}>
    This is a notification bar with a custom icon size.
  </Alert>,
  <Alert {...props} iconSize={40} type="info">
    This is a notification bar with a custom icon size.
  </Alert>,
]

IconSize.decorators = [
  StoryComponent => (
    <Stack gap={2}>
      <StoryComponent />
    </Stack>
  ),
] as DecoratorFunction<JSX.Element>[]

IconSize.parameters = {
  docs: {
    storyDescription: 'Using `iconSize` prop you can change the icon size.',
  },
}
