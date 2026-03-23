import { Template } from './Template.stories'

import type { Decorator } from '@storybook/react-vite'

export const Playground = Template.bind({})

Playground.decorators = [
  Story => (
    <div>
      <div style={{ display: 'inline-flex' }}>
        <Story />
      </div>
    </div>
  ),
] as Decorator[]

Playground.args = {
  text: 'Hello there',
}
