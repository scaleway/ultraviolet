import type { DecoratorFunction } from '@storybook/addons'
import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.decorators = [
  Story => (
    <div style={{ alignItems: 'center', display: 'flex' }}>
      <Story />
    </div>
  ),
] as DecoratorFunction<JSX.Element>[]

Playground.args = {
  text: 'Hello there',
}
