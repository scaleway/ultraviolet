import { DecoratorFunction } from '@storybook/addons'
import { ComponentProps } from 'react'
import Avatar from '..'
import Stack from '../../Stack'

export const Lock = (props: Omit<ComponentProps<typeof Avatar>, 'image'>) => [
  <Avatar {...props} text="Hello You" lock />,
  <Avatar {...props} size={48} textSize={32} text="Hello You" lock />,
]

Lock.decorators = [
  StoryComponent => (
    <Stack direction="row" gap={1} alignItems="flex-end">
      <StoryComponent />
    </Stack>
  ),
] as DecoratorFunction<JSX.Element>[]

Lock.parameters = {
  docs: {
    storyDescription:
      'You can set the component to be locked by using `lock` prop when `text` is specified.',
  },
}
