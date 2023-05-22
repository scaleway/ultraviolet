import type { Decorator } from '@storybook/react'
import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.decorators = [
  Story => (
    <div style={{ alignItems: 'center', display: 'flex' }}>
      <Story />
    </div>
  ),
] as Decorator[]

Playground.args = {
  text: 'Hello there',
}
