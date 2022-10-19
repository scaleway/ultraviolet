import { DecoratorFunction } from '@storybook/addons'
import { ComponentProps } from 'react'
import Avatar from '..'
import Stack from '../../Stack'

export const Text = (props: Omit<ComponentProps<typeof Avatar>, 'image'>) =>
  ['Hello', 'Hello you', 'This is really long text for an acronym'].map(
    text => <Avatar {...props} text={text} />,
  )

Text.decorators = [
  StoryComponent => (
    <Stack direction="row" gap={1}>
      <StoryComponent />
    </Stack>
  ),
] as DecoratorFunction<JSX.Element>[]

Text.parameters = {
  docs: {
    storyDescription:
      'Instead of having an image you can put a text and it will take the best acronym to displayYou can change the default Text by using the `Text` prop. It work as `src` on a img tag.',
  },
}
