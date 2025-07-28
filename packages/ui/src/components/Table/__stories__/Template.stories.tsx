import type { StoryFn } from '@storybook/react-vite'
import { Table } from '..'
import { columns, data } from './resources'

export const Template: StoryFn<typeof Table> = ({ ...props }) => (
  <Table {...props} />
)

Template.args = {
  children: (
    <Table.Body>
      {data.map(movie => (
        <Table.Row id={movie.id} key={movie.id}>
          <Table.Cell>{movie.name}</Table.Cell>
          <Table.Cell>{movie.releaseYear}</Table.Cell>
          <Table.Cell>{movie.trilogy}</Table.Cell>
          <Table.Cell>{movie.director}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  ),
  columns,
}
