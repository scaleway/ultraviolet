import type { StoryFn } from '@storybook/react-vite'
import { Table } from '..'
import { data, overflowColumns } from './resources'

export const Overflow: StoryFn<typeof Table> = ({ ...props }) => (
  <Table {...props} />
)

Overflow.args = {
  columns: overflowColumns,
  children: (
    <Table.Body>
      {data.map(movie => (
        <Table.Row key={movie.id} id={movie.id}>
          <Table.Cell>{movie.name}</Table.Cell>
          <Table.Cell>{movie.releaseYear}</Table.Cell>
          <Table.Cell>{movie.trilogy}</Table.Cell>
          <Table.Cell>{movie.director}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  ),
}

Overflow.parameters = {
  docs: {
    description: {
      story:
        'By default the table will shrink each cell element if there is available space to make the table fit the container. If you need your cells to be at specific size you can do it by using `min-width` in columns. If the table overflow the container it will show a horizontal scrollbar.',
    },
  },
}
