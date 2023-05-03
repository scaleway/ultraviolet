import type { ComponentStory } from '@storybook/react'
import { TableV2 } from '..'
import { columns, data } from './resources'

export const Template: ComponentStory<typeof TableV2> = ({ ...props }) => (
  <TableV2 {...props} />
)

Template.args = {
  columns,
  children: (
    <TableV2.Body>
      {data.map(movie => (
        <TableV2.Row key={movie.id} id={movie.id}>
          <TableV2.Cell>{movie.name}</TableV2.Cell>
          <TableV2.Cell>{movie.releaseYear}</TableV2.Cell>
          <TableV2.Cell>{movie.trilogy}</TableV2.Cell>
          <TableV2.Cell>{movie.director}</TableV2.Cell>
        </TableV2.Row>
      ))}
    </TableV2.Body>
  ),
}
