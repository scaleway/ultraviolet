import { List } from '..'
import { Template } from './Template.stories'
import { data } from './resources'

export const ExpandableAutocollapse = Template.bind({})

ExpandableAutocollapse.args = {
  ...Template.args,
  autoCollapse: true,
  children: data.map(planet => (
    <List.Row key={planet.id} id={planet.id} expandable="Planet description">
      <List.Cell>{planet.name}</List.Cell>
      <List.Cell>{planet.perihelion}AU</List.Cell>
      <List.Cell>{planet.aphelion}AU</List.Cell>
    </List.Row>
  )),
}

ExpandableAutocollapse.parameters = {
  docs: {
    storyDescription:
      'By adding the prop `autoCollapse` on the `List`, expanding a row will collapse other rows current expanded.',
  },
}
