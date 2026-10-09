import type { StoryFn } from '@storybook/react-vite'
import { Table } from '..'
import { columns, data } from './resources'

export const HighlightRow: StoryFn<typeof Table> = ({ ...props }) => <Table {...props} />

HighlightRow.args = {
  children: (
    <Table.Body>
      {data.map((movie, index) => (
        <Table.Row id={movie.id} key={movie.id} highlight={index === 1}>
          <Table.Cell>{movie.name}</Table.Cell>
          <Table.Cell sentiment="info">{movie.releaseYear}</Table.Cell>
          <Table.Cell>{movie.trilogy}</Table.Cell>
          <Table.Cell>{movie.director}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  ),
  columns: [{ info: 'This column is important', label: 'Name' }, ...columns.slice(1, 4)],
  bordered: true,
}

HighlightRow.parameters = {
  docs: {
    description: {
      story:
        'Highlight a Row using prop `highlight` on a `Table.Row`. If a `sentiment` is defined on a cell of a highlighted row, highlight overrides sentiment (see column "Release Year").\n **Do not forget to add `aria-current` on an highlighted row when necessary**',
    },
  },
}
