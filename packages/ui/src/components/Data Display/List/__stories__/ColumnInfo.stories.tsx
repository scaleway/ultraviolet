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
        info: 'Nearest to the Sun',
        label: 'Perihelion',
      },
      {
        info: 'Farthest to the Sun',
        label: 'Aphelion',
        width: '200px',
      },
    ]}
  >
    {data.map(planet => (
      <List.Row id={planet.id} key={planet.id}>
        <List.Cell>{planet.name}</List.Cell>
        <List.Cell>{planet.perihelion}AU</List.Cell>
        <List.Cell>{planet.aphelion}AU</List.Cell>
      </List.Row>
    ))}
  </List>
)
