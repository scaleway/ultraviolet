import type { StoryFn } from '@storybook/react-vite'
import { Table } from '..'
import { columns, data } from './resources'

export const Spanning: StoryFn = args => (
  <Table
    {...args}
    columns={[
      ...columns,
      {
        label: 'Screenwriter',
      },
    ]}
  >
    <Table.Body>
      {data.map((movie, index) => (
        <Table.Row key={movie.id} id={movie.id}>
          <Table.Cell>{movie.name}</Table.Cell>
          <Table.Cell>{movie.releaseYear}</Table.Cell>
          {index % 3 === 0 ? (
            <Table.Cell sentiment="warning" rowSpan={3}>
              {movie.trilogy}
            </Table.Cell>
          ) : null}
          <Table.Cell
            sentiment="success"
            colSpan={movie.director === movie.storyBy ? 2 : 1}
          >
            {movie.director}
          </Table.Cell>
          {movie.director !== movie.storyBy ? (
            <Table.Cell sentiment="info">{movie.storyBy}</Table.Cell>
          ) : null}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

Spanning.parameters = {
  docs: {
    description: {
      story:
        'You can use the html table `colSpan` and `rowSpan` property on a Cell.',
    },
  },
}
