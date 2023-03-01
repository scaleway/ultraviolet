import { List } from '..'
import { Template } from './Template.stories'
import { data } from './resources'

export const Expandable = Template.bind({})

Expandable.args = {
  ...Template.args,
  children: data.map(planet => (
    <List.Row
      key={planet.id}
      id={planet.id}
      expandable="Planet description"
      isDisabled={planet.id === 'mercury'}
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

Expandable.parameters = {
  docs: {
    storyDescription:
      'The Row supports the prop `expandable` which expect a ReactNode. This content will be visible if user click on the row.\n\nProviding `isDisabled` on the row will prevent the expanding on click.',
  },
}
