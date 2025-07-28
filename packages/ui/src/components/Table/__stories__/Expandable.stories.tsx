import { Text } from '../../Text'
import { Table } from '..'
import { data } from './resources'
import { Template } from './Template.stories'

export const Expandable = Template.bind({})

Expandable.args = {
  ...Template.args,
  children: (
    <Table.Body>
      {data.map(movie => (
        <Table.Row
          expandable={
            <Text as="p" variant="bodySmall">
              A movie to watch
            </Text>
          }
          id={movie.id}
          key={movie.id}
        >
          <Table.Cell>{movie.name}</Table.Cell>
          <Table.Cell>{movie.releaseYear}</Table.Cell>
          <Table.Cell>{movie.trilogy}</Table.Cell>
          <Table.Cell>{movie.director}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  ),
  expandable: true,
  selectable: true,
}

Expandable.parameters = {
  docs: {
    description: {
      story:
        "A table can also be expandable. To do so set prop `expandable` on <Table> to `true`. You can then pass any content in each `<Table.Row>`'s `expandable` prop. This content will be displayed when the row is expanded.",
    },
  },
}
