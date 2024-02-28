import type { StoryFn } from '@storybook/react'
import { MenuV2 } from '..'
import { Stack } from '../../Stack'
import { DefaultDisclosure } from './Template.stories'

export const Overflowing: StoryFn<typeof MenuV2> = () => (
  <Stack gap={9}>
    <div style={{ display: 'flex', alignItems: 'start', flex: 1 }}>
      <MenuV2 disclosure={DefaultDisclosure} placement="right">
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
      </MenuV2>
    </div>
    <div style={{ display: 'flex', justifyContent: 'start', flex: 1 }}>
      <MenuV2 disclosure={DefaultDisclosure} placement="bottom">
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
      </MenuV2>
    </div>
    <div style={{ display: 'flex', justifyContent: 'end', flex: 1 }}>
      <MenuV2 disclosure={DefaultDisclosure} placement="top">
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
      </MenuV2>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
      <MenuV2 disclosure={DefaultDisclosure} placement="left">
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
        <MenuV2.Item>Default</MenuV2.Item>
      </MenuV2>
    </div>
  </Stack>
)

Overflowing.parameters = {
  docs: {
    description: {
      story: `This story is only to check the behavior of the menu when it overflows the parent container.`,
    },
  },
}

Overflowing.decorators = [
  StoryComponent => (
    <div
      style={{
        height: '100%',
        width: '990px',
        marginTop: '-40px',
        marginLeft: '-60px',
      }}
    >
      <StoryComponent />
    </div>
  ),
]
