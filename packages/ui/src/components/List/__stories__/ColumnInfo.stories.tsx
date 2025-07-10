import type { StoryFn } from '@storybook/react-vite'
import { List } from '..'
import { data } from './resources'

export const ColumnInfo: StoryFn = args => (
  <List
    {...args}
    columns={[
      {
        label: 'Solar system Planet',
      },
      {
        label: 'Perihelion',
        info: 'Nearest to the Sun',
      },
      {
        label: 'Aphelion',
        width: '200px',
        info: 'Farthest to the Sun',
      },
    ]}
  >
    {data.map(planet => (
      <List.Row key={planet.id} id={planet.id}>
        <List.Cell>{planet.name}</List.Cell>
        <List.Cell>{planet.perihelion}AU</List.Cell>
        <List.Cell>{planet.aphelion}AU</List.Cell>
      </List.Row>
    ))}
  </List>
)
