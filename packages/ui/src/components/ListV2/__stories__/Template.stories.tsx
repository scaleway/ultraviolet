import type { ComponentStory } from '@storybook/react'
import { List } from '..'
import { columns, data } from './resources'

export const Template: ComponentStory<typeof List> = args => <List {...args} />

Template.args = {
  columns,
  autoClose: false,
  selectedIds: undefined,
  onSelectedIdsChange: undefined,
  isLoading: false,
  children: data.map(planet => (
    <List.Row key={planet.id} id={planet.id}>
      <List.Cell>{planet.name}</List.Cell>
      <List.Cell>{planet.perihelion}AU</List.Cell>
      <List.Cell>{planet.aphelion}AU</List.Cell>
    </List.Row>
  )),
}
