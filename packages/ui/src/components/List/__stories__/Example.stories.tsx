import type { StoryFn } from '@storybook/react'
import { PencilIcon } from '@ultraviolet/icons'
import { useMemo, useState } from 'react'
import { List } from '..'
import { Button } from '../../Button/index'
import { MenuV2 } from '../../MenuV2'
import { Modal } from '../../Modal'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { TextInputV2 } from '../../TextInputV2'
import { data as sourceData } from './resources'

export const Example: StoryFn = args => {
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
      selectable
      expandable
      columns={[
        {
          label: 'Solar system Planet',
          isOrdered: currentOrder.columnId === 'name',
          orderDirection: currentOrder.order,
          onOrder: newOrder =>
            setCurrentOrder({ columnId: 'name', order: newOrder }),
        },
        {
          label: 'Perihelion',
          width: '200px',
          isOrdered: currentOrder.columnId === 'perihelion',
          orderDirection: currentOrder.order,
          onOrder: newOrder =>
            setCurrentOrder({ columnId: 'perihelion', order: newOrder }),
        },
        {
          label: 'Aphelion',
          width: '200px',
        },
        {
          label: '',
          width: '64px',
        },
      ]}
    >
      {sortedData.map(planet => (
        <List.Row
          key={planet.id}
          id={planet.id}
          expandable={
            <Stack direction="row" justifyContent="space-between">
              <div>A planet description</div>
              <Modal
                disclosure={
                  <Button size="small">
                    <PencilIcon />
                    Edit
                  </Button>
                }
              >
                <Stack gap={3}>
                  <Text as="h6" variant="headingSmall">
                    Edit description
                  </Text>
                  <TextInputV2
                    name="description"
                    label="Type planet description"
                  />
                </Stack>
              </Modal>
            </Stack>
          }
          sentiment={planet.id === 'home-sweet-home' ? 'info' : undefined}
        >
          <List.Cell>{planet.name}</List.Cell>
          <List.Cell>{planet.perihelion}AU</List.Cell>
          <List.Cell>{planet.aphelion}AU</List.Cell>
          <List.Cell>
            <MenuV2 disclosure={<button type="button">Menu</button>}>
              <MenuV2.Item>MenuItem</MenuV2.Item>
            </MenuV2>
          </List.Cell>
        </List.Row>
      ))}
    </List>
  )
}

Example.parameters = {
  docs: {
    description: {
      story:
        'This example is a demo of the List with the following features : `selectable rows`, `expandable row`, `sortable data`',
    },
  },
}
