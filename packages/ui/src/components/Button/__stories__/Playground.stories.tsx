import { fireEvent, screen } from '@storybook/testing-library'
import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  children: 'Button text',
}

Playground.play = () => {
  fireEvent.click(screen.getByRole('button'))
}
