import type { StoryFn } from '@storybook/react-vite'
import { Table } from '..'
import { columns, data } from './resources'

export const Align: StoryFn<typeof Table> = ({ ...props }) => (
  <Table {...props} />
)

Align.args = {
  children: (
    <Table.Body>
      {data.map(movie => (
        <Table.Row id={movie.id} key={movie.id}>
          <Table.Cell>{movie.name} (auto)</Table.Cell>
          <Table.Cell>{movie.releaseYear} (150px)</Table.Cell>
          <Table.Cell>{movie.trilogy} (max 20%)</Table.Cell>
          <Table.Cell align="right">{movie.director} (min 150px)</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  ),
  columns: [
    columns[0],
    { ...columns[1], width: '150px' },
    { ...columns[2], maxWidth: '20%' },
    { ...columns[3], align: 'right', minWidth: '150px' },
  ],
}

Align.parameters = {
  docs: {
    description: {
      story:
        'Using `align` prop on `columns` or on `<Table.Cell />` you can easily align the content as you need.',
    },
  },
}
