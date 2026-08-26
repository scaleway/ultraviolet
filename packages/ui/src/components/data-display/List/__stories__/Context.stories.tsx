import type { StoryFn } from '@storybook/react-vite'
import { List } from '..'
import { columns, data } from './resources'

export const Context: StoryFn = args => (
  <List {...args} columns={columns} selectable>
    {data.map(planet => (
      <List.Row expandable="Planet description" id={planet.id} key={planet.id}>
        <List.Cell>{planet.name}</List.Cell>
        <List.Cell>{planet.perihelion}AU</List.Cell>
        <List.Cell>{planet.aphelion}AU</List.Cell>
      </List.Row>
    ))}
  </List>
)

Context.parameters = {
  docs: {
    description: {
      story: `You can use \`List.useListContext\` to get this hydrated properties about the list:

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
  },
}
