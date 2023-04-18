import type { ComponentStory } from '@storybook/react'
import type { DisclosureProps } from '..'
import { Menu } from '..'
import { Button } from '../../Button'

export const FunctionDisclosure: ComponentStory<typeof Menu> = () => {
  const CustomDisclosure = ({ visible }: DisclosureProps) => (
    <Button>
      {visible === true ? 'Menu (is opened)' : 'Menu (is closed)'}
    </Button>
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

FunctionDisclosure.decorators = [
  StoryComponent => (
    <div style={{ height: '300px' }}>
      <StoryComponent />
    </div>
  ),
]
