import type { StoryFn } from '@storybook/react'
import { Table } from '..'
import { columns, data } from './resources'

export const Align: StoryFn<typeof Table> = ({ ...props }) => (
  <Table {...props} />
)

Align.args = {
  columns: [
    columns[0],
    { ...columns[1], width: '150px' },
    { ...columns[2], maxWidth: '20%' },
    { ...columns[3], minWidth: '150px', align: 'right' },
  ],
  children: (
    <Table.Body>
      {data.map(movie => (
        <Table.Row key={movie.id} id={movie.id}>
          <Table.Cell>{movie.name} (auto)</Table.Cell>
          <Table.Cell>{movie.releaseYear} (150px)</Table.Cell>
          <Table.Cell>{movie.trilogy} (max 20%)</Table.Cell>
          <Table.Cell align="right">{movie.director} (min 150px)</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  ),
}

Align.parameters = {
  docs: {
    description: {
      story:
        'Using `align` prop on `columns` or on `<Table.Cell />` you can easily align the content as you need.',
    },
  },
}
