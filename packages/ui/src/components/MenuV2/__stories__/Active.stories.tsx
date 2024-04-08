import type { StoryFn } from '@storybook/react'
import { MenuV2 } from '..'
import { DefaultDisclosure } from './Template.stories'

export const Active: StoryFn<typeof MenuV2> = () => (
  <MenuV2 disclosure={DefaultDisclosure}>
    <MenuV2.Item>default (neutral)</MenuV2.Item>
    <MenuV2.Item sentiment="danger" active>
      Active Danger
    </MenuV2.Item>
    <MenuV2.Item active>Active Neutral</MenuV2.Item>
    <MenuV2.Item sentiment="primary" active>
      Active Primary
    </MenuV2.Item>
  </MenuV2>
)

Active.parameters = {
  docs: {
    description: {
      story:
        'Property `active` give a visual feedback to the user that the current item is selected. It can be useful to highlight the current page in case of a navigation.',
    },
  },
}

Active.decorators = [
  StoryComponent => (
    <div style={{ height: '250px', width: 'min-content' }}>
      <StoryComponent />
    </div>
  ),
]
