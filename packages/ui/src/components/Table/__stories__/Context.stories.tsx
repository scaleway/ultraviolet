import type { StoryFn } from '@storybook/react-vite'
import { useMemo } from 'react'
import { Table } from '..'
import { columns, data } from './resources'

export const Context: StoryFn = args => {
  const SubComponent = ({ srcData }: { srcData: typeof data }) => {
    const { selectedRowIds } = Table.useTableContext()

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
    <Table {...args} columns={columns} selectable>
      <Table.Body>
        {data.map(movie => (
          <Table.Row key={movie.id} id={movie.id}>
            <Table.Cell>{movie.name}</Table.Cell>
            <Table.Cell>{movie.releaseYear}</Table.Cell>
            <Table.Cell>{movie.trilogy}</Table.Cell>
            <Table.Cell>{movie.director}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <SubComponent srcData={data} />
    </Table>
  )
}

Context.parameters = {
  docs: {
    description: {
      story: `You can use \`Table.useTableContext\` to get this hydrated properties about the table:

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
  },
}
