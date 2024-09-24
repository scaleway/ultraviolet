import type { StoryFn } from '@storybook/react'
import { Table } from '..'
import { columns, data } from './resources'

export const ColumnInfo: StoryFn<typeof Table> = ({ ...props }) => (
  <Table {...props} />
)

ColumnInfo.args = {
  columns: [
    { label: 'Name', info: 'This column is important' },
    ...columns.slice(1, 4),
  ],
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
