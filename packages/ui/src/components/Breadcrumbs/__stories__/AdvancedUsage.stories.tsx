import type { StoryFn } from '@storybook/react'
import { ArrowDownIcon, DotsHorizontalIcon, PlusIcon } from '@ultraviolet/icons'
import type { ComponentProps } from 'react'
import { Breadcrumbs } from '..'
import { AvatarV2 } from '../../AvatarV2'
import { Button } from '../../Button'
import { MenuV2 } from '../../MenuV2'
import { Stack } from '../../Stack'

export const AdvancedUsage: StoryFn<
  ComponentProps<typeof Breadcrumbs>
> = props => (
  <Stack gap={4}>
    <Breadcrumbs {...props}>
      <MenuV2
        align="start"
        disclosure={
          <Breadcrumbs.Item>
            <Stack direction="row" gap={1} alignItems="center">
              <AvatarV2 variant="text" text="AS" shape="square" size="xsmall" />
              Organization
              <ArrowDownIcon />
            </Stack>
          </Breadcrumbs.Item>
        }
      >
        <MenuV2.Item sentiment="primary" active>
          <Stack direction="row" gap={1} alignItems="center">
            <AvatarV2 variant="text" text="AS" shape="square" size="xsmall" />
            Aria Sinclair
          </Stack>
        </MenuV2.Item>
        <MenuV2.Item>
          <Stack direction="row" gap={1} alignItems="center">
            <AvatarV2 variant="text" text="JQ" shape="square" size="xsmall" />
            Jasper Quinn
          </Stack>
        </MenuV2.Item>
      </MenuV2>
      <MenuV2
        align="start"
        searchable
        hideOnClickItem
        disclosure={
          <Breadcrumbs.Item>
            <Stack direction="row" gap={1} alignItems="center">
              <AvatarV2
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
        <MenuV2.Group
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
          <MenuV2.Item sentiment="primary" active borderless>
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
          <MenuV2.Item borderless>
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
          <MenuV2.Item borderless>
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
      <Breadcrumbs.Item to="/products/1">Instance</Breadcrumbs.Item>
      <Breadcrumbs.Item to="/products/1/details">Overview</Breadcrumbs.Item>
    </Breadcrumbs>
    <Breadcrumbs {...props}>
      <Breadcrumbs.Item>Home</Breadcrumbs.Item>
      <MenuV2
        align="start"
        disclosure={
          <Breadcrumbs.Item>
            <DotsHorizontalIcon />
          </Breadcrumbs.Item>
        }
      >
        <MenuV2.Item>Instance</MenuV2.Item>
        <MenuV2.Item>Private Network</MenuV2.Item>
        <MenuV2.Item>Create</MenuV2.Item>
      </MenuV2>
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
