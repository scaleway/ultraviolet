import type { StoryFn } from '@storybook/react'
import { Menu } from '..'
import { DefaultDisclosure } from './Template.stories'

export const Sentiments: StoryFn<typeof Menu> = () => (
  <Menu disclosure={DefaultDisclosure}>
    <Menu.Item>Default</Menu.Item>
    <Menu.Item disabled>Default Disabled</Menu.Item>
    <Menu.Item sentiment="danger">Danger</Menu.Item>
    <Menu.Item sentiment="primary">Danger</Menu.Item>
    <Menu.Item disabled sentiment="danger">
      Danger Disabled
    </Menu.Item>
    <Menu.Item href="/?/?path=/docs/components-navigation-menu">Link</Menu.Item>
    <Menu.Item
      sentiment="danger"
      href="/?/?path=/docs/components-navigation-menu"
      tooltip="test"
    >
      Link Danger
    </Menu.Item>
  </Menu>
)

Sentiments.parameters = {
  docs: {
    description: {
      story: `A set of sentiment you can add on MenuItem (neutral, danger). You can use either props on MenuItem :
- \`onClick\` to define menu actions.
- \`to\` to define as a \`React Router Link\`.
- \`href\` to define as a native link \`a\`.`,
    },
  },
}

Sentiments.decorators = [
  StoryComponent => (
    <div style={{ height: '300px', width: 'min-content' }}>
      <StoryComponent />
    </div>
  ),
]
