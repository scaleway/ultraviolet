import type { Story } from '@storybook/react'
import { useMemo } from 'react'
import { TableV2 } from '..'
import { columns, data } from './resources'

export const Context: Story = () => {
  const SubComponent = ({ srcData }: { srcData: typeof data }) => {
    const { selectedRowIds } = TableV2.useTableContext()

    const selectedItems = useMemo(
      () => srcData.filter(item => selectedRowIds[item.id]),
      [srcData, selectedRowIds],
    )

    return (
      <caption>
        Selected movies(s): {selectedItems.map(movie => movie.name).join(', ')}
      </caption>
    )
  }

  return (
    <TableV2 columns={columns} selectable>
      <TableV2.Body>
        {data.map(movie => (
          <TableV2.Row key={movie.id} id={movie.id}>
            <TableV2.Cell>{movie.name}</TableV2.Cell>
            <TableV2.Cell>{movie.releaseYear}</TableV2.Cell>
            <TableV2.Cell>{movie.trilogy}</TableV2.Cell>
            <TableV2.Cell>{movie.director}</TableV2.Cell>
          </TableV2.Row>
        ))}
      </TableV2.Body>
      <SubComponent srcData={data} />
    </TableV2>
  )
}

Context.parameters = {
  docs: {
    storyDescription: `You can use \`TableV2.useTableContext\` to get this hydrated properties about the table:

- selectedRowIds : [Object] Selected rows (key is row id, value is a boolean, true mean the related row is selected)
- selectRow : [Function] select a row by providing its id
- unselectRow : [Function] unselect a row by providing its id
- selectAll : [Function] select all rows
- unselectAll : [Function] unselect all rows
- allRowSelectValue : [Boolean/String] :
  - \`false\` means no row is selected
  - \`true\` means all rows are selected
  - \`indeterminate\` means rows are partially selected`,
  },
}
