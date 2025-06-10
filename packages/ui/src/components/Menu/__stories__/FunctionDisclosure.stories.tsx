import type { StoryFn } from '@storybook/react'
import { Menu } from '..'
import { Button } from '../../Button'
import type { DisclosureProps } from '../types'

const CustomDisclosure = ({ visible }: DisclosureProps) => (
  <Button>{visible ? 'Menu (is opened)' : 'Menu (is closed)'}</Button>
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
    <div style={{ height: '300px', width: 'min-content' }}>
      <StoryComponent />
    </div>
  ),
]
