import type { StoryFn } from '@storybook/react-vite'
import { List } from '..'
import { columns, data } from './resources'

export const Template: StoryFn<typeof List> = args => <List {...args} />

Template.args = {
  columns,
  children: data.map(planet => (
    <List.Row key={planet.id} id={planet.id}>
      <List.Cell>{planet.name}</List.Cell>
      <List.Cell>{planet.perihelion}AU</List.Cell>
      <List.Cell>{planet.aphelion}AU</List.Cell>
    </List.Row>
  )),
}
