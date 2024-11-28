import type { StoryFn } from '@storybook/react'
import type { DisclosureProps } from '..'
import { Menu } from '..'
import { Button } from '../../Button'

const CustomDisclosure = ({ visible }: DisclosureProps) => (
  <Button>{visible === true ? 'Menu (is opened)' : 'Menu (is closed)'}</Button>
)

export const FunctionDisclosure: StoryFn<typeof Menu> = () => (
  <Menu disclosure={CustomDisclosure}>
    <Menu.Item>Menu 1</Menu.Item>
  </Menu>
)

FunctionDisclosure.parameters = {
  docs: {
    description: {
      story:
        'You can specify a function as disclosure and get popover props as argument',
    },
  },
}

FunctionDisclosure.decorators = [
  StoryComponent => (
    <div style={{ height: '300px' }}>
      <StoryComponent />
    </div>
  ),
]
