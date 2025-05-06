import type { StoryFn } from '@storybook/react'
import { PlusIcon, RestoreIcon } from '@ultraviolet/icons'
import { useState } from 'react'
import { List } from '..'
import { Button } from '../../Button'
import { Row } from '../../Row'
import { Stack } from '../../Stack'
import { data as DATA, columns } from './resources'

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
    id: (data.length + 1).toString(),
    name: 'New planet',
    perihelion: 0,
    aphelion: 0,
    isNew: true,
  } satisfies Planets

  return (
    <Stack gap={1}>
      <Row templateColumns="repeat(4, 1fr)" gap={2}>
        <Button onClick={() => setData([...data, newData])}>
          <PlusIcon />
          Add data
        </Button>
        <Button sentiment="neutral" onClick={() => setData(DATA)}>
          <RestoreIcon />
          Reset data
        </Button>
      </Row>
      <List {...props} columns={columns}>
        {data.map(planet => (
          <List.Row
            key={planet.id}
            id={planet.id}
            highlightAnimation={planet.isNew}
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
