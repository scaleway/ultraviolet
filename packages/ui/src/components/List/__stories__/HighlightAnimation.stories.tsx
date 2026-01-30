import type { StoryFn } from '@storybook/react-vite'
import { PlusIcon } from '@ultraviolet/icons/PlusIcon'
import { RestoreIcon } from '@ultraviolet/icons/RestoreIcon'
import { useState } from 'react'
import { Button } from '../../Button'
import { Row } from '../../Row'
import { Stack } from '../../Stack'
import { List } from '..'
import { columns, data as DATA } from './resources'

type Planets = {
  id: string
  name: string
  perihelion: number
  aphelion: number
  isNew?: boolean
}

export const HighlightAnimation: StoryFn<typeof List> = ({ ...props }) => {
  const [data, setData] = useState<Planets[]>(DATA)

  const newData = {
    aphelion: 0,
    id: (data.length + 1).toString(),
    isNew: true,
    name: 'New planet',
    perihelion: 0,
  } satisfies Planets

  return (
    <Stack gap={1}>
      <Row gap={2} templateColumns="repeat(4, 1fr)">
        <Button onClick={() => setData([...data, newData])}>
          <PlusIcon />
          Add data
        </Button>
        <Button onClick={() => setData(DATA)} sentiment="neutral">
          <RestoreIcon />
          Reset data
        </Button>
      </Row>
      <List {...props} columns={columns}>
        {data.map(planet => (
          <List.Row
            highlightAnimation={planet.isNew}
            id={planet.id}
            key={planet.id}
          >
            <List.Cell>{planet.name}</List.Cell>
            <List.Cell>{planet.perihelion}AU</List.Cell>
            <List.Cell>{planet.aphelion}AU</List.Cell>
          </List.Row>
        ))}
      </List>
    </Stack>
  )
}

HighlightAnimation.parameters = {
  docs: {
    description: {
      story:
        'By adding the prop `highlightAnimation` on the `List.Row` it will add an animation on the row. This can be useful for showing to the use that a new row has been added into the List.',
    },
  },
}
