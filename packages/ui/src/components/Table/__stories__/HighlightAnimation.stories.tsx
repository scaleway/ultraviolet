import type { StoryFn } from '@storybook/react-vite'
import { PlusIcon, RestoreIcon } from '@ultraviolet/icons'
import { useState } from 'react'
import { Button } from '../../Button'
import { Row } from '../../Row'
import { Stack } from '../../Stack'
import { Table } from '..'
import { columns, data as DATA } from './resources'

type Movie = {
  id: string
  name: string
  director: string
  storyBy: string
  trilogy: string
  releaseYear: number
  isNew?: boolean
}

export const HighlightAnimation: StoryFn<typeof Table> = ({ ...props }) => {
  const [data, setData] = useState<Movie[]>(DATA)

  const newData = {
    id: (data.length + 1).toString(),
    name: 'New Movie',
    director: 'Unknown',
    storyBy: 'Unknown',
    trilogy: 'Unknown',
    releaseYear: 2024,
    isNew: true,
  } satisfies Movie

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
      <Table {...props} columns={columns}>
        <Table.Body>
          {data.map(movie => (
            <Table.Row
              key={movie.id}
              id={movie.id}
              highlightAnimation={movie.isNew}
            >
              <Table.Cell>{movie.name}</Table.Cell>
              <Table.Cell>{movie.releaseYear}</Table.Cell>
              <Table.Cell>{movie.trilogy}</Table.Cell>
              <Table.Cell>{movie.director}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Stack>
  )
}

HighlightAnimation.parameters = {
  docs: {
    description: {
      story:
        'By adding the prop `highlightAnimation` on the `Table.Row` it will add an animation on the row. This can be useful for showing to the use that a new row has been added into the Table.',
    },
  },
}
