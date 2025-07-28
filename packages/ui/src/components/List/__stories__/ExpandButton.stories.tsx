import { List } from '..'
import { data } from './resources'
import { Template } from './Template.stories'

export const ExpandButton = Template.bind({})

/**
 * # expandButton
 * Providing the prop `expandButton` add a dedicated column and a button to each row to make the expandable feature more visibile for user, we really advice to activate it if you use expandable content in rows.
 */
ExpandButton.args = {
  ...Template.args,
  expandable: true,
  children: data.map(planet => (
    <List.Row
      key={planet.id}
      id={planet.id}
      expandable="Planet description"
      disabled={planet.id === 'mercury'}
    >
      <List.Cell>
        {planet.name}{' '}
        {planet.id === 'mercury' ? ' (A disabled row cannot be expanded)' : ''}
      </List.Cell>
      <List.Cell>{planet.perihelion}AU</List.Cell>
      <List.Cell>{planet.aphelion}AU</List.Cell>
    </List.Row>
  )),
}
