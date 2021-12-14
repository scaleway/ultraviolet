import { DecoratorFunction } from '@storybook/csf'
import { ReactFramework, StoryObj } from '@storybook/react'

export default <A>(
  args?: Partial<A>,
  storyDescription = '',
  decorators: DecoratorFunction<ReactFramework, A>[] = [],
  parameters = {},
): StoryObj<A> => ({
  args,
  decorators,
  parameters: { ...parameters, docs: { storyDescription } },
})
