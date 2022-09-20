import { fireEvent, screen } from '@storybook/testing-library'
import Menu from '..'
import { Template } from './Template'

export const Default = Template.bind({})

Default.args = {
  children: [
    <Menu.Item>Menu Item 1</Menu.Item>,
    <Menu.Item>Menu Item 2</Menu.Item>,
  ],
}

Default.play = () => {
  fireEvent.click(screen.getByRole('button'))
}

Default.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]
