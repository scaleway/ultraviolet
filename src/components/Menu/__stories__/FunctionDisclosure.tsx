import { ComponentStory } from '@storybook/react'
import { fireEvent, screen } from '@storybook/testing-library'
import Menu from '..'
import Touchable from '../../Touchable'

const CustomTemplate: ComponentStory<typeof Menu> = ({
  disclosure,
  ...props
}) => (
  <Menu
    // eslint-disable-next-line react/no-unstable-nested-components
    disclosure={menuProps => (
      <Touchable title="menu" name="menu">
        {menuProps?.visible === true ? 'Menu (is opened)' : 'Menu (is closed)'}
      </Touchable>
    )}
    {...props}
  />
)

export const FunctionDisclosure = CustomTemplate.bind({})

const customCodeSnippet = `<Menu
disclosure={menuProps => (
  <Touchable title="menu" name="menu">
    {menuProps?.visible ? 'Menu (is closed)' : 'Menu (is opened)'}
  </Touchable>
)}
>
 <Menu.Item>Menu 1</Menu.Item>
</Menu>`

FunctionDisclosure.parameters = {
  docs: {
    source: {
      code: customCodeSnippet,
    },
    storyDescription:
      'You can specify a function as disclosure and get popover props as argument',
  },
}

FunctionDisclosure.args = {
  children: [<Menu.Item>Menu 1</Menu.Item>],
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
