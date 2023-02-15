import type { Story } from '@storybook/react'
import { useMemo } from 'react'
import { List } from '..'
import { columns, data } from './resources'

export const Context: Story = () => {
  const SubComponent = ({ srcData }: { srcData: typeof data }) => {
    const { selectedRowIds } = List.useListContext()

    const selectedItems = useMemo(
      () => srcData.filter(item => selectedRowIds[item.id]),
      [srcData, selectedRowIds],
    )

    return (
      <div>
        Selected planet(s):{' '}
        {selectedItems.map(planet => planet.name).join(', ')}
      </div>
    )
  }

  return (
    <List columns={columns} areRowSelectable>
      {data.map(planet => (
        <List.Row
          key={planet.id}
          id={planet.id}
          expandable="Planet description"
        >
          <List.Cell>{planet.name}</List.Cell>
          <List.Cell>{planet.perihelion}AU</List.Cell>
          <List.Cell>{planet.aphelion}AU</List.Cell>
        </List.Row>
      ))}
      <SubComponent srcData={data} />
    </List>
  )
}

Context.parameters = {
  docs: {
    storyDescription: `By passing a \`ref\` prop it will be hydrated with:

- expandedRowIds : [Object] Expanded rows (key is row id, value is a boolean, true mean the related row is expanded)
- expandRow : [Function] expand a row by providing its id
- collapseRow : [Function] expand a row by providing its id
\n\n
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
