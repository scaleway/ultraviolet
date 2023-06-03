import { List } from '..'
import { Template } from './Template.stories'
import { columns, data } from './resources'

export const PreventClick = Template.bind({})

PreventClick.args = {
  ...Template.args,
  columns: [...columns, { label: '', width: '80px' }],
  autoCollapse: true,
  children: data.map(planet => (
    <List.Row key={planet.id} id={planet.id} expandable="Planet description">
      <List.Cell>{planet.name}</List.Cell>
      <List.Cell>{planet.perihelion}AU</List.Cell>
      <List.Cell>{planet.aphelion}AU</List.Cell>
      <List.Cell preventClick>
        <button type="button">click me</button>
      </List.Cell>
    </List.Row>
  )),
}

PreventClick.parameters = {
  docs: {
    storyDescription:
      'By adding the prop `preventClick` on the `Cell`, you can limit any event propagation to go outside the cell. It can be used for prevent button to interfere with row expand onClick.',
  },
}
