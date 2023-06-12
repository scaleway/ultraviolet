import type { ComponentStory } from '@storybook/react'
import { Table } from '..'
import { columns, data } from './resources'

export const TooltipInfo: ComponentStory<typeof Table> = ({ ...props }) => (
  <Table {...props} />
)

TooltipInfo.args = {
  columns: [
    { label: 'Name', tooltipInfo: 'This column is important' },
    ...columns.slice(1, 3),
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
