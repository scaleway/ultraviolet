import type { ComponentStory } from '@storybook/react'
import { TableV2 } from '..'
import { columns, data } from './resources'

export const ColumnWidth: ComponentStory<typeof TableV2> = ({ ...props }) => (
  <TableV2 {...props} />
)

ColumnWidth.args = {
  columns: [
    columns[0],
    { ...columns[1], width: '150px' },
    { ...columns[2], maxWidth: '20%' },
    { ...columns[3], minWidth: '150px' },
  ],
  children: (
    <TableV2.Body>
      {data.map(movie => (
        <TableV2.Row key={movie.id} id={movie.id}>
          <TableV2.Cell>{movie.name} (auto)</TableV2.Cell>
          <TableV2.Cell>{movie.releaseYear} (150px)</TableV2.Cell>
          <TableV2.Cell>{movie.trilogy} (max 20%)</TableV2.Cell>
          <TableV2.Cell>{movie.director} (min 150px)</TableV2.Cell>
        </TableV2.Row>
      ))}
    </TableV2.Body>
  ),
}

ColumnWidth.parameters = {
  docs: {
    storyDescription:
      'Since TableV2 is based on native HTML Table, column width will behave the same, however you can specify `width`, `minWidth` and/or `maxWidth` to a column, value are based on css value.',
  },
}
