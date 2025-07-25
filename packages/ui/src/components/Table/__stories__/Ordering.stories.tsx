import type { StoryFn } from '@storybook/react-vite'
import { useMemo, useState } from 'react'
import { Table } from '..'
import { data as sourceData } from './resources'

export const Ordering: StoryFn = args => {
  const [currentOrder, setCurrentOrder] = useState<{
    columnId: 'name' | 'releaseYear'
    order: 'asc' | 'desc'
  }>({ columnId: 'releaseYear', order: 'asc' })

  const sortedData = useMemo(() => {
    const orderMultiplicator = currentOrder.order === 'asc' ? 1 : -1

    return [...sourceData].sort((a, b) => {
      if (a[currentOrder.columnId] < b[currentOrder.columnId]) {
        return -1 * orderMultiplicator
      }
      if (a[currentOrder.columnId] > b[currentOrder.columnId]) {
        return 1 * orderMultiplicator
      }

      return 0
    })
  }, [currentOrder])

  return (
    <Table
      {...args}
      columns={[
        {
          label: 'Movie name',
          isOrdered: currentOrder.columnId === 'name',
          orderDirection: currentOrder.order,
          onOrder: newOrder =>
            setCurrentOrder({ columnId: 'name', order: newOrder }),
          info: 'info works fine with the ordering',
        },
        {
          label: 'Release year',
          isOrdered: currentOrder.columnId === 'releaseYear',
          orderDirection: currentOrder.order,
          onOrder: newOrder =>
            setCurrentOrder({ columnId: 'releaseYear', order: newOrder }),
        },
        { label: 'Trilogy' },
        { label: 'Director' },
      ]}
    >
      <Table.Body>
        {sortedData.map(movie => (
          <Table.Row key={movie.id} id={movie.id}>
            <Table.Cell>{movie.name}</Table.Cell>
            <Table.Cell>{movie.releaseYear}</Table.Cell>
            <Table.Cell>{movie.trilogy}</Table.Cell>
            <Table.Cell>{movie.director}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

Ordering.parameters = {
  docs: {
    description: {
      story:
        'You can indicate that a column is ordered by providing `isOrdered`, `orderDirection`. `onOrder` callback provides the opposite of current order as param for an easier sorting (DESC if currently ASC, otherwhile ASC)',
    },
  },
}
