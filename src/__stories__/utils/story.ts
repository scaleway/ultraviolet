import { DecoratorFunction } from '@storybook/csf'
import { Args, ReactFramework, Story } from '@storybook/react'

export default <A extends Args>(
  template: Story<A>,
  args?: Partial<A>,
  storyDescription = '',
  decorators: DecoratorFunction<ReactFramework, A>[] = [],
): Story<A> =>
  Object.assign(template.bind(null), template, {
    args: { ...template.args, ...args },
    decorators,
    parameters: { ...template.parameters, docs: { storyDescription } },
  })
