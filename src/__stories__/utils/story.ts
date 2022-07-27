import { DecoratorFunction } from '@storybook/csf'
import { Args, ReactFramework, StoryObj } from '@storybook/react'

export default <A>(
  args?: Partial<A>,
  storyDescription = '',
  decorators: DecoratorFunction<ReactFramework, Args>[] = [],
  parameters = {},
): StoryObj<A> => ({
  args,
  decorators,
  parameters: { ...parameters, docs: { storyDescription } },
})
