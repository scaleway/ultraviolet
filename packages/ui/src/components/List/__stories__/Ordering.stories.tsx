import type { StoryFn } from '@storybook/react-vite'
import { useMemo, useState } from 'react'
import { List } from '..'
import { data as sourceData } from './resources'

export const Ordering: StoryFn = args => {
  const [currentOrder, setCurrentOrder] = useState<{
    columnId: 'name' | 'perihelion'
    order: 'asc' | 'desc'
  }>({ columnId: 'perihelion', order: 'asc' })

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
    <List
      {...args}
      columns={[
        {
          isOrdered: currentOrder.columnId === 'name',
          label: 'Solar system Planet',
          onOrder: newOrder =>
            setCurrentOrder({ columnId: 'name', order: newOrder }),
          orderDirection: currentOrder.order,
        },
        {
          info: 'Nearest to the Sun',
          isOrdered: currentOrder.columnId === 'perihelion',
          label: 'Perihelion',
          onOrder: newOrder =>
            setCurrentOrder({ columnId: 'perihelion', order: newOrder }),
          orderDirection: currentOrder.order,
          width: '200px',
        },
        {
          label: 'Aphelion',
          width: '200px',
        },
      ]}
    >
      {sortedData.map(planet => (
        <List.Row id={planet.id} key={planet.id}>
          <List.Cell>{planet.name}</List.Cell>
          <List.Cell>{planet.perihelion}AU</List.Cell>
          <List.Cell>{planet.aphelion}AU</List.Cell>
        </List.Row>
      ))}
    </List>
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
