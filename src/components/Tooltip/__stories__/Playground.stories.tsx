import type { DecoratorFunction } from '@storybook/addons'
import { userEvent, within } from '@storybook/testing-library'
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

Playground.play = ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const hoverElement = canvas.getByText('Hover Me')
  if (hoverElement) {
    userEvent.click(hoverElement)
  }
}
