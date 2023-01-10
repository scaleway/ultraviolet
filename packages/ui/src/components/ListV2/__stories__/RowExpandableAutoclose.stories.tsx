import type { Story } from '@storybook/react'
import { List } from '..'
import { columns, data as sourceData } from './resources'

export const RowExpandableAutoclose: Story = () => (
  <List columns={columns} autoClose showExpandArrow>
    <List.Body>
      {sourceData.map(planet => (
        <List.Row
          key={planet.id}
          id={planet.id}
          isDisabled={planet.id === 'saturn'}
        >
          <List.Cell>{planet.name}</List.Cell>
          <List.Cell>{planet.perihelion}AU</List.Cell>
          <List.Cell>{planet.aphelion}AU</List.Cell>
          <List.Expandable>Planet description</List.Expandable>
        </List.Row>
      ))}
    </List.Body>
  </List>
)

RowExpandableAutoclose.parameters = {
  docs: {
    storyDescription:
      'If you add the prop `autoclose` to the `List`, opening a row by clicking (not controlled by forceExpand) will close currently expanded row',
  },
}
