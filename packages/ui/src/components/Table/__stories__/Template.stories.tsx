import type { ComponentStory } from '@storybook/react'
import { Table } from '..'
import { columns, data } from './resources'

export const Template: ComponentStory<typeof Table> = ({ ...props }) => (
  <Table {...props} />
)

Template.args = {
  columns,
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
