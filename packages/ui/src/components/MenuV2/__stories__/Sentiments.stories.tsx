import type { StoryFn } from '@storybook/react'
import { MenuV2 } from '..'
import { DefaultDisclosure } from './Template.stories'

export const Sentiments: StoryFn<typeof MenuV2> = () => (
  <MenuV2 disclosure={DefaultDisclosure}>
    <MenuV2.Item>Default</MenuV2.Item>
    <MenuV2.Item disabled>Default Disabled</MenuV2.Item>
    <MenuV2.Item sentiment="danger">Danger</MenuV2.Item>
    <MenuV2.Item disabled sentiment="danger">
      Danger Disabled
    </MenuV2.Item>
    <MenuV2.Item href="/?/?path=/docs/components-navigation-menu">
      Link
    </MenuV2.Item>
    <MenuV2.Item
      sentiment="danger"
      href="/?/?path=/docs/components-navigation-menu"
    >
      Link Danger
    </MenuV2.Item>
  </MenuV2>
)

Sentiments.parameters = {
  docs: {
    description: {
      story: `A set of sentiment you can add on MenuV2Item (neutral, danger). You can use either props on MenuItem :
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
