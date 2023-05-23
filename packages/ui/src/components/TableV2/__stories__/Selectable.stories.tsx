import { TableV2 } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Template } from './Template.stories'
import { data } from './resources'

export const Selectable = Template.bind({})

Selectable.args = {
  ...Template.args,
  selectable: true,
  children: (
    <>
      <TableV2.Body>
        {data.map(movie => (
          <TableV2.Row
            key={movie.id}
            id={movie.id}
            selectDisabled={
              movie.id === '1' ? 'This movie is not selectable' : undefined
            }
          >
            <TableV2.Cell>{movie.name}</TableV2.Cell>
            <TableV2.Cell>{movie.releaseYear}</TableV2.Cell>
            <TableV2.Cell>{movie.trilogy}</TableV2.Cell>
            <TableV2.Cell>{movie.director}</TableV2.Cell>
          </TableV2.Row>
        ))}
      </TableV2.Body>
      <TableV2.SelectBar data={data} idKey="id">
        {({ selectedItems, unselectAll }) => (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            <Text variant="bodyStrong" as="p" color="primary">
              {selectedItems.length} item(s) selected
            </Text>
            <Button
              sentiment="danger"
              size="small"
              onClick={() => {
                alert('elements could be deleted')
                unselectAll()
              }}
            >
              Delete
            </Button>
          </Stack>
        )}
      </TableV2.SelectBar>
    </>
  ),
}

Selectable.parameters = {
  docs: {
    storyDescription:
      "By adding the prop `selectable` on the `TableV2` a new column will be automatically added to allow user to select a row, each row is identified by its prop `id`.\n\nYou can use the utility `TableV2.SelectBar` to quickly get selectedItems providing the `data` and the data's property key used to provite the `id` of each `TableV2.Row`.\n\nFor other usages about selected items, check our `Context` example.\n\nProviding the prop `selectDisabled` prevents the row to be selected (it can be a boolean or a string to give user a disable reason shown as a tooltip).",
  },
}
