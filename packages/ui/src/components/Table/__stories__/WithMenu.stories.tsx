import type { StoryFn } from '@storybook/react'
import { DotsHorizontalIcon } from '@ultraviolet/icons'
import { Table } from '..'
import { Button } from '../../Button'
import { Menu } from '../../Menu'
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
            <Menu
              disclosure={
                <Button sentiment="neutral" variant="ghost" size="small">
                  <DotsHorizontalIcon />
                </Button>
              }
            >
              <Menu.Item borderless>default (neutral)</Menu.Item>
              <Menu.Item sentiment="danger" borderless>
                Danger
              </Menu.Item>
              <Menu.Item
                href="/?path=/docs/components-navigation-menu--borderless"
                borderless
              >
                Link Neutral
              </Menu.Item>
              <Menu.Item
                sentiment="danger"
                href="/?path=/docs/components-navigation-menu--borderless"
                borderless
              >
                Link Danger
              </Menu.Item>
            </Menu>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  ),
}
