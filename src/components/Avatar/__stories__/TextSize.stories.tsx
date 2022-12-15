import type { DecoratorFunction } from '@storybook/addons'
import type { ComponentProps } from 'react'
import Avatar from '..'
import Stack from '../../Stack'

export const TextSize = (props: Omit<ComponentProps<typeof Avatar>, 'image'>) =>
  [
    [20, 10],
    [40, 20],
    [50, 30],
    [80, 50],
  ].map(sizes => (
    <Avatar
      {...props}
      key={sizes[0]}
      size={sizes[0]}
      textSize={sizes[1]}
      text="Hello You"
    />
  ))

TextSize.decorators = [
  StoryComponent => (
    <Stack direction="row" gap={1} alignItems="flex-end">
      <StoryComponent />
    </Stack>
  ),
] as DecoratorFunction<JSX.Element>[]

TextSize.parameters = {
  docs: {
    storyDescription:
      'Additionnally you can set the size of the text by using `textSize` prop. Don&lsquo;t forget to set the `size` prop to make your text fit into the component.',
  },
}
