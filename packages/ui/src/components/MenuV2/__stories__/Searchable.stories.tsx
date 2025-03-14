import type { StoryFn } from '@storybook/react'
import { MenuV2 } from '..'
import { AvatarV2 } from '../../AvatarV2'
import { Button } from '../../Button'
import { Stack } from '../../Stack'

export const Searchable: StoryFn<typeof MenuV2> = () => (
  <MenuV2
    align="start"
    searchable
    hideOnClickItem
    disclosure={
      <Button
        icon="dots-horizontal"
        sentiment="neutral"
        variant="ghost"
        size="small"
      />
    }
  >
    <MenuV2.Group label="Projects" emptyState="No project">
      <MenuV2.Item sentiment="primary" active>
        <Stack direction="row" gap={1} alignItems="center">
          <AvatarV2
            variant="colors"
            colors={['#BF95F9', '#3D1862']}
            shape="circle"
            size="xsmall"
          />
          Default Project
        </Stack>
      </MenuV2.Item>
      <MenuV2.Item>
        <Stack direction="row" gap={1} alignItems="center">
          <AvatarV2
            variant="colors"
            colors={['#FFBFAB', '#822F15']}
            shape="circle"
            size="xsmall"
          />
          Project 1
        </Stack>
      </MenuV2.Item>
      <MenuV2.Item>
        <Stack direction="row" gap={1} alignItems="center">
          <AvatarV2
            variant="colors"
            colors={['#FF9EC1', '#740D32']}
            shape="circle"
            size="xsmall"
          />
          Project 2
        </Stack>
      </MenuV2.Item>
    </MenuV2.Group>
  </MenuV2>
)

Searchable.decorators = [
  StoryComponent => (
    <div style={{ height: '80px', width: 'min-content' }}>
      <StoryComponent />
    </div>
  ),
]
