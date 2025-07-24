import type { StoryFn } from '@storybook/react-vite'
import { ArrowDownIcon, DotsHorizontalIcon, PlusIcon } from '@ultraviolet/icons'
import type { ComponentProps } from 'react'
import { Breadcrumbs } from '..'
import { Avatar } from '../../Avatar'
import { Button } from '../../Button'
import { Menu } from '../../Menu'
import { Stack } from '../../Stack'

export const AdvancedUsage: StoryFn<
  ComponentProps<typeof Breadcrumbs>
> = props => (
  <Stack gap={4}>
    <Breadcrumbs {...props}>
      <Menu
        align="start"
        disclosure={
          <Breadcrumbs.Item>
            <Stack direction="row" gap={1} alignItems="center">
              <Avatar variant="text" text="AS" shape="square" size="xsmall" />
              Organization
              <ArrowDownIcon />
            </Stack>
          </Breadcrumbs.Item>
        }
      >
        <Menu.Item sentiment="primary" active>
          <Stack direction="row" gap={1} alignItems="center">
            <Avatar variant="text" text="AS" shape="square" size="xsmall" />
            Aria Sinclair
          </Stack>
        </Menu.Item>
        <Menu.Item>
          <Stack direction="row" gap={1} alignItems="center">
            <Avatar variant="text" text="JQ" shape="square" size="xsmall" />
            Jasper Quinn
          </Stack>
        </Menu.Item>
      </Menu>
      <Menu
        align="start"
        searchable
        hideOnClickItem
        disclosure={
          <Breadcrumbs.Item>
            <Stack direction="row" gap={1} alignItems="center">
              <Avatar
                variant="colors"
                colors={['#BF95F9', '#3D1862']}
                shape="circle"
                size="xsmall"
              />
              Default Project
              <ArrowDownIcon />
            </Stack>
          </Breadcrumbs.Item>
        }
      >
        <Menu.Group
          label="Projects"
          labelDescription={
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="end"
              width="100%"
            >
              <Button sentiment="info" variant="ghost" size="xsmall">
                <PlusIcon />
                Create Project
              </Button>
            </Stack>
          }
        >
          <Menu.Item sentiment="primary" active borderless>
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
          <Menu.Item borderless>
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
          <Menu.Item borderless>
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
      <Breadcrumbs.Item to="/products/1">Instance</Breadcrumbs.Item>
      <Breadcrumbs.Item to="/products/1/details">Overview</Breadcrumbs.Item>
    </Breadcrumbs>
    <Breadcrumbs {...props}>
      <Breadcrumbs.Item>Home</Breadcrumbs.Item>
      <Menu
        align="start"
        disclosure={
          <Breadcrumbs.Item>
            <DotsHorizontalIcon />
          </Breadcrumbs.Item>
        }
      >
        <Menu.Item>Instance</Menu.Item>
        <Menu.Item>Private Network</Menu.Item>
        <Menu.Item>Create</Menu.Item>
      </Menu>
      <Breadcrumbs.Item>Add IP</Breadcrumbs.Item>
    </Breadcrumbs>
  </Stack>
)

AdvancedUsage.decorators = [
  Story => (
    <div style={{ height: 300 }}>
      <Story />
    </div>
  ),
]

AdvancedUsage.parameters = {
  docs: {
    description: {
      story:
        'If needed you can add anything inside a `Breadcrumbs.Item`. In this example, we have a `Menu` component inside a `Breadcrumbs.Item`. It allow you to add a new level of navigation.<br/><br/>You can also shrink the Breadcumbs size by using menu and adding sub items as seen in the second example.',
    },
  },
}
