import type { StoryFn } from '@storybook/react-vite'
import { ArrowDownIcon } from '@ultraviolet/icons/ArrowDownIcon'
import { DotsHorizontalIcon } from '@ultraviolet/icons/DotsHorizontalIcon'
import { PlusIcon } from '@ultraviolet/icons/PlusIcon'
import type { ComponentProps } from 'react'
import { Avatar } from '../../Avatar'
import { Button } from '../../Button'
import { Menu } from '../../Menu'
import { Stack } from '../../Stack'
import { Breadcrumbs } from '..'

export const AdvancedUsage: StoryFn<
  ComponentProps<typeof Breadcrumbs>
> = props => (
  <Stack gap={4}>
    <Breadcrumbs {...props}>
      <Menu
        align="start"
        disclosure={
          <Breadcrumbs.Item>
            <Stack alignItems="center" direction="row" gap={1}>
              <Avatar shape="square" size="xsmall" text="AS" variant="text" />
              Organization
              <ArrowDownIcon />
            </Stack>
          </Breadcrumbs.Item>
        }
      >
        <Menu.Item active sentiment="primary">
          <Stack alignItems="center" direction="row" gap={1}>
            <Avatar shape="square" size="xsmall" text="AS" variant="text" />
            Aria Sinclair
          </Stack>
        </Menu.Item>
        <Menu.Item>
          <Stack alignItems="center" direction="row" gap={1}>
            <Avatar shape="square" size="xsmall" text="JQ" variant="text" />
            Jasper Quinn
          </Stack>
        </Menu.Item>
      </Menu>
      <Menu
        align="start"
        disclosure={
          <Breadcrumbs.Item>
            <Stack alignItems="center" direction="row" gap={1}>
              <Avatar
                colors={['#BF95F9', '#3D1862']}
                shape="circle"
                size="xsmall"
                variant="colors"
              />
              Default Project
              <ArrowDownIcon />
            </Stack>
          </Breadcrumbs.Item>
        }
        hideOnClickItem
        searchable
      >
        <Menu.Group
          label="Projects"
          labelDescription={
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="flex-end"
              width="100%"
            >
              <Button sentiment="info" size="xsmall" variant="ghost">
                <PlusIcon />
                Create Project
              </Button>
            </Stack>
          }
        >
          <Menu.Item active borderless sentiment="primary">
            <Stack alignItems="center" direction="row" gap={1}>
              <Avatar
                colors={['#BF95F9', '#3D1862']}
                shape="circle"
                size="xsmall"
                variant="colors"
              />
              Default Project
            </Stack>
          </Menu.Item>
          <Menu.Item borderless>
            <Stack alignItems="center" direction="row" gap={1}>
              <Avatar
                colors={['#FFBFAB', '#822F15']}
                shape="circle"
                size="xsmall"
                variant="colors"
              />
              Project 1
            </Stack>
          </Menu.Item>
          <Menu.Item borderless>
            <Stack alignItems="center" direction="row" gap={1}>
              <Avatar
                colors={['#FF9EC1', '#740D32']}
                shape="circle"
                size="xsmall"
                variant="colors"
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
