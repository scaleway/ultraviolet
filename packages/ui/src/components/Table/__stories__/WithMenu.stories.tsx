import type { StoryFn } from '@storybook/react-vite'
import { DotsHorizontalIcon } from '@ultraviolet/icons/DotsHorizontalIcon'
import { Button } from '../../Button'
import { Menu } from '../../Menu'
import { Table } from '..'
import { columns, data } from './resources'

export const WithMenu: StoryFn<typeof Table> = ({ ...props }) => (
  <Table {...props} />
)

WithMenu.args = {
  children: (
    <Table.Body>
      {data.map(movie => (
        <Table.Row id={movie.id} key={movie.id}>
          <Table.Cell>{movie.name}</Table.Cell>
          <Table.Cell>{movie.releaseYear}</Table.Cell>
          <Table.Cell>{movie.trilogy}</Table.Cell>
          <Table.Cell>{movie.director}</Table.Cell>
          <Table.Cell>
            <Menu
              disclosure={
                <Button sentiment="neutral" size="small" variant="ghost">
                  <DotsHorizontalIcon />
                </Button>
              }
            >
              <Menu.Item borderless>default (neutral)</Menu.Item>
              <Menu.Item borderless sentiment="danger">
                Danger
              </Menu.Item>
              <Menu.Item
                borderless
                href="/?path=/docs/components-navigation-menu--borderless"
              >
                Link Neutral
              </Menu.Item>
              <Menu.Item
                borderless
                href="/?path=/docs/components-navigation-menu--borderless"
                sentiment="danger"
              >
                Link Danger
              </Menu.Item>
            </Menu>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  ),
  columns: [
    { info: 'This column is important', label: 'Name' },
    ...columns.slice(1, 4),
    { label: '', width: '42px' },
  ],
}
