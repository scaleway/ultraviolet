import type { StoryFn } from '@storybook/react-vite'
import { PencilIcon } from '@ultraviolet/icons/PencilIcon'
import { useMemo, useState } from 'react'
import { Button } from '../../Button/index'
import { Menu } from '../../Menu'
import { Modal } from '../../Modal'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { TextInput } from '../../TextInput'
import { List } from '..'
import { data as sourceData } from './resources'

export const Example: StoryFn = args => {
  const [currentOrder, setCurrentOrder] = useState<{
    columnId: 'name' | 'perihelion'
    order: 'asc' | 'desc'
  }>({ columnId: 'perihelion', order: 'asc' })

  const sortedData = useMemo(() => {
    const orderMultiplicator = currentOrder.order === 'asc' ? 1 : -1

    return [...sourceData].toSorted((a, b) => {
      if (a[currentOrder.columnId] < b[currentOrder.columnId]) {
        return -1 * orderMultiplicator
      }
      if (a[currentOrder.columnId] > b[currentOrder.columnId]) {
        return Number(orderMultiplicator)
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
        {
          label: '',
          width: '64px',
        },
      ]}
      expandable
      selectable
    >
      {sortedData.map(planet => (
        <List.Row
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
                  <TextInput
                    label="Type planet description"
                    name="description"
                  />
                </Stack>
              </Modal>
            </Stack>
          }
          id={planet.id}
          key={planet.id}
          sentiment={planet.id === 'home-sweet-home' ? 'info' : undefined}
        >
          <List.Cell>{planet.name}</List.Cell>
          <List.Cell>{planet.perihelion}AU</List.Cell>
          <List.Cell>{planet.aphelion}AU</List.Cell>
          <List.Cell>
            <Menu disclosure={<button type="button">Menu</button>}>
              <Menu.Item>MenuItem</Menu.Item>
            </Menu>
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
