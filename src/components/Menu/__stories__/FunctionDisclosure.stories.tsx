import { ComponentStory } from '@storybook/react'
import { fireEvent, screen } from '@storybook/testing-library'
import Menu, { DisclosureProps } from '..'
import Touchable from '../../Touchable'

export const FunctionDisclosure: ComponentStory<typeof Menu> = () => {
  const CustomDisclosure = ({ visible }: DisclosureProps) => (
    <Touchable title="menu" name="menu">
      {visible === true ? 'Menu (is opened)' : 'Menu (is closed)'}
    </Touchable>
  )

  return (
    <Menu disclosure={CustomDisclosure}>
      <Menu.Item>Menu 1</Menu.Item>
    </Menu>
  )
}

FunctionDisclosure.parameters = {
  docs: {
    storyDescription:
      'You can specify a function as disclosure and get popover props as argument',
  },
}

FunctionDisclosure.play = () => {
  fireEvent.click(screen.getByRole('button'))
}

FunctionDisclosure.decorators = [
  StoryComponent => (
    <div style={{ height: '300px' }}>
      <StoryComponent />
    </div>
  ),
]
