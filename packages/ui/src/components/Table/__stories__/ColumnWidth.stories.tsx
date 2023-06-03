import type { ComponentStory } from '@storybook/react'
import { Table } from '..'
import { columns, data } from './resources'

export const ColumnWidth: ComponentStory<typeof Table> = ({ ...props }) => (
  <Table {...props} />
)

ColumnWidth.args = {
  columns: [
    columns[0],
    { ...columns[1], width: '150px' },
    { ...columns[2], maxWidth: '20%' },
    { ...columns[3], minWidth: '150px' },
  ],
  children: (
    <Table.Body>
      {data.map(movie => (
        <Table.Row key={movie.id} id={movie.id}>
          <Table.Cell>{movie.name} (auto)</Table.Cell>
          <Table.Cell>{movie.releaseYear} (150px)</Table.Cell>
          <Table.Cell>{movie.trilogy} (max 20%)</Table.Cell>
          <Table.Cell>{movie.director} (min 150px)</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  ),
}

ColumnWidth.parameters = {
  docs: {
    storyDescription:
      'Since Table is based on native HTML Table, column width will behave the same, however you can specify `width`, `minWidth` and/or `maxWidth` to a column, value are based on css value.',
  },
}
