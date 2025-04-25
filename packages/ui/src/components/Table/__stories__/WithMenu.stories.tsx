import type { StoryFn } from '@storybook/react'
import { DotsHorizontalIcon } from 'node_modules/@ultraviolet/icons/src'
import { Table } from '..'
import { Button } from '../../Button'
import { MenuV2 } from '../../MenuV2'
import { columns, data } from './resources'

export const WithMenu: StoryFn<typeof Table> = ({ ...props }) => (
  <Table {...props} />
)

WithMenu.args = {
  columns: [
    { label: 'Name', info: 'This column is important' },
    ...columns.slice(1, 4),
    { label: '', width: '42px' },
  ],
  children: (
    <Table.Body>
      {data.map(movie => (
        <Table.Row key={movie.id} id={movie.id}>
          <Table.Cell>{movie.name}</Table.Cell>
          <Table.Cell>{movie.releaseYear}</Table.Cell>
          <Table.Cell>{movie.trilogy}</Table.Cell>
          <Table.Cell>{movie.director}</Table.Cell>
          <Table.Cell>
            <MenuV2
              disclosure={
                <Button sentiment="neutral" variant="ghost" size="small">
                  <DotsHorizontalIcon />
                </Button>
              }
            >
              <MenuV2.Item borderless>default (neutral)</MenuV2.Item>
              <MenuV2.Item sentiment="danger" borderless>
                Danger
              </MenuV2.Item>
              <MenuV2.Item
                href="/?path=/docs/components-navigation-menu--borderless"
                borderless
              >
                Link Neutral
              </MenuV2.Item>
              <MenuV2.Item
                sentiment="danger"
                href="/?path=/docs/components-navigation-menu--borderless"
                borderless
              >
                Link Danger
              </MenuV2.Item>
            </MenuV2>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  ),
}
