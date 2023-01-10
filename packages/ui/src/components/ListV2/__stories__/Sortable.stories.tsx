import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { useMemo, useState } from 'react'
import { List } from '..'
import { data as sourceData } from './resources'

export const Sortable: Story = () => {
  const [currentSort, setCurrentSort] = useState<{
    columnId: string
    order: ComponentProps<typeof List.Header>['sort']
  }>({ columnId: 'perihelion', order: 'asc' })

  const onColumnSort: ComponentProps<typeof List.Header>['onClick'] = ({
    columnId,
    order,
  }) => {
    setCurrentSort({ columnId, order: order === 'asc' ? 'desc' : 'asc' })
  }

  const sortedData = useMemo(() => {
    const orderMultiplicator = currentSort.order === 'asc' ? 1 : -1
    const columnKey = currentSort.columnId as 'name' | 'perihelion' | 'aphelion'

    return [...sourceData].sort((a, b) => {
      if (a[columnKey] < b[columnKey]) {
        return -1 * orderMultiplicator
      }
      if (a[columnKey] > b[columnKey]) {
        return 1 * orderMultiplicator
      }

      return 0
    })
  }, [currentSort])

  return (
    <List
      columns={[
        {
          label: 'Solar system Planet',
          sort: currentSort.columnId === 'name' ? currentSort.order : 'none',
          onClick: onColumnSort,
          id: 'name',
        },
        {
          label: 'Perihelion',
          width: '200px',
          sort:
            currentSort.columnId === 'perihelion' ? currentSort.order : 'none',
          onClick: onColumnSort,
          id: 'perihelion',
        },
        {
          label: 'Aphelion',
          width: '200px',
          sort:
            currentSort.columnId === 'aphelion' ? currentSort.order : 'none',
          onClick: onColumnSort,
          id: 'aphelion',
        },
      ]}
    >
      <List.Body>
        {sortedData.map(planet => (
          <List.Row key={planet.id} id={planet.id}>
            <List.Cell>{planet.name}</List.Cell>
            <List.Cell>{planet.perihelion}AU</List.Cell>
            <List.Cell>{planet.aphelion}AU</List.Cell>
          </List.Row>
        ))}
      </List.Body>
    </List>
  )
}

Sortable.parameters = {
  docs: {
    storyDescription:
      'You can sort a column. In order to do that it is mandatory to provide an `id` to your column, the current `sort` (asc/desc/none), and an `onClick` callback. This `onClick` callback receive `columnId` and the current `order` (using these parameters you can share one callback for multiples columns)',
  },
}
