import type { StoryFn } from '@storybook/react'
import { MenuV2 } from '..'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { DefaultDisclosure } from './Template.stories'

export const TriggerMethod: StoryFn<typeof MenuV2> = () => (
  <Stack gap={3} width="100%">
    <Stack gap={1} direction="row" alignItems="center">
      <Text as="p" variant="bodyStrong">
        Menu with triggerMethod set to click:
      </Text>
      <MenuV2 disclosure={DefaultDisclosure} triggerMethod="click">
        <MenuV2.Item borderless>Item 1</MenuV2.Item>
        <MenuV2.Item>Item 2</MenuV2.Item>
        <MenuV2.Item borderless sentiment="danger">
          Item 3
        </MenuV2.Item>
      </MenuV2>
    </Stack>
    <Stack gap={1} direction="row" alignItems="center">
      <Text as="p" variant="bodyStrong">
        Menu with triggerMethod set to hover:
      </Text>
      <MenuV2 disclosure={DefaultDisclosure} triggerMethod="hover">
        <MenuV2.Item borderless>Item 1</MenuV2.Item>
        <MenuV2.Item>Item 2</MenuV2.Item>
        <MenuV2.Item borderless sentiment="danger">
          Item 3
        </MenuV2.Item>
      </MenuV2>
    </Stack>
  </Stack>
)

TriggerMethod.parameters = {
  docs: {
    description: {
      story:
        'By default the menu is triggered by clicking the disclosure button. You can change this behavior by setting the `triggerMethod` prop to `hover` and the menu will open when the user hovers over the disclosure.',
    },
  },
}

TriggerMethod.decorators = [
  StoryComponent => (
    <div style={{ height: '300px' }}>
      <StoryComponent />
    </div>
  ),
]
