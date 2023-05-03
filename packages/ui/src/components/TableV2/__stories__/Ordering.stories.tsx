import type { Story } from '@storybook/react'
import { useMemo, useState } from 'react'
import { TableV2 } from '..'
import { data as sourceData } from './resources'

export const Ordering: Story = () => {
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
    <TableV2
      columns={[
        {
          label: 'Movie name',
          isOrdered: currentOrder.columnId === 'name',
          orderDirection: currentOrder.order,
          onOrder: newOrder =>
            setCurrentOrder({ columnId: 'name', order: newOrder }),
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
      <TableV2.Body>
        {sortedData.map(movie => (
          <TableV2.Row key={movie.id} id={movie.id}>
            <TableV2.Cell>{movie.name}</TableV2.Cell>
            <TableV2.Cell>{movie.releaseYear}</TableV2.Cell>
            <TableV2.Cell>{movie.trilogy}</TableV2.Cell>
            <TableV2.Cell>{movie.director}</TableV2.Cell>
          </TableV2.Row>
        ))}
      </TableV2.Body>
    </TableV2>
  )
}

Ordering.parameters = {
  docs: {
    storyDescription:
      'You can indicate that a column is ordered by providing `isOrdered`, `orderDirection`. `onOrder` callback provides the opposite of current order as param for an easier sorting (DESC if currently ASC, otherwhile ASC)',
  },
}
