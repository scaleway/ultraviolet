import type { StoryFn } from '@storybook/react-vite'
import { PlusIcon } from '@ultraviolet/icons/PlusIcon'
import { RestoreIcon } from '@ultraviolet/icons/RestoreIcon'
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
    director: 'Unknown',
    id: (data.length + 1).toString(),
    isNew: true,
    name: 'New Movie',
    releaseYear: 2024,
    storyBy: 'Unknown',
    trilogy: 'Unknown',
  } satisfies Movie

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
      <Table {...props} columns={columns}>
        <Table.Body>
          {data.map(movie => (
            <Table.Row
              highlightAnimation={movie.isNew}
              id={movie.id}
              key={movie.id}
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
