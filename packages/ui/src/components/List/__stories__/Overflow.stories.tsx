import type { StoryFn } from '@storybook/react'
import { List } from '..'
import { data, overflowColumns } from './resources'

export const Overflow: StoryFn = args => (
  <>
    <List {...args} columns={overflowColumns} selectable>
      {data.map(planet => (
        <List.Row
          key={planet.id}
          id={planet.id}
          expandable="Planet description"
        >
          <List.Cell>{planet.id}</List.Cell>
          <List.Cell>{planet.name}</List.Cell>
          <List.Cell>{planet.perihelion}AU</List.Cell>
          <List.Cell>{planet.aphelion}AU</List.Cell>
        </List.Row>
      ))}
    </List>
  </>
)

Overflow.parameters = {
  docs: {
    description: {
      story:
        'By default the table will shrink each cell element if there is available space to make the table fit the container. If you need your cells to be at specific size you can do it by using `min-width` in columns. If the table overflow the container it will show a horizontal scrollbar.',
    },
  },
}
