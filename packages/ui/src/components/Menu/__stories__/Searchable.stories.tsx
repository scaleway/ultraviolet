import type { StoryFn } from '@storybook/react'
import { DotsHorizontalIcon } from '@ultraviolet/icons'
import { Menu } from '..'
import { Avatar } from '../../Avatar'
import { Button } from '../../Button'
import { Stack } from '../../Stack'

export const Searchable: StoryFn<typeof Menu> = () => (
  <Menu
    align="start"
    searchable
    hideOnClickItem
    disclosure={
      <Button sentiment="neutral" variant="ghost" size="small">
        <DotsHorizontalIcon />
      </Button>
    }
  >
    <Menu.Group label="Projects" emptyState="No project">
      <Menu.Item sentiment="primary" active>
        <Stack direction="row" gap={1} alignItems="center">
          <Avatar
            variant="colors"
            colors={['#BF95F9', '#3D1862']}
            shape="circle"
            size="xsmall"
          />
          Default Project
        </Stack>
      </Menu.Item>
      <Menu.Item>
        <Stack direction="row" gap={1} alignItems="center">
          <Avatar
            variant="colors"
            colors={['#FFBFAB', '#822F15']}
            shape="circle"
            size="xsmall"
          />
          Project 1
        </Stack>
      </Menu.Item>
      <Menu.Item>
        <Stack direction="row" gap={1} alignItems="center">
          <Avatar
            variant="colors"
            colors={['#FF9EC1', '#740D32']}
            shape="circle"
            size="xsmall"
          />
          Project 2
        </Stack>
      </Menu.Item>
    </Menu.Group>
  </Menu>
)

Searchable.decorators = [
  StoryComponent => (
    <div style={{ height: '80px', width: 'min-content' }}>
      <StoryComponent />
    </div>
  ),
]
