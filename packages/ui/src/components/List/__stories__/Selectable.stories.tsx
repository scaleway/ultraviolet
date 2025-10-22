import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { List } from '..'
import { columns, data } from './resources'

export const Selectable: StoryFn<typeof List> = args => {
  const [clicked, setClick] = useState(true)

  return (
    <>
      <List {...args} columns={columns} selectable>
        {data.map(planet =>
          planet.id !== 'mars' || clicked ? (
            <List.Row
              expandable="Planet description"
              id={planet.id}
              key={planet.id}
            >
              <List.Cell>{planet.name}</List.Cell>
              <List.Cell>{planet.perihelion}AU</List.Cell>
              <List.Cell>{planet.aphelion}AU</List.Cell>
            </List.Row>
          ) : null,
        )}

        <List.SelectBar data={data} idKey="id">
          {({ selectedItems, unselectAll }) => (
            <Stack
              alignItems="center"
              direction="row"
              gap={2}
              justifyContent="space-between"
            >
              <Text as="p" sentiment="primary" variant="bodyStrong">
                {selectedItems.length} item(s) selected (
                {selectedItems.map(
                  (item, index) => `${index > 0 ? ', ' : ''}${item.name}`,
                )}
                )
              </Text>
              <Button
                onClick={() => {
                  // oxlint-disable-next-line eslint/no-alert
                  alert('elements could be deleted')
                  unselectAll()
                }}
                size="small"
              >
                Delete
              </Button>
            </Stack>
          )}
        </List.SelectBar>
      </List>

      <button onClick={() => setClick(!clicked)} type="button">
        {clicked ? 'remove' : 'add'} mars as a planet
      </button>
    </>
  )
}

Selectable.parameters = {
  docs: {
    description: {
      story:
        "By adding the prop `selectable` on the `List` a new column will be automatically added to allow user to select a row, each row is identified by its prop `id`.\n\nYou can use the utility `List.SelectBar` to quickly get selectedItems providing the `data` and the data's property key used to provite the `id` of each `List.Row`.\n\nFor other usages about selected items, check our `Context` example.\n\nA disabled Row `disabled` cannot be selected.\n\nProviding the prop `selectDisabled` prevents the row to be selected (it can be a boolean or a string to give user a disable reason shown as a tooltip).",
    },
  },
}
