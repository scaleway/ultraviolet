import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Table } from '..'
import { columns, data } from './resources'

export const Selectable: StoryFn<typeof Table> = args => {
  const [clicked, setClick] = useState(true)

  return (
    <>
      <Table {...args} columns={columns} selectable>
        <Table.Body>
          {data.map(movie =>
            movie.id !== '4' || clicked ? (
              <Table.Row
                id={movie.id}
                key={movie.id}
                selectDisabled={
                  movie.id === '1' ? 'This movie is not selectable' : undefined
                }
              >
                <Table.Cell>{movie.name}</Table.Cell>
                <Table.Cell>{movie.releaseYear}</Table.Cell>
                <Table.Cell>{movie.trilogy}</Table.Cell>
                <Table.Cell>{movie.director}</Table.Cell>
              </Table.Row>
            ) : null,
          )}
        </Table.Body>
        <Table.SelectBar data={data} idKey="id">
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
                sentiment="danger"
                size="small"
              >
                Delete
              </Button>
            </Stack>
          )}
        </Table.SelectBar>
      </Table>
      <button onClick={() => setClick(!clicked)} type="button">
        {clicked ? 'remove ' : 'add '}
        The Empire Strikes Back
      </button>
    </>
  )
}

Selectable.parameters = {
  docs: {
    description: {
      story:
        "By adding the prop `selectable` on the `Table` a new column will be automatically added to allow user to select a row, each row is identified by its prop `id`.\n\nYou can use the utility `Table.SelectBar` to quickly get selectedItems providing the `data` and the data's property key used to provite the `id` of each `Table.Row`.\n\nFor other usages about selected items, check our `Context` example.\n\nProviding the prop `selectDisabled` prevents the row to be selected (it can be a boolean or a string to give user a disable reason shown as a tooltip).",
    },
  },
}
