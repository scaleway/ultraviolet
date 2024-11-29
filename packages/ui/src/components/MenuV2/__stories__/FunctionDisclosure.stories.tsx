import type { StoryFn } from '@storybook/react'
import type { DisclosureProps } from '..'
import { MenuV2 } from '..'
import { Button } from '../../Button'

const CustomDisclosure = ({ visible }: DisclosureProps) => (
  <Button>{visible ? 'MenuV2 (is opened)' : 'MenuV2 (is closed)'}</Button>
)

export const FunctionDisclosure: StoryFn<typeof MenuV2> = () => (
  <MenuV2 disclosure={CustomDisclosure}>
    <MenuV2.Item>MenuV2 1</MenuV2.Item>
  </MenuV2>
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
