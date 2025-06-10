import type { StoryFn } from '@storybook/react'
import { DotsHorizontalIcon } from '@ultraviolet/icons'
import type { ComponentProps, ReactNode } from 'react'
import { MenuV2 } from '..'
import { AvatarV2 } from '../../AvatarV2'
import { Badge } from '../../Badge'
import { Button } from '../../Button'
import { Stack } from '../../Stack'

type ItemProps = {
  sentiment?: ComponentProps<typeof MenuV2.Item>['sentiment']
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
  <MenuV2.Item sentiment={sentiment} active={active} searchText={searchText}>
    <Stack direction="row" gap={1} alignItems="center">
      <AvatarV2 variant="colors" colors={colors} shape="circle" size="xsmall" />
      {children}
    </Stack>
  </MenuV2.Item>
)

export const Searchable: StoryFn<typeof MenuV2> = props => (
  <MenuV2
    {...props}
    align="start"
    searchable
    hideOnClickItem
    disclosure={
      <Button sentiment="neutral" variant="ghost" size="small">
        <DotsHorizontalIcon />
      </Button>
    }
  >
    <Item
      colors={['#BF95F9', '#3D1862']}
      active
      searchText="default project"
      sentiment="primary"
    >
      <Stack direction="row" gap={1} alignItems="center">
        Default Project
        <Badge sentiment="success" size="small">
          NEW
        </Badge>
      </Stack>
    </Item>
    <MenuV2.Group label="Projects" emptyState="No project">
      <Item colors={['#FFBFAB', '#822F15']}>Project 1</Item>
      <Item colors={['#FF9EC1', '#740D32']}>Project 2</Item>
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

Searchable.parameters = {
  docs: {
    description: {
      story:
        'You can add `searchable` prop to the MenuV2 component to enable searching through the items.\n\n If `MenuV2.Item` has a complex children (not a string) you can specify `searchText` on `MenuV2.Item` prop to search through the item.',
    },
  },
}
