import type { StoryFn } from '@storybook/react-vite'
import { DotsHorizontalIcon } from '@ultraviolet/icons/DotsHorizontalIcon'
import type { ComponentProps, ReactNode } from 'react'
import { Avatar } from '../../Avatar'
import { Badge } from '../../Badge'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Menu } from '..'

type ItemProps = {
  sentiment?: ComponentProps<typeof Menu.Item>['sentiment']
  active?: boolean
  colors: [string, string]
  children: ReactNode
  searchText?: string
}

const Item = ({
  sentiment,
  active,
  colors,
  children,
  searchText,
}: ItemProps) => (
  <Menu.Item active={active} searchText={searchText} sentiment={sentiment}>
    <Stack alignItems="center" direction="row" gap={1}>
      <Avatar colors={colors} shape="circle" size="xsmall" variant="colors" />
      {children}
    </Stack>
  </Menu.Item>
)

export const Searchable: StoryFn<typeof Menu> = props => (
  <Menu
    {...props}
    align="start"
    disclosure={
      <Button sentiment="neutral" size="small" variant="ghost">
        <DotsHorizontalIcon />
      </Button>
    }
    hideOnClickItem
    searchable
  >
    <Item
      active
      colors={['#BF95F9', '#3D1862']}
      searchText="default project"
      sentiment="primary"
    >
      <Stack alignItems="center" direction="row" gap={1}>
        Default Project
        <Badge sentiment="success" size="small">
          NEW
        </Badge>
      </Stack>
    </Item>
    <Menu.Group emptyState="No project" label="Projects">
      <Item colors={['#FFBFAB', '#822F15']}>Project 1</Item>
      <Item colors={['#FF9EC1', '#740D32']}>Project 2</Item>
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

Searchable.parameters = {
  docs: {
    description: {
      story:
        'You can add `searchable` prop to the Menu component to enable searching through the items.\n\n If `Menu.Item` has a complex children (not a string) you can specify `searchText` on `Menu.Item` prop to search through the item.',
    },
  },
}
