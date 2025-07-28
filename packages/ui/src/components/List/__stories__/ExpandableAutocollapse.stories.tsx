import { List } from '..'
import { data } from './resources'
import { Template } from './Template.stories'

export const ExpandableAutocollapse = Template.bind({})

ExpandableAutocollapse.args = {
  ...Template.args,
  autoCollapse: true,
  children: data.map(planet => (
    <List.Row expandable="Planet description" id={planet.id} key={planet.id}>
      <List.Cell>{planet.name}</List.Cell>
      <List.Cell>{planet.perihelion}AU</List.Cell>
      <List.Cell>{planet.aphelion}AU</List.Cell>
    </List.Row>
  )),
  expandable: true,
}

ExpandableAutocollapse.parameters = {
  docs: {
    description: {
      story:
        'By adding the prop `autoCollapse` on the `List`, expanding a row will collapse other rows current expanded.',
    },
  },
}
